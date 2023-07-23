import { error } from "console";
import mongoose, { connection } from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDb connection error. Please make sure MongoDB is running " + error
      );
    });
  } catch (error: any) {
    console.log("Somthing went wrong!");
    console.log(error);
  }
};
