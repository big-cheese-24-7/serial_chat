import type { MetaFunction } from "@remix-run/node";
import { mustBeLoggedIn } from "~/lib/auth-guards";

export const meta: MetaFunction = () => {
    return [
        { title: "Chat" },
        { name: "description", content: "Welcome to serial chat" },
    ];
};

export const clientLoader = mustBeLoggedIn

export default function RouteComponent() {
    return (
        <div>
            chat
        </div>
    );
}