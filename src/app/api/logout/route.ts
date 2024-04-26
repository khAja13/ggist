import { deleteSession } from "@/util/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
                message: "Logout successful",
                success: true,
        });

        deleteSession();
        redirect('/auth/signin')
        // return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
