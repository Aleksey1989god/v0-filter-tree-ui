import { cookies } from "next/headers"

export type UserRole = "admin" | "user"

export interface User {
  username: string
  role: UserRole
}

// Mock user database - in production, this would be a real database
const USERS: Record<string, { password: string; role: UserRole }> = {
  admin: { password: "admin123", role: "admin" },
  user: { password: "user123", role: "user" },
}

export async function validateCredentials(username: string, password: string): Promise<User | null> {
  const user = USERS[username]
  if (user && user.password === password) {
    return { username, role: user.role }
  }
  return null
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    return session as User
  } catch {
    return null
  }
}

export async function createSession(user: User) {
  const cookieStore = await cookies()
  cookieStore.set("session", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete("session")
}
