import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { readingLists, users } from "@/db/schema"
import { generateToken } from "@/app/actions/users"
import MarkAsReadButton from "@/app/components/MarkAsReadButton"

export default async function MePage() {
  const session = await auth()

  if (!session?.user?.email) {
    redirect("/login")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })

  if (!user) {
    redirect("/login")
  }

  const userReadingList = await db.query.readingLists.findMany({
    where: eq(readingLists.userId, user.id),
    with: {
      blog: true,
    },
  })

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        My Profile
      </h1>

      <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>

        <p>
          <span className="font-semibold">Username:</span> {user.username}
        </p>

        <div>
          <h2 className="mb-2 font-semibold">API Token</h2>

          {user.token ? (
            <p className="break-all rounded-lg bg-gray-100 p-3 text-sm">
              {user.token}
            </p>
          ) : (
            <form action={generateToken}>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Generate token
              </button>
            </form>
          )}
        </div>
      </div>
      <section className="mt-10">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          My Reading List
        </h2>

        {/* Unread blogs */}
        <div className="mb-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Unread
          </h3>

          {userReadingList.filter((entry) => !entry.read).length === 0 ? (
            <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">
              No unread blogs.
            </p>
          ) : (
            <div className="space-y-4">
              {userReadingList
                .filter((entry) => !entry.read)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">
                      <Link
                        href={`/blogs/${entry.blog.id}`}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {entry.blog.title}
                      </Link>
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      By {entry.blog.author}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Likes: {entry.blog.likes}
                    </p>

                    <MarkAsReadButton blogId={entry.blog.id} />
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Read blogs */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Read
          </h3>

          {userReadingList.filter((entry) => entry.read).length === 0 ? (
            <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-600">
              No read blogs yet.
            </p>
          ) : (
            <div className="space-y-4">
              {userReadingList
                .filter((entry) => entry.read)
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <h4 className="text-lg font-semibold text-gray-900">
                      <Link
                        href={`/blogs/${entry.blog.id}`}
                        className="text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        {entry.blog.title}
                      </Link>
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      By {entry.blog.author}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Likes: {entry.blog.likes}
                    </p>

                    <span className="mt-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Read
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
