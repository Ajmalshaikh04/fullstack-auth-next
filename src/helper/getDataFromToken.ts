import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = (req: NextRequest) => {
  try {
    const encodedCookieTooken = req.cookies.get("token")?.value || "";
    const decodedCookieToken: any = jwt.verify(
      encodedCookieTooken,
      process.env.JWT_TOKEN_SECRET!
    );
        //after decoding token with jwt secret we will get user object
    return decodedCookieToken.id;
  } catch (error: any) {
    throw new Error(error.message)
  }
};
