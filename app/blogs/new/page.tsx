"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "@/app/contexts/NotificationContext"

const NewBlog = () => {
  const router = useRouter()
  const { showNotification } = useNotification()

  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: {
      title: "",
      author: "",
      url: "",
    },
  })

  useEffect(() => {
    if (state.success) {
        showNotification(state.success, "success")
        router.push("/blogs")
    }

    if (state.error) {
        showNotification(state.error, "error")
    }
    }, [state.success, state.error, showNotification, router])

  const inputStyle =
    "mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"

  const labelStyle =
    "block text-sm font-semibold text-gray-700"

  const errorStyle =
    "mt-2 text-sm font-medium text-red-600"

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">

        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Share your knowledge
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create a New Blog
          </h1>

          <p className="mt-2 text-gray-500">
            Share an interesting article with the Bloglist community.
          </p>
        </div>

        {/* Blog creation form */}
        <form
          action={formAction}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >

          {/* Title */}
          <div>
            <label htmlFor="title" className={labelStyle}>
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter the blog title"
              defaultValue={state.values?.title}
              required
              aria-invalid={!!state.errors?.title}
              aria-describedby={state.errors?.title ? "title-error" : undefined}
              className={inputStyle}
            />

            {state.errors?.title && (
              <p id="title-error" className={errorStyle}>
                {state.errors.title}
              </p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className={labelStyle}>
              Author
            </label>

            <input
              type="text"
              name="author"
              id="author"
              placeholder="Enter the author's name"
              defaultValue={state.values?.author}
              required
              aria-invalid={!!state.errors?.author}
              aria-describedby={state.errors?.author ? "author-error" : undefined}
              className={inputStyle}
            />

            {state.errors?.author && (
              <p id="author-error" className={errorStyle}>
                {state.errors.author}
              </p>
            )}
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className={labelStyle}>
              Blog URL
            </label>

            <input
              type="text"
              name="url"
              id="url"
              placeholder="https://example.com/article"
              defaultValue={state.values?.url}
              required
              aria-invalid={!!state.errors?.url}
              aria-describedby={state.errors?.url ? "url-error" : undefined}
              className={inputStyle}
            />

            {state.errors?.url && (
              <p id="url-error" className={errorStyle}>
                {state.errors.url}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="border-t border-gray-100 pt-6">
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              Create Blog
            </button>
          </div>

        </form>

        <p className="mt-5 text-center text-xs text-gray-400">
          Please make sure the information is accurate before submitting.
        </p>

      </div>
    </main>
  )
}

export default NewBlog
