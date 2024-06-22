import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { accAddress } = reqBody;
        const user = await User.updateOne({ walletaddress: accAddress }, { $set: { isVerifiedSeller: false, isSeller: false } });        
        return NextResponse.json({ message: "User is removed as a seller", success: true });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}