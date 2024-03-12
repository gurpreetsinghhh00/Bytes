import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@devv00/medium-common";

const userRouter = new Hono<{
    Bindings : {
      DATABASE_URL: string,
      JWT_SECRET : string,
    }
  }>();

userRouter.post("/signup", async (c)=>{
    const body = await c.req.json();
    const validate = signupInput.safeParse(body);
    if(!validate.success){
        c.status(411)
        return c.json(validate.error)
    }
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const existingUser = await prisma.user.findUnique({
            where : {
                email : body.email,
            }
        })

        if(existingUser){
            c.status(400)
            return c.json({
                message : "User already exists"
             })
        }
        const user = await prisma.user.create({
            data:{
                name : body.name,
                email : body.email,
                password : body.password,
            },
            select : {
                id : true,
                email : true,
                name : true,
            }
        })
    
        const token = await sign({
            id : user.id,
            email : user.email,
        }, c.env.JWT_SECRET);
        
        c.status(200)
        return c.json({jwt : token})
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({
            message : "Error while signing up"
        })
    }
})

userRouter.post("/signin", async (c)=>{
    const body = await c.req.json();
    const validate = signinInput.safeParse(body);
    if(!validate.success){
        c.status(411)
        return c.json(validate.error)
    }

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findUnique({
            where : {
                email : body.email,
                password : body.password
            }
        });
    
        if(!user){
            c.status(401);
            return c.json({
                message : "User does not exists"
            })
        }
    
        const token = await sign({id : user.id, email : user.email}, c.env.JWT_SECRET); 
        c.status(200);
        return c.json({
            jwt : token
        })
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({
            message : "Error while signin"
        })
    }
})

userRouter.get("/current", async (c)=>{
    const header = c.req.header("Authorization") || "";
    try {
        if(header === ""){
            c.status(401);
            return c.json({
                message : "Provide a valid token"
            })
        }
        const token = header?.split(" ")[1];
        const decodedToken = await verify(token, c.env.JWT_SECRET);
        if(!decodedToken){
            c.status(401);
            return c.json({
                message : "Unauthorized request"
            });
        }
        c.status(200);
        return c.json({
            id : decodedToken.id,
        })
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({
            message : "Not logged in or invalid token"
        })
    }
})

export default userRouter;