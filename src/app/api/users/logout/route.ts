import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({
      success: true,
      message: "Log Out Successful",
    });

    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return res;
  } catch (error: any) {
    return NextResponse.json({
      error,
    });
  }
}
