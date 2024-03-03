import { z } from "zod";

export const signupInput = z.object({
    email : z.string().email({ message: "Invalid email address" }),
    password : z.string().min(6, { message: "Must be 6 or more characters long" }),
    name : z.string().optional(),
})

export type SignupInput = z.infer <typeof signupInput>

export const signinInput = z.object({
    email : z.string().email({ message: "Invalid email address" }),
    password : z.string().min(6, { message: "Must be 6 or more characters long" }),
})

export type SigninInput = z.infer <typeof signinInput>

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),
})

export type CreateBlogInput = z.infer <typeof createBlogInput>

export const updateBlogInput = z.object({
    id : z.string(),
    title : z.string(),
    content : z.string(),
})

export type UpdateBlogInput = z.infer <typeof updateBlogInput>
