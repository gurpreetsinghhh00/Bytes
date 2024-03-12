import { useParams } from "react-router-dom"
import useBlog from "../hooks/useBlog";
import Avatar from "../components/Avatar";
import { formattedDate } from "../utils/helper";
import Loading from "../components/Loading";

const Blog = () => {
    const {id} = useParams();
    const {loading, blog} = useBlog({id : id || ""});

  return loading ? (<Loading/>) : (
    <div className="p-8 md:p-0 font-varela grid lg:grid-cols-4 w-full md:w-4/5 m-auto gap-8 mt-16 mb-16">
        <div className="lg:col-span-3 p-4 md:p-2">
            <div className="font-bold text-5xl">{blog?.title}</div>
            <div className="text-slate-400">{`Posted on  ${formattedDate(blog?.createdAt)}`}</div>
            <p className="mt-4">{blog?.content}</p>
        </div>
        <div className="lg:col-span-1 p-2">
            <div>Author</div>
            <div className="pt-4 flex flex-row items-center gap-4">
                <Avatar name={blog?.author?.name || "Anonymous"} />
                <div className="text-xl font-bold">{blog?.author?.name || "Anonymous"}</div>
            </div>
        </div>
    </div>
  )
}

export default Blog
