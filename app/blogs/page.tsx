
import Link from "next/link"
import { getBlogs } from "../services/blogs"

export const instant = false

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter = "" } = await searchParams

  const allBlogs = await getBlogs()

  const blogs = allBlogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes)

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* Page heading */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Discover and explore
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Blogs
          </h1>

          <p className="mt-2 text-gray-500">
            Explore ideas, stories, and perspectives from our community.
          </p>
        </div>

        {/* Search form */}
        <form
          action="/blogs"
          method="GET"
          className="mb-8 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row"
        >
          <input
            type="text"
            name="filter"
            placeholder="Search blogs by title..."
            defaultValue={filter}
            aria-label="Search blogs by title"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Search
          </button>

          {filter && (
            <Link
              href="/blogs"
              className="rounded-lg border border-gray-300 px-6 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Clear
            </Link>
          )}
        </form>

        {/* Results information */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {filter ? "Search results" : "Recent and popular blogs"}
          </h2>

          <span className="text-sm text-gray-500">
            {blogs.length} {blogs.length === 1 ? "blog" : "blogs"}
          </span>
        </div>

        {/* Blog list */}
        {blogs.length > 0 ? (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="min-w-0">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="text-lg font-semibold text-gray-900 transition group-hover:text-indigo-700 sm:text-xl"
                    >
                      {blog.title}
                    </Link>

                    <p className="mt-2 text-sm text-gray-500">
                      Written by{" "}
                      <span className="font-medium text-gray-700">
                        {blog.author}
                      </span>
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 self-start rounded-full bg-indigo-50 px-3 py-2 text-sm font-medium text-indigo-700 sm:self-center">
                    <span aria-hidden="true">♥</span>
                    <span>{blog.likes} likes</span>
                  </div>

                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              No blogs found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              {filter
                ? "Try searching with a different title."
                : "There are no blogs to display yet."}
            </p>

            {filter && (
              <Link
                href="/blogs"
                className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                View all blogs
              </Link>
            )}
          </div>
        )}

      </div>
    </main>
  )
}

export default Blogs
