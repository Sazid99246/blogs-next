import { and, eq, sql } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingLists } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async () => {
  return db.query.blogs.findMany();
};

export const addBlog = async (
  title: string,
  author: string,
  url: string,
  likes = 0
) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const [blog] = await db
    .insert(blogs)
    .values({
      title,
      author,
      url,
      userId: user.id,
      likes,
    })
    .returning();

  await db.insert(readingLists).values({
    userId: user.id,
    blogId: blog.id,
  });

  return blog;
};

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });
};

export const addLike = async (id: number) => {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
};

export const addToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }

  const existingEntry = await db.query.readingLists.findFirst({
    where: (readingList, { and, eq }) =>
      and(
        eq(readingList.userId, user.id),
        eq(readingList.blogId, blogId),
      ),
  });

  if (existingEntry) {
    return false;
  }

  await db.insert(readingLists).values({
    userId: user.id,
    blogId,
  });

  return true;
};

export const markBlogAsRead = async (blogId: number) => {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Not logged in")
  }

  await db
    .update(readingLists)
    .set({ read: true })
    .where(
      and(
        eq(readingLists.userId, user.id),
        eq(readingLists.blogId, blogId)
      )
    )
}
