"use client"

import { useTransition } from "react"
import { useNotification } from "@/app/contexts/NotificationContext"
import { addBlogToReadingList } from "../actions/blogs"

const AddToReadingListButton = ({
  blogId,
}: {
  blogId: number
}) => {
  const [isPending, startTransition] = useTransition()
  const { showNotification } = useNotification()

  const handleAdd = () => {
    startTransition(async () => {
      try {
        const added = await addBlogToReadingList(blogId)

        if (added) {
          showNotification("Blog added to your reading list!", "success")
        } else {
          showNotification("This blog is already in your reading list.", "error")
        }
      } catch {
        showNotification("Unable to add blog to reading list.", "error")
      }
    })
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isPending}
      className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      data-testid="add-to-reading-list-button"
    >
      {isPending ? "Adding..." : "Add to reading list"}
    </button>
  )
}

export default AddToReadingListButton
