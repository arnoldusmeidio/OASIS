import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
   const token = request.cookies.get("token")?.value;

   if (!token) return NextResponse.redirect(new URL("/login", request.nextUrl));

   const userData = await verifyToken(token);
   const pathName = request.nextUrl.pathname;

   if (pathName.includes("/my-bookings")) {
      if (userData.role !== "customer") return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
   }

   if (pathName.includes("/my-properties")) {
      if (userData.role !== "tenant") return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/my-bookings:path*", "/my-properties/:path*"],
};
