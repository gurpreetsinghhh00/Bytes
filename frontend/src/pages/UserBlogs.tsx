import useBlogs from "../hooks/useBlogs";
import BlogCard from "../components/BlogCard";
import { formattedDate } from "../utils/helper";
import Shimmer from "../components/Shimmer";
import { Link } from "react-router-dom";

const UserBlogs = () => {
    const {loading, blogs} = useBlogs("/bulk/user");

    return loading ? (
     <Shimmer/>) : 
      (
          blogs.length == 0 ? (
          <div className="p-2 mt-10 font-bold text-lg text-center">
            No blogs available
          </div>
        ) : (
          <div className="font-varela w-full md:w-4/5  xl:w-3/4 m-auto">
          {
            blogs.map((blog) => (
              <Link key={blog.id} to={`/blog/user/${blog.id}`}>
                <BlogCard  id={blog.id} authorName={blog.author?.name || "Anonymous"} title={blog.title} content={blog.content} publishDate={formattedDate(blog.createdAt)}/>
              </Link>
            ))
          }
        </div>
        ) 
      )
}

export default UserBlogs
