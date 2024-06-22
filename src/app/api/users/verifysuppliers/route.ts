import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(request: NextRequest) {
    try {
        const user = await User.find({ isSeller: true, isVerifiedSeller: false });
        return NextResponse.json({user});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}