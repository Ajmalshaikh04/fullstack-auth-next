import bcrypt from "bcryptjs";
import User from "@/models/user";
import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create a hash token for verifing user
    const hashUserId = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashUserId,
        verifyTokenExpiry: Date.now() + 3600000, //adding millisecond
      });
    } else if (emailType === "RESETPASSWORD") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashUserId,
        forgotPasswordTokenExpire: Date.now() + 3600000, //adding millisecond
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "nextauth@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD",
      html: `<p>Click on the link to ${
        emailType === "VERIFY" ? "verify" : "reset"
      } your ${
        emailType === "VERIFY" ? "email" : "password"
      }: <a href='${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashUserId}'>${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashUserId}</a> or copy-paste the link in your browser.</p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
