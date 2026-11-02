
"use client"

import { useTransition } from "react"
import { addBlogLike } from "@/app/actions/blogs"
import { useNotification } from "@/app/contexts/NotificationContext"

const LikeButton = ({ blogId }: { blogId: number }) => {
  const [isPending, startTransition] = useTransition()
  const { showNotification } = useNotification()

  const handleLike = () => {
    startTransition(async () => {
      try {
        await addBlogLike(blogId)
        showNotification("You liked this blog!", "success")
      } catch {
        showNotification("Unable to like this blog. Please try again.", "error")
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isPending}
      className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Liking..." : "Like"}
    </button>
  )
}

export default LikeButton
