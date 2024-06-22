import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("session")?.value || "";
        const isLogged = token ? true : false;
        return NextResponse.json({ isLogged, success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}