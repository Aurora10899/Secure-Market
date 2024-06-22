import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const contractAddress = process.env.CONTRACT_ADDRESS;
        return NextResponse.json({contractAddress});
    } catch (error) {
        
    }
}