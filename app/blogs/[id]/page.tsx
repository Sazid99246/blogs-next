import Link from "next/link"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"
import LikeButton from "@/app/components/LikeButton"
import { getCurrentUser } from "@/app/services/session"
import AddToReadingListButton from "@/app/components/AddToReadingListButton"

export const instant = false

const Blog = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  const currentUser = await getCurrentUser()

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <article className="mx-auto max-w-3xl">

        {/* Back navigation */}
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          <span aria-hidden="true">←</span>
          Back to blogs
        </Link>

        {/* Blog content */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">

          {/* Article heading */}
          <div className="border-b border-gray-100 pb-6">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Blog article
            </p>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              {blog.title}
            </h1>

            <p className="mt-4 text-sm text-gray-500">
              Written by{" "}
              <span className="font-semibold text-gray-800">
                {blog.author}
              </span>
            </p>
          </div>

          {/* Article URL */}
          <div className="py-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              Read the original article
            </h2>

            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-base font-medium text-indigo-600 underline decoration-indigo-200 underline-offset-4 transition hover:text-indigo-800"
            >
              {blog.url}
            </a>
          </div>

          {/* Likes and interaction */}
          <div className="flex flex-col gap-4 rounded-xl bg-gray-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Community appreciation
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {blog.likes}{" "}
                <span className="text-base font-medium text-gray-500">
                  {blog.likes === 1 ? "like" : "likes"}
                </span>
              </p>
            </div>

            <LikeButton blogId={blog.id} />

            {currentUser && currentUser.id !== blog.userId && (
              <AddToReadingListButton blogId={blog.id} />
            )}
          </div>

        </div>
      </article>
    </main>
  )
}

export default Blog
