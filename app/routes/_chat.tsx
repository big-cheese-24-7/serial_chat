import { Link, Outlet, useLocation } from "@remix-run/react"
import { PropsWithChildren, useEffect, useState } from "react";

import { cn, getInitialLetter } from "~/lib/utils";
import { FacebookIcon, LogOutIcon, MessageSquareCodeIcon, MessagesSquareIcon, MoonIcon, SunIcon, Users2Icon } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "~/components/ui/sheet"
import { useTheme } from "~/components/theme-provider";
import { getCurrentUser, logout } from "~/lib/pocketbase.client";

type UserAvatarProps = {
    avatar_url: string
    username: string
}

function UserAvatar({ avatar_url, username }: UserAvatarProps) {

    return (
        <Avatar className="h-10 w-10">
            <AvatarImage src={avatar_url} alt={`${username} profile picture`} />
            <AvatarFallback className="bg-primary text-lg text-primary-foreground">
                {getInitialLetter(username)}
            </AvatarFallback>
        </Avatar>
    )
}

function UserSheet({ children }: PropsWithChildren) {

    const currentUser = getCurrentUser()!

    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()

    useEffect(() => {
        setOpen(() => false)
    }, [pathname])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="max-w-sm ">
                <ul className="space-y-1">
                    <li>
                        <div className="px-2 py-3 flex items-center gap-3">
                            <div>
                                <UserAvatar avatar_url={currentUser.avatar_url} username={currentUser.username} />
                            </div>

                            <div className="truncate">
                                <p className="font-semibold text-sm truncate">
                                    {currentUser.username}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                    {currentUser.email}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to={"/"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-start gap-3")}>
                            <MessageSquareCodeIcon className="h-4 w-4" />
                            <span>Chat</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/members"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-start gap-3")}>
                            <Users2Icon className="h-4 w-4" />
                            <span>Members</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/my-messages"} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-start gap-3")}>
                            <MessagesSquareIcon className="h-4 w-4" />
                            <span>My Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.facebook.com/DZ.Inventors" target="_blank" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full justify-start gap-3")}>
                            <FacebookIcon className="h-4 w-4" />
                            <span>Facebook</span>
                        </Link>
                    </li>

                    <li>
                        <Button onClick={logout} variant={"ghost"} size={"sm"} className="w-full justify-start gap-3 text-destructive">
                            <LogOutIcon className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
    )
}


export default function Layout() {

    const currentUser = getCurrentUser()!

    const { theme, toggleTheme } = useTheme()

    return (
        <div className="relative">
            <header className="lg:border-b sticky top-0 left-0 right-0 z-40 bg-background shadow-sm">
                <div className="h-16 flex items-center gap-4 lg:gap-8 px-4 lg:px-8 max-w-7xl mx-auto justify-between">
                    <section className="-ml-2">
                        <Link to="/" className="flex items-center gap-3 styled-focus rounded-md py-1.5 px-2">
                            <img src="/serial-chat-logo.svg" alt="Serial chat logo" className="h-7 w-7 lg:h-9 lg:w-9" />
                            <span className="text-lg lg:text-xl font-extrabold">Serial Chat</span>
                        </Link>
                    </section>

                    <ul className="flex items-center gap-4">
                        <li>
                            <Button
                                onClick={toggleTheme}
                                title={theme === "dark" ? "Light theme" : "Dark theme"}
                                variant={"outline"}
                                size={"icon"}
                            >
                                {theme === "dark" ? (
                                    <>
                                        <SunIcon className="h-5 w-5" />
                                        <span className="sr-only">Toggle to light theme</span>
                                    </>
                                ) : (
                                    <>
                                        <MoonIcon className="h-5 w-5" />
                                        <span className="sr-only">Toggle to dark theme</span>
                                    </>
                                )}
                            </Button>
                        </li>
                        <li>
                            <Link to="https://www.facebook.com/DZ.Inventors" target="_blank" title="DZ Inventors facebook page" className={cn(buttonVariants({ variant: "outline", size: "icon" }))}>
                                <FacebookIcon className="h-5 w-5" />
                                <span className="sr-only">Visit our facebook page</span>
                            </Link>
                        </li>
                        <li className="h-10">
                            <UserSheet>
                                <Button variant={"ghost"} size={"icon"} className="rounded-full">
                                    <UserAvatar avatar_url={currentUser.avatar_url} username={currentUser.username} />
                                </Button>
                            </UserSheet>
                        </li>
                    </ul>
                </div>
            </header>

            <main>
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}