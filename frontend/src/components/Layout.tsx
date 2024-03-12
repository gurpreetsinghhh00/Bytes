import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUser = async ()=>{
    setLoading(true);
    try {
      await axios.get("/api/v1/user/current", 
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token"),
        }
       }
      )
      navigate("/blogs");
      setLoading(false);
    } catch (error : any) {
      navigate("/signin")
      console.error(error?.response?.data?.message);
    }
  }

  useEffect(()=>{
    currentUser();
  }, []);

  return loading ? <Loading/> :
  (
    <div className='font-varela'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout;
