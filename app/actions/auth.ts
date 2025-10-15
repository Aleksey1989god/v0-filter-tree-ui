"use server"

import { redirect } from "next/navigation"
import { validateCredentials, createSession, destroySession } from "@/lib/auth"

export async function login(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const user = await validateCredentials(username, password)

  if (!user) {
    return { error: "Invalid credentials" }
  }

  await createSession(user)
  redirect("/dashboard")
}

export async function logout() {
  await destroySession()
  redirect("/login")
}
