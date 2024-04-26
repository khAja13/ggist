import { db } from "@/db";
import bcrypt from "bcryptjs";
import { signInSchema } from "@/validations";
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/util/session";
import exclude from "@/util/prisma-omit";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const validatedData = signInSchema.safeParse(reqBody);

        if (validatedData.success) {
            const { email, password } = validatedData.data;
    
            const userExists = await db.user.findUnique({
                where: {
                    email: email,
                },
                include: {
                    gists: true
                }
            })
    
            if(userExists) {
                const passwordMatch = await bcrypt.compare(password, userExists.password);

                if (!passwordMatch) {
                    return NextResponse.json({error: "Invalid credentials"}, {status: 404})
                }

                await createSession(userExists.id);
                const user = exclude(userExists, ['password']);
                
                return NextResponse.json({
                    message: "Valid user",
                    success: true,
                    user
                }, {status: 201})
            } else {
                return NextResponse.json({error: "Invalid credentials"}, {status: 404})
            }
        } else {
            return NextResponse.json({error: "Invalid Inputs"}, {status: 401})
        }
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}