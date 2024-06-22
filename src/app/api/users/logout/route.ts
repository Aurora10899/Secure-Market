import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout Successful",
            success: true
        });
        response.cookies.delete("session");
        return response;
    } catch (error) {
        
    }
}