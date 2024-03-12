import axios from "axios";
import { useEffect, useState } from "react";
import { DATABASE_URL} from "../utils/config";

export interface BlogType {
    id : string,
    title : string,
    content : string,
    createdAt : string,
    author : {
        name : string,
    }
}

const useBlogs = (url : string)=>{
    const [loading, setLoading] = useState<boolean>();
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    const fetchBlogs = async ()=>{
        setLoading(true)
        try {
            const response = await axios.get(`${DATABASE_URL}/api/v1/blog${url}`, {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token"),
                }
            });
            setBlogs(response.data.posts);
            setLoading(false);
        } catch (error : any) {
            console.error(error?.response?.data?.message);
        }
    }
    
    useEffect(()=>{
        fetchBlogs();
    }, []);

    return {loading, blogs};
}

export default useBlogs;