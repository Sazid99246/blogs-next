
"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function NavBar() {
  const { data: session } = useSession()

  const linkStyle =
    "rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700"

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">

        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-indigo-700"
        >
          Bloglist<span className="text-indigo-400">.</span>
        </Link>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center gap-1">
          <Link href="/" className={linkStyle}>
            Home
          </Link>

          <Link href="/blogs" className={linkStyle}>
            Blogs
          </Link>

          <Link href="/users" className={linkStyle}>
            Users
          </Link>

          {session && (
            <Link
              href="/blogs/new"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              + Create New
            </Link>
          )}
        </div>

        {/* Authentication */}
        <div className="flex flex-wrap items-center gap-3">
          {session ? (
            <>
              <span className="text-sm text-gray-600">
                Welcome, <strong className="text-gray-900">
                  {session.user?.name}
                </strong>
              </span>

              <button
                onClick={() => signOut()}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={linkStyle}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}
