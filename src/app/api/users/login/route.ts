import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bycryptjs from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';
import { SignJWT } from "jose";
import { ethers } from 'ethers';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { accAddress, password, signedMessage, nonce } = reqBody;

        const user = await User.findOne({ walletaddress: accAddress});

        if (!user) {
            return NextResponse.json({ error: "Account is not Registered" }, { status: 400 });
        }

        const isValid = await bycryptjs.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
        }

        const certify = ethers.verifyMessage(nonce, signedMessage);

        if(accAddress !== certify){
            return NextResponse.json({ error: "Not a Signed Address" }, { status: 400 });
        }

        const tokenData = {
            accAddress: user.walletaddress,
            id: user._id,
            signedMessage
        }

        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(secretKey);

        const response = NextResponse.json({ message: "Login Successful", success: true });

        

        response.cookies.set("session", token, {httpOnly: true});

        return response;


    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}