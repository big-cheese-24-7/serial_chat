import Pocketbase from "pocketbase"

const url = process.env.NODE_ENV === "development" ?
    "http://127.0.0.1:8090" :
    "https://serial-chat.pockethost.io/"

export const pb = new Pocketbase(url)

export function isLoggedIn() {
    return pb.authStore.isValid
}

export function getCurrentUser() {
    return pb.authStore.model
}

export function logout() {
    pb.authStore.clear()
    return window.location.reload()
}