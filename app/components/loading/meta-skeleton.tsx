import { Skeleton } from "../ui/skeleton";

export function LoadingMetaData() {
    return (
        <ul className="flex items-center gap-4">
            <li>
                <Skeleton className="w-[70px] h-[16px] rounded-full" />
            </li>
            <li>
                <Skeleton className="w-[70px] h-[16px] rounded-full" />
            </li>
        </ul>
    )
}