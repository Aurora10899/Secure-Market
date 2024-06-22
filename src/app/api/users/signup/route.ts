import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { walletaddress, email, password, isSeller } = reqBody;

        const user = await User.findOne({ walletaddress });        

        if(user){
            return NextResponse.json({error: "User already exists"},{status: 400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            walletaddress,
            email,
            password: hashedPassword,
            isSeller
        });

        const savedUser = await newUser.save();

        return NextResponse.json({message: "User created successfully", success: true});
        
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}