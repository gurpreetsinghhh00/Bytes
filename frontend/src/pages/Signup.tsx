import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "@devv00/medium-common"
import Input from "../components/Input"
import Quote from "../components/Quote"
import Button from "../components/Button"
import axios from "axios"
import { validate } from "../utils/helper"
import Spinner from "../components/Spinner"

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState<SignupInput>({
    email: "",
    password: "",
    name:"",
})

  async function sendRequest() {
    setError("");
    setLoading(false);
    const message = validate(userInput.email, userInput.password);
    if(message)
      return setError(message);
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/user/signup", {
        ...userInput
      });
      const token = response.data;
      localStorage.setItem("token", token.jwt);
      navigate("/blogs")
      setLoading(false)
    } catch (error : any) {
      setError(error.response?.data?.message);
    }

  }

  return (
    <div className="w-full font-varela grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col justify-center items-center min-h-screen h-full sm:p-2 md:p-8 font-varela">
        <div className="font-bold text-3xl">
        Create an account
        </div>
        <div className="text-slate-400 text-sm">
            Already have an account? &nbsp;
            <Link to={"/signin"} className="underline">Login</Link>
        </div>
        <form className="pt-4 w-4/5 md:w-3/4 sm:p-2 md:p-4" onSubmit={(e)=>e.preventDefault()}>
      
            <Input title="Name" placeholder="Enter your name" onChange={(e)=>{setUserInput((prev)=>({...prev,name: e.target.value} )) }}/>
            <Input title="Email" placeholder="Enter your email" onChange={(e)=>{setUserInput((prev)=>({...prev, email: e.target.value}))}}/>
            <Input title="Password" placeholder="Enter your password" type="password" onChange={(e)=>{setUserInput((prev)=>({...prev, password: e.target.value}))}}/>
            {
              error && (
                <div className="text-red-600 p-1 w-full text-center">{error}</div>
              )
            }
            <div className="mt-2">
              <Button type="submit" onClick={sendRequest}>{loading? <Spinner/> : "Signup"}</Button>
            </div>
        </form>
    </div>
      <Quote/>
    </div>
  )
}

export default Signup
