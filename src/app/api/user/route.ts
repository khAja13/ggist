import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import exclude from "@/util/prisma-omit";
import { verifySession } from "@/util/session";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await verifySession();

    const userExists = await db.user.findUnique({
      where: {
        id: String(userId?.userId),
        name: String(reqBody.userId),
      },
      include: {
        gists: true,
      },
    });

    if (userExists) {
      const user = exclude(userExists, ["password"]);
      return NextResponse.json(
        {
          message: "User",
          success: true,
          user,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
