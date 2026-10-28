import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs();
  return (
      <div>
        <h2>Blogs</h2>
        <ul>
          {blogs.map(blog => (
            <li key={blog.id}>
              <a href={blog.url}>{blog.title}</a> {blog.author} {blog.likes}
            </li>
          ))}
        </ul>
      </div>
  )
}

export default Blogs
