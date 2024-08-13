'use server'
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let accessToken = request.cookies.get('access-token')
    const API_URL = process.env.API_URL
    if (!accessToken) {
        request.cookies.delete('access-token')
        if (request.nextUrl.pathname == ('/')) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
    matcher: ["/:path*"],
}   