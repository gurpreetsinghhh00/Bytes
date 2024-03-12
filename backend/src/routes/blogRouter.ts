import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@devv00/medium-common";

const blogRouter = new Hono<{
    Bindings : {
      DATABASE_URL: string,
      JWT_SECRET : string,
    },
    Variables : {
        userId : string,
    }
  }>();

blogRouter.use("/*", async (c, next)=>{
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
        c.set('userId', decodedToken.id);
        await next();
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({
            message : "Not logged in or invalid token"
        })
    }
})

blogRouter.post("/", async (c)=>{
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid title or content"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const post = await prisma.post.create({
            data : {
                title : body.title,
                content : body.content,
                authorId : c.get("userId"),
            }
        })
        
        c.status(200)
        return c.json({
            id : post.id,
            message : "Blog created successfully"
        })
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({
            message : "Something went wrong while creating blog post"
        })
    }
})

blogRouter.put("/", async (c)=>{
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message : "Invalid title or content"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.update({
            where : {
                id : body.id,
                authorId : c.get("userId"),
            },
            data : {
                title : body.title,
                content : body.content,
            }
        })
        
        c.status(200)
        return c.json({
            id : post.id,
            message : "Blog updated successfully"
        })
    } catch (error) {
        console.error(error);
        c.status(500)
        return c.json({
            message : "Something went wrong while updating blog post"
        })
    }
})

blogRouter.get("/bulk", async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const posts = await prisma.post.findMany(
            {
                select : {
                    id : true,
                    title : true,
                    content : true,
                    createdAt : true,
                    author : {
                        select : {
                            name : true,
                        }
                    }
                }
            }
        );
        c.status(200);
        return c.json({
            posts,
        })
    } catch (error) {
        c.status(500)
        return c.json({
            message : "Error while fetching all posts"
        })
    }
})

blogRouter.get("/:id", async (c)=>{
    const id = c.req.param("id")
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    try {
        const post = await prisma.post.findUnique({
            where : {
                id,
            },
            select: {
                id : true,
                title : true,
                content : true,
                createdAt: true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        })
    
        if(!post){
            return c.json({
                message : "Invalid post id"
            })
        }
        
        c.status(200);
        return c.json({
            post,
            message : "Post fetched successfully"
        })
    } catch (error) {
        c.status(500)
        return c.json({
            message : "Error while fetching post"
        })
    }
})

blogRouter.get("/bulk/user", async (c)=>{
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            where : {
                authorId : authorId,
            },
            select : {
                id : true,
                title : true,
                content : true,
                createdAt : true,
                author : {
                    select : {
                        name : true,
                    }
                }
            }
        });

        c.status(200);
        return c.json({
            posts,
        })
    } catch (error) {
        c.status(500)
        return c.json({
            message : "Error while fetching user posts",
        })
    }
})

blogRouter.delete("/:id", async(c)=>{
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const response = await prisma.post.delete({
            where : {
                id : id,
                authorId : c.get("userId")
            }
        })
        c.status(200)
        return c.json({
            message : "Post deleted successfully",
        })
        
    } catch (error) {
        c.status(500)
        return c.json({
            message : "Error while deleting post",
        })}
})



export default blogRouter;