import { createBlog } from "@/app/actions/blogs";

const NewBlog = () => {
    return (
        <div>
            <h2>Create a new blog</h2>
            <form action={createBlog}>
                <div>
                    <label htmlFor="title">
                        Title
                        <input type="text" name="title" id="title" required />
                    </label>
                </div>
                <div>
                    <label htmlFor="author">
                        Author
                        <input type="text" name="author" id="author" required />
                    </label>
                </div>
                <div>
                    <label htmlFor="url">
                        URL
                        <input type="text" name="url" id="url" required />
                    </label>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default NewBlog;
