import { useEffect, useState } from "react";
import Button from "../components/Button";
import { CreateBlogInput} from "@devv00/medium-common";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(""); 
    const [blogInput, setBlogInput] = useState<CreateBlogInput>({
        title : "",
        content : "",
    })

    const fetchBlog = async ()=>{
      try {
          const response = await axios.get(`/api/v1/blog/${id}`, {
              headers : {
                  Authorization : "Bearer " + localStorage.getItem("token"),
              }
          });
          setBlogInput(response.data.post);
      } catch (error) {
          console.error(error);
      }
  }
    
    useEffect(()=>{
      fetchBlog();
    }, []);

    const editBlog = async ()=>{
      setError("")
      try {
       await axios.put("/api/v1/blog", {
        id : id,
        ...blogInput,
       }, {
        headers : {
            Authorization : "Bearer " + localStorage.getItem("token"),
        }
       })
       navigate("/blogs/user")
      } catch (error) {
        setError("Something went wrong while updating blog please try again")
      }
    }
  
    return (
      <div className="font-varela w-full p-4 md:w-4/5 xl:w-3/4 m-auto mt-16">
        <div>
          <input className="text-lg p-2 w-full bg-gray-200 rounded-lg outline-none" 
          value={blogInput.title}
          placeholder="Title" onChange={(e)=>{setBlogInput((prev)=>({...prev, title : e.target.value}))}} />
        </div>
        <div className="mt-10">
          <textarea className="min-h-80 block w-full p-3 outline-0 rounded-lg bg-gray-200 border-0"
           value={blogInput.content}
           placeholder="Write your thoughts..." onChange={(e)=>{setBlogInput((prev)=>({...prev, content : e.target.value}))}} />
        </div>
        {
          error && (
            <div className="mt-4 text-red-600 p-1 w-full text-center">{error}</div>
          )
        }
        <div className="mt-10 m-auto w-40">
          <Button onClick={editBlog}>Update</Button>
        </div>
      </div>
    )
}

export default Edit
