import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();              

        const walletaddress = reqBody.address;

        const user = await User.findOne({ walletaddress });   

        if(!user){
            return NextResponse.json({error: "Account is not Registered"},{status: 400});
        }

        const nonce = crypto.randomBytes(32).toString("hex");

        return NextResponse.json({message: nonce, success: true});
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}