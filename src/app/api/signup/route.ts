import { db } from "@/db";
import bcryptjs from "bcryptjs";
import { signUpSchema } from "@/validations";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/util/session";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const validatedData = signUpSchema.safeParse(reqBody);

        if (validatedData.success) {
            const { username, email, password } = validatedData.data;
    
            const userExists = await db.user.findUnique({
                where: {
                    email: email,
                }
            })
    
            if(userExists) {
                return NextResponse.json({error: "Email is already taken"}, {status: 401})
            } else {
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);

                const newUser = await db.user.create({
                    data: {
                        name: username,
                        email: email,
                        password: hashedPassword,
                        provider: "EMAIL"
                    },
                });

                await createSession(newUser.id);
                
                return NextResponse.json({
                    message: "User created successfully",
                    success: true,
                    newUser
                }, {status: 201})
            }
        } else {
            return NextResponse.json({error: "Invalid Inputs"}, {status: 401})
        }
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}