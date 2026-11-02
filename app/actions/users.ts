"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "../../db"
import { users } from "../../db/schema"
import { auth } from "@/auth"

type RegisterFormState = {
  errors?: {
    username?: string
    password?: string
    passwordConfirm?: string
  }
  values?: {
    username: string
    name: string
  }
}

export const registerUser = async (
  _prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> => {
  const username = ((formData.get("username") as string) ?? "").trim()
  const name = ((formData.get("name") as string) ?? "").trim()
  const password = (formData.get("password") as string) ?? ""
  const passwordConfirm =
    (formData.get("passwordConfirm") as string) ?? ""

  const errors: RegisterFormState["errors"] = {}

  if (username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  })

  if (existingUser) {
    errors.username = "This username is already taken"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  })

  redirect("/login")
}

export const generateToken = async () => {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({ token }).where(eq(users.username, session.user.email))

  redirect("/me")
}
