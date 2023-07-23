import { connect } from "@/DBConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User with that email does not exist" },
        { status: 400 }
      );
    }

    const token = await sendEmail({
      email,
      emailType: "RESETPASSWORD",
      userId: user._id,
    });

    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpire = Date.now() + 3600000; // Adding one hour in milliseconds
    await user.save();

    return NextResponse.json({
      message: "Password reset email sent",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
