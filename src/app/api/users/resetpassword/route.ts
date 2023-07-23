import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/DBConfig/dbConfig";
import bcrypt from "bcryptjs";
import User from "@/models/user";

connect() 

export async function POST (req: NextRequest)  {
  try {
    const { token, password, confirmPassword } = await req.json();

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpire = undefined;

    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

