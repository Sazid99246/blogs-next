import { notFound } from "next/navigation";
import { getUserByUsername } from "../../services/users";

export const instant = false;

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>

      <h2>Added blogs</h2>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
