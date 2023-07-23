import { getDataFromToken } from "@/helper/getDataFromToken";
import  {connect}  from "@/DBConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

connect()

export async function GET(req:NextRequest){
    try {
        const userId= await getDataFromToken(req)
        const user=await User.findOne({_id:userId}).select('-password -isAdmin')
        return NextResponse.json({
            message:"User Found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },
        {
            status:400
        })
    }
}