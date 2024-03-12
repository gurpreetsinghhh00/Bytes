import { useNavigate, useParams } from "react-router-dom"
import useBlog from "../hooks/useBlog";
import { formattedDate } from "../utils/helper";
import Button from "../components/Button";
import axios from "axios";
import Loading from "../components/Loading";

const UserFullBlog = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const {loading, blog} = useBlog({id : id || ""});

    const handleDelete = async (id : any)=>{
        try {
            await axios.delete(`/api/v1/blog/${id}`)
        } catch (error) {
            console.error("Something went wrong while deleting blog")
        }
    }

  return loading ? (<Loading/>) : (
    <div className="p-8 md:p-0 font-varela grid lg:grid-cols-4 w-full md:w-4/5 m-auto gap-8 mt-16 mb-16">
        <div className="lg:col-span-3 p-4 md:p-2">
            <div className="font-bold text-5xl">{blog?.title}</div>
            <div className="text-slate-400">{`Posted on  ${formattedDate(blog?.createdAt)}`}</div>
            <p className="mt-4">{blog?.content}</p>
        </div>
        <div className="lg:col-span-1 p-2">
            <div className="pt-4 flex flex-row lg:flex-col items-center gap-4">
                <Button onClick={()=>{navigate(`/edit/${blog?.id}`)}}>Edit</Button>
                <Button onClick={()=>{handleDelete(blog?.id)}}>Update</Button>
            </div>
        </div>
    </div>
  )
}

export default UserFullBlog;
