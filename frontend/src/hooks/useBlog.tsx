import { useEffect, useState } from "react";
import axios from "axios";
import { BlogType } from "./useBlogs";
import { DATABASE_URL } from "../utils/config";

const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState<boolean>();
    const [blog, setBlog] = useState<BlogType>();

    const fetchBlog = async ()=>{
        setLoading(true)
        try {
            const response = await axios.get(`${DATABASE_URL}/api/v1/blog/${id}`, {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token"),
                }
            });
            setBlog(response.data.post);
            setLoading(false);
        } catch (error : any) {
            console.error(error?.response?.data?.message);
        }
    }
    
    useEffect(()=>{
        fetchBlog();
    }, []);

    return {loading, blog};
}

export default useBlog;
