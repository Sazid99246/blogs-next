"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLike, addToReadingList, markBlogAsRead } from "../services/blogs"
import { auth } from "@/auth"

type BlogFormState = {
  errors?: {
    title?: string
    author?: string
    url?: string
  }
  values?: {
    title: string
    author: string
    url: string
  }
  success?: string
  error?: string
}

export const createBlog = async (
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = (formData.get("title") as string) ?? ""
  const author = (formData.get("author") as string) ?? ""
  const url = (formData.get("url") as string) ?? ""

  const errors: BlogFormState["errors"] = {}

  if (title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters long"
  }

  if (author.trim().length < 5) {
    errors.author = "Author must be at least 5 characters long"
  }

  if (url.trim().length < 5) {
    errors.url = "URL must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { title, author, url },
    }
  }

  try {
  await addBlog(title.trim(), author.trim(), url.trim())

  revalidatePath("/blogs")

  return {
      success: "Blog created successfully!",
    }
  } catch (error) {
    console.error("Blog creation failed:", error)

    return {
      error: "Unable to create the blog. Please try again.",
      values: { title, author, url },
    }
  }
}


export const addBlogLike = async (id: number) => {
  await addLike(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}


export const addBlogToReadingList = async (blogId: number) => {
  const added = await addToReadingList(blogId);

  revalidatePath("/me");
  revalidatePath(`/blogs/${blogId}`);

  return added;
};

export const markBlogAsReadAction = async (blogId: number) => {
  await markBlogAsRead(blogId)

  revalidatePath("/me")
}
