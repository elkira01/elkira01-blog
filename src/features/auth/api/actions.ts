import { ADMIN_SESSION_KEY } from "../config";
import type {AdminSession, SignInPayload} from "../model/session.ts";
import {canUseStorage, getConfiguredCredentials } from "./utils.ts";

export function signInAdmin(payload: SignInPayload) {
    const credentials = getConfiguredCredentials()

    const isValid =
        payload.username.trim() === credentials.username &&
        payload.password === credentials.password

    if (!isValid || !canUseStorage()) {
        return false
    }

    const session: AdminSession = {
        username: credentials.username,
        signedInAt: new Date().toISOString(),
    }

    window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))

    return true
}

export function signOutAdmin() {
    if (!canUseStorage()) {
        return
    }

    window.localStorage.removeItem(ADMIN_SESSION_KEY)
}
