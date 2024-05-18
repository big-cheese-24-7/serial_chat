import { useLoaderData, redirect, defer, Await } from "@remix-run/react";
import { type MetaFunction } from "@remix-run/node";

import { getCurrentUser, isLoggedIn, pb } from "~/lib/pocketbase.client";
import { SendHorizonalIcon, TriangleAlertIcon } from "lucide-react";
import { Suspense, useEffect, useRef } from "react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { RecordModel } from "pocketbase";

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

    return defer({
        messages
    })
}

type MessageBoxProps = {
    messageData: RecordModel
    isMine: boolean
}
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { getInitialLetter } from "~/lib/utils";

function MessageBox({ messageData, isMine }: MessageBoxProps) {

    if (isMine) {
        return (
            <article className="flex items-end gap-2 justify-end mb-4 pl-10">
                <section className="!break-words  !text-pretty px-4 py-3 rounded-md bg-primary text-primary-foreground max-w-[calc(100vw_-_118px)] sm:max-w-xs break-before-all">
                    <div className=" inline-block text-sm !text-pretty !break-words w-full">
                        {messageData.text}
                    </div>
                </section>
                <Avatar title={messageData.expand?.sender.username} className="h-8 w-8" >
                    <AvatarImage src={messageData.expand?.sender.avatar_url} alt={`${messageData.expand?.sender.username} profile picture`} />
                    <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                        {getInitialLetter(messageData.expand?.sender.username)}
                    </AvatarFallback>
                </Avatar>
            </article>
        )
    }


    return (
        <article className="flex items-end gap-2 mb-4 break-words pr-10">
            <Avatar title={messageData.expand?.sender.username} className="h-8 w-8">
                <AvatarImage src={messageData.expand?.sender.avatar_url} alt={`${messageData.expand?.sender.username} profile picture`} />
                <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                    {getInitialLetter(messageData.expand?.sender.username)}
                </AvatarFallback>
            </Avatar>

            <section className="!break-words !text-pretty px-4 py-3 rounded-md bg-secondary max-w-[calc(100vw_-_118px)] sm:max-w-xs break-before-all">
                <div className=" inline-block text-sm !text-pretty !break-words w-full">
                    {messageData.text}
                </div>
            </section>
        </article>
    )
}



export default function RouteComponent() {

    const { messages } = useLoaderData<typeof clientLoader>()

    const currentUser = getCurrentUser()!

    const scrollAnchorRef = useRef<HTMLLIElement>(null)

    useEffect(() => {
        scrollAnchorRef.current?.scrollIntoView()
    }, [])


    return (
        <div className="sm:max-w-md sm:mx-auto  h-[calc(100vh_-_4rem_-_1px)] flex flex-col lg:py-8">
            <header>
                <div className="flex items-center gap-4 border justify-between px-4 h-14 dark:bg-secondary">
                    <h1 className="font-bold">Chat</h1>
                    <ul className="flex items-center gap-4">
                        <li>

                            <p className="text-xs text-muted-foreground">
                                23 messages
                            </p>
                        </li>
                        <li>
                            <p className="text-xs text-muted-foreground">
                                56 memebers
                            </p>
                        </li>
                    </ul>
                </div>
            </header>
            <section className="flex-1 overflow-y-auto overflow-x-clip">
                <div className="border-x px-4 h-full">
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
                                    <li ref={scrollAnchorRef}></li>
                                </ul>
                            )}
                        </Await>
                    </Suspense>

                </div>
            </section>
            <footer>
                <form className="border h-12 flex items-center gap-1">
                    <Textarea placeholder="Type your message..." name="message-text" className="resize-none min-h-full h-full border-none flex-1" />
                    <Button size="icon" title="Send message" className="h-full">
                        <SendHorizonalIcon className="h-5 w-5" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </footer>
        </div>
    );
}

function LoadingChat() {
    return (
        <div className="h-[calc(100vh_-_4rem_-_1px)] flex items-center flex-col justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" className="h-24 w-24 lg:h-40 lg:w-40"
            ><path
                fill="none"
                stroke="#FF156D"
                strokeWidth="15"
                strokeLinecap="round"
                strokeDasharray="300 385"
                strokeDashoffset="0"
                d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                className="stroke-primary"
            ><animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="2"
                values="685;-685"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
            ></animate>
                </path>
            </svg>
        </div>
    )
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
