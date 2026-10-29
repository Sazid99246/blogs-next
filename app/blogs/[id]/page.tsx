import { addBlogLike } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { notFound } from "next/navigation";

export const instant = false

const Blog = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const blog = await getBlogById(Number(id))

    if (!blog) {
        notFound()
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <p>Author: {blog.author}</p>
            <p>URL: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
            <form action={addBlogLike}>
                <input type="hidden" name="id" value={blog.id} />
                <button type="submit">Like</button>
            </form>
        </div>
    );
};

export default Blog;
