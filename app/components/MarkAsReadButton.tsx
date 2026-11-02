"use client"

import { useTransition } from "react"
import { markBlogAsReadAction } from "@/app/actions/blogs"

const MarkAsReadButton = ({
  blogId,
}: {
  blogId: number
}) => {
  const [isPending, startTransition] = useTransition()

  const handleMarkAsRead = () => {
    startTransition(async () => {
      await markBlogAsReadAction(blogId)
    })
  }

  return (
    <button
      data-testid={`mark-read-${blogId}`}
      type="button"
      onClick={handleMarkAsRead}
      disabled={isPending}
      className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Updating..." : "Mark as read"}
    </button>
  )
}

export default MarkAsReadButton
