
"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md">

        {/* Heading */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-bold tracking-tight text-indigo-700"
          >
            Bloglist<span className="text-indigo-400">.</span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Sign in to continue to your account.
          </p>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
            >
              {error}
            </p>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              autoComplete="username"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Register
            </Link>
          </p>
        </form>

      </div>
    </main>
  )
}
