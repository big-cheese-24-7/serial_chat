import { redirect } from "@remix-run/react"
import { isLoggedIn } from "./pocketbase.client"

export async function mustBeLoggedIn() {
    if (!isLoggedIn()) {

        return redirect("/auth")
    }

    return null
}

export async function mustBeNotLoggedIn() {
    if (isLoggedIn()) {
        return redirect("/")
    }

    return null
}