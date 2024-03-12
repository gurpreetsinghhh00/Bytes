import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Blog from "./pages/Blog"
import Publish from "./pages/Publish"
import AllBlogs from "./pages/AllBlogs"
import UserBlogs from "./pages/UserBlogs"
import Edit from "./pages/Edit"
import Error from "./components/Error"
import Layout from "./components/Layout"
import UserFullBlog from "./pages/UserFullBlog"

const appRouter = createBrowserRouter([
  {
    path : "/",
    errorElement : <Error/>,
    element : <Layout/>,
    children: [
      {
        path : "/blogs",
        element : <AllBlogs/>
    
      },{
        path: "/blog/:id",
        element: <Blog/>
      },{
        path: "/blogs/user",
        element: <UserBlogs/>
      },{
        path: "/publish",
        element: <Publish/>
      },{
        path: "/edit/:id",
        element: <Edit/>
      },{
        path : "/blog/user/:id",
        element : <UserFullBlog/>
      }
    ]
  },
  {
    path: "/signup",
    element : <Signup/>
  },{
    path : "/signin",
    element : <Signin/>
  },
])

const App = ()=>(<RouterProvider router = {appRouter}/>)

export default App