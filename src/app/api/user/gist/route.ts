import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import exclude from "@/util/prisma-omit";
import { verifySession } from "@/util/session";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = await verifySession();

    let whereClause = {
      // @ts-ignore
      name: String(reqBody.username),
    };

    const gist = await db.user.findUnique({
      // @ts-ignore
      where: whereClause,
      include: {
        gists: {
          where: {
            // @ts-ignore
            id: String(reqBody.gistId),
          },
        },
      },
    });

    if (gist) {
      let newGist;

      if (userId) {
        newGist = exclude(gist, ["password"]);
      } else {
        newGist = exclude(gist, [
          "id",
          "createdAt",
          "email",
          "name",
          "password",
          "picture",
          "provider",
        ]);
      }
      return NextResponse.json(
        {
          message: "Gist found",
          success: true,
          newGist,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "Invalid gist" }, { status: 401 });
    }
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
