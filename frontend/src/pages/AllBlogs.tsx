import BlogCard from "../components/BlogCard"
import Shimmer from "../components/Shimmer";
import useBlogs from "../hooks/useBlogs"
import { formattedDate } from "../utils/helper";
import { Link } from "react-router-dom";

const AllBlogs = () => {
  const {loading, blogs} = useBlogs("/bulk");

  return loading ? (
    <Shimmer/>) : 
    (<div className="font-varela w-full md:w-4/5  xl:w-3/4 m-auto">
    {
      blogs.map((blog) => (
        <Link to= {`/blog/${blog.id}`} key={blog.id}>
          <BlogCard   id={blog.id} authorName={blog.author?.name || "Anonymous"} title={blog.title} content={blog.content} publishDate={formattedDate(blog.createdAt)}/>
        </Link>
        
      ))
    }
  </div>)
  
}

export default AllBlogs;
