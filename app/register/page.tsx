
"use client"

import Link from "next/link"
import { useActionState } from "react"
import { registerUser } from "../actions/users"

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: {
      username: "",
      name: "",
    },
  })

  const inputStyle =
    "mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"

  const labelStyle =
    "block text-sm font-semibold text-gray-700"

  const errorStyle =
    "mt-2 text-sm font-medium text-red-600"

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
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join our community and start sharing ideas.
          </p>
        </div>

        {/* Registration form */}
        <form
          action={formAction}
          className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
        >

          {/* Username */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>

            <input
              type="text"
              name="username"
              id="username"
              placeholder="Choose a username"
              autoComplete="username"
              required
              defaultValue={state.values?.username}
              aria-invalid={!!state.errors?.username}
              className={inputStyle}
            />

            {state.errors?.username && (
              <p
                className={errorStyle}
                role="alert"
                data-testid="username-error"
              >
                {state.errors.username}
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              autoComplete="name"
              required
              defaultValue={state.values?.name}
              className={inputStyle}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="Create a password"
              autoComplete="new-password"
              required
              minLength={4}
              aria-invalid={!!state.errors?.password}
              className={inputStyle}
            />

            {state.errors?.passwordConfirm && (
              <p
                className={errorStyle}
                role="alert"
                data-testid="passwordConfirm-error"
              >
                {state.errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label htmlFor="passwordConfirm" className={labelStyle}>
              Confirm Password
            </label>

            <input
              type="password"
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="Enter your password again"
              autoComplete="new-password"
              required
              aria-invalid={!!state.errors?.passwordConfirm}
              className={inputStyle}
            />

            {state.errors?.passwordConfirm && (
              <p className={errorStyle} role="alert">
                {state.errors.passwordConfirm}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            data-testid="register-button"
            className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Sign in
            </Link>
          </p>

        </form>
      </div>
    </main>
  )
}

export default RegisterPage
