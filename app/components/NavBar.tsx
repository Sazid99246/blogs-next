"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  return (
    <nav>
        <Link href='/'>Home</Link>
        {" | "}
        <Link href='/blogs'>Blogs</Link>
        {" | "}
        {session ? (
          <>
            <Link href="/blogs/new">create new</Link>
            {" | "}
            <em>{session.user?.name} logged in</em>{" "}
            <button onClick={() => signOut()}>logout</button>
          </>
          ) : (
          <>
            <Link href="/login">login</Link>
            {" | "}
            <Link href="/register">register</Link>
          </>
        )}
        {" | "}
        <Link href='/users'>Users</Link>
    </nav>
  )
}
