import { ClientActionFunctionArgs, Form, Link, MetaFunction, redirect } from "@remix-run/react";

import { pb } from "~/lib/pocketbase.client";
import { ClientResponseError } from "pocketbase";
import { mustBeNotLoggedIn } from "~/lib/auth-guards";

import { useTheme } from "~/components/theme-provider";
import { cn } from "~/lib/utils";
import { toast } from "sonner";

import { ChromeIcon, FacebookIcon, GithubIcon, MoonIcon, SunIcon } from "lucide-react";
import { Button, buttonVariants } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"

export const meta: MetaFunction = () => {
    return [
        { title: "Authenticate" },
        { name: "description", content: "Authenticate to continue" },
    ];
};

export const clientLoader = mustBeNotLoggedIn

export const clientAction = async ({
    request,
}: ClientActionFunctionArgs) => {

    const provider = (await request.formData()).get("provider") as string

    try {
        await pb.collection('members').authWithOAuth2({ provider })
        toast.success("Authentication successfull!")
        return redirect("/")
    } catch (error) {
        if (error instanceof ClientResponseError) {
            return toast.error(error.message)
        }
        return toast.error("Authentication failed! try again")
    }
};

export default function RouteComponent() {

    const { theme, toggleTheme } = useTheme()

    return (
        <div className="flex h-screen flex-col">
            <header className="border-b sticky top-0 left-0 right-0 z-40 bg-background shadow-sm">
                <div className="h-16 flex items-center gap-8 px-4 lg:px-8 max-w-7xl mx-auto justify-between">
                    <section className="-ml-2">
                        <Link to="/auth" className="flex items-center gap-3 styled-focus rounded-md py-1.5 px-2">
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

                    </ul>
                </div>
            </header>
            <main className="flex-1">
                <div className="h-full flex items-center justify-center px-4 lg:px-8 max-w-7xl mx-auto">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-center text-xl font-bold">Authenticate</CardTitle>
                            <CardDescription className="text-center text-sm text-muted-foreground">Choose your provider to continue with</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form className="space-y-2" method="post">
                                <Button value="google" name="provider" size={"lg"} className="w-full gap-3 bg-gray-100 text-gray-900 hover:bg-gray-200">
                                    <ChromeIcon className="h-5 w-5" />
                                    <span>Continue with google</span>
                                </Button>
                                <Button value="github" name="provider" size={"lg"} className="w-full gap-3 bg-gray-900 text-white hover:bg-gray-800">
                                    <GithubIcon className="h-5 w-5" />
                                    <span>Continue with github</span>
                                </Button>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}