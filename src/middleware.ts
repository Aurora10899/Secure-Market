import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("session")?.value || "";
  let ty;

  const isPublicPath = path === "/login" || path === "/signup" || path === "/";
  const isAdmin = await getDataFromToken(token);

  if (!isPublicPath && isAdmin == undefined) {
    const response = NextResponse.redirect(new URL("/login", request.nextUrl));
    response.cookies.delete("session");
    return response;
  }

  if (isPublicPath && token && isAdmin != process.env.ADMIN_ADDRESS) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (path === "/admin" && token && isAdmin != process.env.ADMIN_ADDRESS) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  if (isPublicPath && token && isAdmin == process.env.ADMIN_ADDRESS) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }

  if (path === "/dashboard" && token && isAdmin == process.env.ADMIN_ADDRESS) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl));
  }
  
  if (!isPublicPath && !token ) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard", "/login", "/signup", "/admin"],
};
