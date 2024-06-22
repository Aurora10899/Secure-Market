import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("session")?.value || "";
    const isLoggedIN = await getDataFromToken(token);

    if (isLoggedIN != undefined) {
      return NextResponse.json({ isLogged: isLoggedIN });
    } else {
      const response = NextResponse.json({ isLogged: isLoggedIN });
      response.cookies.delete("session");
      return response;
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
