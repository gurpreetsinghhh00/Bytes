import { Link } from "react-router-dom"
import Avatar from "./Avatar"
import Button from "./Button"

const Navbar = () => {
  return (
    <div className="w-full flex flex-row justify-between items-center h-[75px] pl-2 pr-2 sm:pl-6 sm:pr-6 font-varela bg-slate-100">
      <div>
        <Link to={"/blogs"} className="font-bold text-xl">Bytes</Link>
      </div>
      <div className="flex flex-row justify-center items-center gap-1 md:gap-3">
      <Link className="text-center" to={"/blogs"}>
          <Button  bgColor="bg-gray-700" className="text-sm px-3">All</Button>
        </Link>
        <Link className="text-center" to={"/publish"}>
          <Button bgColor="bg-gray-700" className="text-sm px-3">New</Button>
        </Link>
        <Link className="text-center" to={"/blogs/user"}>
          <Button  bgColor="bg-gray-700" className="text-sm px-3">My Blogs</Button>
        </Link>
        <Link className="text-center" to={"/signin"} onClick={()=>{
          localStorage.setItem("token", "");
        }}>
          <Button  bgColor="bg-gray-700" className="font-light text-sm px-3">Logout</Button>
        </Link>
        <div className="hidden sm:block"><Avatar name="User"/></div>
      </div>
    </div>
  )
}

export default Navbar
