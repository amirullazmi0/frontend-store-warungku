'use server'
import { NextResponse, NextRequest } from "next/server";
import { CheckAuthFunction } from "./function/auth";

export async function middleware(request: NextRequest) {
    let accessToken = request.cookies.get('access-token')
    const checkAuth = await CheckAuthFunction()

    if (!checkAuth || !accessToken) {
        request.cookies.delete('access-token')
        if (request.nextUrl.pathname == ('/')) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

}

export const config = {
    matcher: ["/:path*"],
}   