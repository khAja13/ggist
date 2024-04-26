import { z } from "zod"

export const signUpSchema = z.object({
    username: z.string().min(3, { message: "Minimum 3 characters needed" }),
    email: z
        .string()
        .min(1, { message: "Email can't be empty"})
        .email("Please enter a valid email"),
    password: z.string().min(6, { message: "Minimum 6 characters needed"})
})

export const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email can't be empty"})
        .email("Please enter a valid email"),
    password: z.string().min(1, { message: "Password can't be empty"})
})

export const gistSchema = z.object({
    gistDescription: z.string(),
    gistContet: z.string().min(1, { message: "Gist can't be empty"})
})