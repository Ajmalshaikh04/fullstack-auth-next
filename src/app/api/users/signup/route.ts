// import { connect } from "@/DBConfig/dbConfig";
// import User from "@/models/user";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { sendEmail } from "@/helper/mailer";

// connect();

// export async function POST(req: NextRequest) {
//   try {
//     const { username, email, password } = await req.json();
//     console.log({ username, email, password });

//     // Validate username, email, and password
//     if (!username || !email || !password) {
//       return NextResponse.json({
//         error: "Please provide username, email, and password",
//         status: 400,
//       });
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return NextResponse.json({
//         error: "Invalid email format",
//         status: 400,
//       });
//     }

//     // Check if user with the same email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json({
//         error: "User with the same email already exists",
//         status: 400,
//       });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = await new User({
//       username,
//       email,
//       password: hashedPassword,
//     }).save();
//     console.log(newUser);

//     // Send verification email
//     await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

//     return NextResponse.json({
//       message: "User created successfully",
//       success: true,
//       newUser,
//     });
//   } catch (error: any) {
//     return NextResponse.json({
//       error: error.message,
//       status: 500,
//     });
//   }
// }

//==========================================================================================================================================
// [signup.ts]

import { connect } from "@/DBConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, googleEmail } = await req.json();
    console.log({ username, email, password, googleEmail });

    // Check if the user is signing in with Google
    if (googleEmail) {
      // Check if a user with the same Google email already exists
      const existingUser = await User.findOne({ email: googleEmail });
      if (existingUser) {
        return NextResponse.json({
          error: "User with the same Google email already exists",
          status: 400,
        });
      }

      // Create the new user with the Google email
      const newUser = await new User({
        username,
        email: googleEmail, // Use the Google email as the registered email
        isVerified: true, // Google email is already verified
      }).save();
      console.log(newUser);

      // You can send a verification email here as well, but since it's Google, it's already verified.

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        newUser,
      });
    }

    // If the user is not signing in with Google, continue with regular signup logic

    // Validate username, email, and password
    if (!username || !email || !password) {
      return NextResponse.json({
        error: "Please provide username, email, and password",
        status: 400,
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        error: "Invalid email format",
        status: 400,
      });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "User with the same email already exists",
        status: 400,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save the new user
    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();
    console.log(newUser);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
