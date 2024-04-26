import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/util/session";
import exclude from "@/util/prisma-omit";

export async function GET(request: NextRequest){
    try {
        const session = await verifySession();
        
        if (!session) return NextResponse.json({error: "Something went wrong"}, {status: 401});

        const userExists = exclude(await db.user.findUnique({
            where: {
                id: String(session.userId),
            },
            include: {
                gists: true
            }
        }), ['password']);

        if(userExists) {
            return NextResponse.json({
                message: "User",
                success: true,
                userExists
            }, {status: 200})
        } else {
            return NextResponse.json({error: "Invalid user"}, {status: 401})
        }
    } catch(error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}