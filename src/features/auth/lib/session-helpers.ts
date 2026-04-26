import { readSession } from "../api/utils.ts"

export function isAdminAuthenticated() {
    return readSession() !== null
}

export function getAdminSession() {
    return readSession()
}