import { connect } from "@/DBConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { log } from "console";
import jwt from "jsonwebtoken";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log({ email, password });

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User Does not exist",
        },
        {
          status: 400,
        }
      );
    }

    //check if password is correct
    const validPasssword = await bcrypt.compare(password, user.password); // compare(req.body,comming from db)
    if (!validPasssword) {
      return NextResponse.json(
        {
          error: "Invalid Password",
        },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token jwt
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
