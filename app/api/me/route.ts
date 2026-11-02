import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization")

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Token missing or invalid" },
      { status: 401 }
    )
  }

  const token = authorization.substring(7)

  const user = await db.query.users.findFirst({
    where: eq(users.token, token),
  })

  if (!user) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    )
  }

  return NextResponse.json({
    name: user.name,
    username: user.username,
  })
}
