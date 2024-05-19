import { HammerIcon } from "lucide-react";

export function ComingSoon() {
    return (
        <div className="h-[calc(100vh_-_4rem_-_1px)] flex items-center flex-col justify-center">
            <HammerIcon className="text-primary h-12 w-12 mb-2" />
            <h2 className="font-bold">Under Construction</h2>
            <p className="text-sm text-muted-foreground">This page will be coming soon</p>
        </div>
    )
}
