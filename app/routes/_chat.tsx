import { Link, Outlet, useLocation } from "@remix-run/react"
import { PropsWithChildren, useEffect, useState } from "react";

import { cn } from "~/lib/utils";
import { FacebookIcon, LogOutIcon, MessageSquareCodeIcon, MessagesSquareIcon, MoonIcon, SunIcon, Users2Icon } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "~/components/ui/sheet"
import { useTheme } from "~/components/theme-provider";

function UserSheet({ children }: PropsWithChildren) {
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
            <SheetContent className="max-w-sm">
                <ul className="space-y-1">
                    <li>
                        <div className="px-2 py-3 flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="font-semibold text-sm">Bombardo</p>
                                <p className="text-xs text-muted-foreground">poupou142@gogo.cov</p>
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
                        <Button variant={"ghost"} size={"sm"} className="w-full justify-start gap-3 text-destructive">
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
    const { setTheme, theme } = useTheme()

    function toggleTheme() {
        if (theme === "dark") {
            return setTheme("light")
        }
        return setTheme("dark")
    }

    return (
        <div className="relative">
            <header className="border-b sticky top-0 left-0 right-0 z-40 bg-background shadow-sm">
                <div className="h-16 flex items-center gap-8 px-4 lg:px-8 justify-between">
                    <section className="-ml-2">
                        <Link to="/" className="flex items-center gap-3 styled-focus rounded-md py-1.5 px-2">
                            <img src="/serial-chat-logo.svg" alt="Serial chat logo" className="h-7 w-7 lg:h-9 lg:w-9" />
                            <span className="text-lg lg:text-xl font-bold">Serial Chat</span>
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
                                    <Avatar className="h-full w-full">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </UserSheet>
                        </li>
                    </ul>
                </div>
            </header>

            <main>
                <div className="px-4 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}