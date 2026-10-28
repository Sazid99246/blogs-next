const blogs = [
  {
    id: 1,
    title: "HTML is easy",
    author: "Sheikh Md. Sazidul Islam",
    url: "https://example.com",
    likes: 10,
  },
  {
    id: 2,
    title: "CSS is hard",
    author: "Sanja Islam Lazz",
    url: "https://example.com",
    likes: 20,
  },
]

let nextId = 3

export const getBlogs = () => {
  return blogs
}

export const addBlog = (
  title: string,
  author: string,
  url: string,
  likes = 0
) => {
  blogs.push({
    id: nextId++,
    title,
    author,
    url,
    likes,
  })
}

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id)
}

export const addLike = (id: number) => {
  const blog = blogs.find(blog => blog.id === id)

  if (blog) {
    blog.likes += 1
  }
}
