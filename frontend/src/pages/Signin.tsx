import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import Quote from "../components/Quote"
import Button from "../components/Button"
import { SigninInput } from "@devv00/medium-common"
import axios from "axios"
import { validate } from "../utils/helper"
import Spinner from "../components/Spinner"
import { DATABASE_URL } from "../utils/config"

const Signin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState<SigninInput>({
    email: "",
    password: "",
})

  async function sendRequest(){
    setLoading(false)
    setError("");
    const message = validate(userInput.email, userInput.password);
    if(message)
      return setError(message);
    setLoading(true)
    try {
      const response = await axios.post(`${DATABASE_URL}/api/v1/user/signin`, {
        ...userInput
      });
      const token = response.data;
      localStorage.setItem("token", token.jwt);
      navigate("/blogs")
      setLoading(false)
    } catch (error : any) {
      setError(error.response?.data?.message);
      setLoading(false)
    }
  }

  return (
    <div className="w-full font-varela grid grid-cols-1 md:grid-cols-2">
       <div className="flex flex-col justify-center items-center h-screen md:h-full min-h-screen sm:p-2 md:p-8 font-varela">
        <div className="font-bold text-3xl">
        Login to your account
        </div>
        <div className="text-slate-400 text-sm">
            Don't have an account? &nbsp;
            <Link to={"/signup"} className="underline">Sign up</Link>
        </div>
        <form className="pt-4 w-4/5 md:w-3/4 sm:p-2 md:p-4" onSubmit={(e)=>e.preventDefault()}>
      
            <Input title="Email" placeholder="Enter your email" onChange={(e)=>{setUserInput((prev)=>({...prev, email: e.target.value}))}}/>
            <Input title="Password" placeholder="Enter your password" type="password" onChange={(e)=>{setUserInput((prev)=>({...prev, password: e.target.value}))}}/>
            {
              error && (
                  <div className="text-red-600 p-1 w-full text-center">{error}</div>
              )
            }
            <div className="mt-2">
              <Button type="submit" onClick={sendRequest}>{loading ? <Spinner/> : "Login" }</Button>
            </div>
        </form>
    </div>
      <Quote/>
    </div>
  )
}

export default Signin;
