import { env } from '@/shared/config/env'
import type { AdminSession } from "../model/session"
import { ADMIN_SESSION_KEY } from "../config"

export function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function readSession(): AdminSession | null {
  if (!canUseStorage()) {
    return null
  }

  const rawSession = window.localStorage.getItem(ADMIN_SESSION_KEY)

  if (!rawSession) {
    return null
  }

  try {
    const parsed = JSON.parse(rawSession) as Partial<AdminSession>

    if (typeof parsed.username !== 'string' || typeof parsed.signedInAt !== 'string') {
      return null
    }

    return {
      username: parsed.username,
      signedInAt: parsed.signedInAt,
    }
  } catch {
    return null
  }
}

export function getConfiguredCredentials() {
  return {
    username: env.VITE_ADMIN_USERNAME,
    password: env.VITE_ADMIN_PASSWORD
  }
}



