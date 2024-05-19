import {
    useLoaderData,
    redirect,
    defer,
    Await,
    ClientActionFunctionArgs,
    Form,
    useActionData,
    useRevalidator
} from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";

import { getCurrentUser, isLoggedIn, pb } from "~/lib/pocketbase.client";

import { Suspense, useEffect, useRef, useState } from "react";

import { SendHorizonalIcon, TriangleAlertIcon } from "lucide-react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { LoadingChat } from "~/components/loading/chat-skeleton";
import { MessageBox } from "~/components/message-box";
import { LoadingMetaData } from "~/components/loading/meta-skeleton";


export const meta: MetaFunction = () => {
    return [
        { title: "Chat" },
        { name: "description", content: "Welcome to serial chat" },
    ];
};

export async function clientLoader() {
    if (!isLoggedIn()) {
        return redirect("/auth")
    }

    const messages = pb.collection('messages').getFullList({
        sort: 'created',
        expand: "sender"
    });

    const metaData = pb.send<{
        members_count: number,
        messages_count: number,
    }>("/api/meta-data", {})

    return defer({
        messages,
        metaData
    })
}

export const clientAction = async ({
    request,
}: ClientActionFunctionArgs) => {

    const messageText = (await request.formData()).get("message-text") as string
    const currentUser = getCurrentUser()!

    try {
        const data = {
            "text": messageText,
            "sender": currentUser.id
        };

        await pb.collection('messages').create(data);

        return {
            sent: true
        }

    } catch {
        return {
            sent: false
        }
    }
};

export default function RouteComponent() {

    const { messages, metaData } = useLoaderData<typeof clientLoader>()
    const { revalidate: revalidateMessages } = useRevalidator()

    useEffect(() => {
        pb.collection('messages').subscribe('*', function (e) {
            revalidateMessages()
            return scrollToLastMessage()
        });

        return () => {
            pb.collection('messages').unsubscribe('*')
        }
    }, [])


    const formResponse = useActionData<typeof clientAction>()

    useEffect(() => {
        if (formResponse?.sent) {
            setMessage(() => "")
        }
    }, [formResponse])

    const [message, setMessage] = useState("")
    const [sendBtnDisabled, setSendBtnDisabled] = useState(false)

    function handleMessageChange(newMessage: string) {
        setMessage(() => newMessage)
    }

    useEffect(() => {
        if (message.trim() === "") {
            return setSendBtnDisabled(true)
        }
        return setSendBtnDisabled(false)
    }, [message])


    const currentUser = getCurrentUser()!

    const scrollAnchorRef = useRef<HTMLLIElement>(null)

    function scrollToLastMessage() {
        scrollAnchorRef.current?.scrollIntoView()
    }

    useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView()
    }, [])


    return (
        <div className="sm:max-w-md sm:mx-auto border h-[calc(100vh_-_4rem_-_1px)] lg:h-[calc(100vh_-_8rem_-_1px)] flex flex-col lg:mt-8">
            <header className="border-b">
                <div className="flex items-center gap-4 justify-between px-4 h-14">
                    <h1 className="font-bold">Chat</h1>
                    <Suspense fallback={<LoadingMetaData />}>
                        <Await resolve={metaData}>
                            {({ members_count, messages_count }) => (
                                <ul className="flex items-center gap-4">
                                    <li>

                                        <p className="text-xs text-muted-foreground">
                                            {messages_count} messages
                                        </p>
                                    </li>
                                    <li>
                                        <p className="text-xs text-muted-foreground">
                                            {members_count} memebers
                                        </p>
                                    </li>
                                </ul>
                            )}
                        </Await>
                    </Suspense>
                </div>
            </header>
            <section className="flex-1 overflow-y-auto overflow-x-clip">
                <div className="px-4 min-h-full">
                    <Suspense fallback={<LoadingChat />}>
                        <Await resolve={messages}>
                            {(messagesList) => (
                                <ul className="py-8">
                                    {messagesList.map((messageData) => (
                                        <li key={messageData.id}>
                                            <MessageBox
                                                isMine={currentUser.id === messageData.expand?.sender.id}
                                                messageData={messageData}
                                            />
                                        </li>
                                    ))}
                                    <li ref={scrollAnchorRef} onLoad={scrollToLastMessage} className="h-8"></li>
                                </ul>
                            )}
                        </Await>
                    </Suspense>

                </div>
            </section>
            <footer className="border-t">
                <Form method="post" className="h-12 flex items-center gap-1">
                    <div className="h-full p-1 flex-1">
                        <Textarea
                            value={message}
                            onChange={(evt) => handleMessageChange(evt.target.value)}
                            name="message-text"
                            placeholder="Type your message..."
                            className="w-full resize-none min-h-full h-full border-none"
                        />
                    </div>
                    <Button disabled={sendBtnDisabled} size="icon" title="Send message" className="h-full w-12">
                        <SendHorizonalIcon className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </Form>
            </footer>
        </div>
    );
}

export function ErrorBoundary() {
    return (
        <div className="h-[calc(100vh_-_4rem_-_1px)] flex items-center flex-col justify-center">
            <TriangleAlertIcon className="text-destructive h-12 w-12 mb-2" />
            <h2 className="font-bold">An Error Has Occured</h2>
            <p className="text-sm text-muted-foreground">Try refreshing the page</p>
        </div>
    )
}