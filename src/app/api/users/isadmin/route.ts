import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { accAddress } = reqBody;

        const user = await User.findOne({ walletaddress: accAddress});
        if(user.isAdmin){
            return NextResponse.json({ message: "User is Admin", success: true });
        } else {        
            return NextResponse.json({message: "User is not Admin", success: true});
        }
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}