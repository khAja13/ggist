"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "@/db";
import { cache } from "react";
import exclude from "./prisma-omit";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
  return null;
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expiresAt = new Date(payload.expiresAt as string);
  const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000);

  if (expiresAt < oneDayFromNow) {
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const newSession = await encrypt({ userId: payload.userId, expiresAt: newExpiresAt });
    
    cookies().set("session", newSession, {
      httpOnly: true,
      secure: true,
      expires: newExpiresAt,
      sameSite: "lax",
      path: "/",
    });
  }

  return payload;
}

export async function deleteSession() {
  cookies().delete("session");
}

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  return { isAuth: true, userId: session.userId };
};

export const getUser = async () => {
  const session = await verifySession();

  if (!session) return null;

  try {
    const data = exclude(
      await db.user.findFirst({
        where: {
          id: session.userId,
        },
        include: {
          gists: true,
        },
      }),
      ["password"]
    );

    updateSession().catch(console.error);
    return data;
  } catch (error) {
    console.log("Failed to fetch user ", error);
    return null;
  }
};
