import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Chat" },
        { name: "description", content: "Welcome to serial chat" },
    ];
};

export default function RouteComponent() {
    return (
        <div>
            chat
        </div>
    );
}