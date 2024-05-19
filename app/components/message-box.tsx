import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

import { RecordModel } from "pocketbase"
import { getInitialLetter } from "~/lib/utils"

type MessageBoxProps = {
    messageData: RecordModel
    isMine: boolean
}


export function MessageBox({ messageData, isMine }: MessageBoxProps) {
    if (isMine) {
        return (
            <article className="flex items-end gap-2.5 justify-end mb-4 pl-10">
                <section className="!break-words !text-pretty  rounded-md bg-primary text-primary-foreground max-w-[calc(100vw_-_118px)] sm:max-w-xs break-before-all">
                    <p className=" inline-block text-sm !text-pretty px-3 py-2 !break-words w-full">
                        {messageData.text}
                    </p>
                </section>
                <Avatar title={messageData.expand?.sender.username} className="h-8 w-8">
                    <AvatarImage src={messageData.expand?.sender.avatar_url} alt={`${messageData.expand?.sender.username} profile picture`} />
                    <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                        {getInitialLetter(messageData.expand?.sender.username)}
                    </AvatarFallback>
                </Avatar>
            </article>
        )
    }


    return (
        <article className="flex items-end gap-2.5 mb-4 break-words pr-10">
            <Avatar title={messageData.expand?.sender.username} className="h-8 w-8">
                <AvatarImage src={messageData.expand?.sender.avatar_url} alt={`${messageData.expand?.sender.username} profile picture`} />
                <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                    {getInitialLetter(messageData.expand?.sender.username)}
                </AvatarFallback>
            </Avatar>

            <section className="!break-words !text-pretty rounded-md bg-secondary max-w-[calc(100vw_-_118px)] sm:max-w-xs break-before-all">
                <p className="inline-block text-sm !text-pretty px-3 py-2 !break-words w-full">
                    {messageData.text}
                </p>
            </section>
        </article>
    )
}