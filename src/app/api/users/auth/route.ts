import { NextResponse, NextRequest } from 'next/server';
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("session")?.value || '';
        const walletAddress = await getDataFromToken(token);
        return NextResponse.json({ walletAddress, success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}