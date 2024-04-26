import { db } from "@/db";
import { gistSchema } from "@/validations";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/util/session";
import exclude from "@/util/prisma-omit";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const validatedData = gistSchema.safeParse(reqBody);

        if (validatedData.success) {
            const { gistDescription, gistContet } = validatedData.data;
            const session = await verifySession();

            if (!session) return NextResponse.json({error: "Something went wrong"}, {status: 401});
    
            const userExists = exclude(await db.user.findUnique({
                where: {
                    id: String(session.userId),
                }
            }), ['password'])
    
            if(userExists) {
                const newGist = await db.gist.create({
                    data: {
                        title: gistDescription,
                        content: gistContet,
                        user: {
                            connect: {
                                id: String(session.userId)
                            }
                        }
                    },
                });
                
                return NextResponse.json({
                    message: "Gist created successfully",
                    success: true,
                    newGist
                }, {status: 201})
            } else {
                return NextResponse.json({error: "Invalid user"}, {status: 401})
            }
        } else {
            return NextResponse.json({error: "Invalid Inputs"}, {status: 401})
        }
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}