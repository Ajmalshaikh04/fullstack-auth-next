// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "username is required"],
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, "email is required"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   forgotPasswordToken: String,
//   forgotPasswordTokenExpire: Date,
//   verifyToken: String,
//   verifyTokenExpiry: Date,
// });

// const User = mongoose.models.users || mongoose.model("users", userSchema);
// export default User;

//===============================================================
// import mongoose, { Document, Model } from "mongoose";

// export interface IUserDocument extends Document {
//   username: string;
//   email: string;
//   password: string;
//   isVerified: boolean;
//   isAdmin: boolean;
//   forgotPasswordToken?: string;
//   forgotPasswordTokenExpire?: Date;
//   verifyToken?: string;
//   verifyTokenExpiry?: Date;
// }

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "username is required"],
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, "email is required"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Password is required"],
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   forgotPasswordToken: String,
//   forgotPasswordTokenExpire: Date,
//   verifyToken: String,
//   verifyTokenExpiry: Date,
// });

// const User: Model<IUserDocument> =
//   mongoose.models.users || mongoose.model<IUserDocument>("users", userSchema);

// export default User;

//==============================================================================================================================================
import mongoose, { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
  username: string;
  email: string;
  password?: string; // Make password field optional
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpire?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
  provider?: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: function (this: IUserDocument) {
        return this.provider === null || this.provider === undefined;
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    provider: {
      type: String, // Assuming the provider will be a string
      default: null, // You can set a default value if needed
    },
  },
  { timestamps: true } // Add timestamps to the schema if needed
);

const User: Model<IUserDocument> =
  mongoose.models.users || mongoose.model<IUserDocument>("users", userSchema);

export default User;
