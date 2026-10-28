
import Link from "next/link";
import { getBlogs } from "../services/blogs";

export const instant = false;

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = "" } = await searchParams;

  const blogs = [...getBlogs()]
    .filter((blog) =>
      blog.title.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>

      <form action="/blogs" method="GET">
        <input
          type="text"
          name="filter"
          placeholder="Search by title"
          defaultValue={filter}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>{" "}
            {blog.author} {blog.likes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
