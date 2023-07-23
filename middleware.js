import { NextResponse } from "next/server";
import verify from "jsonwebtoken/verify";

const secret = process.env.SECRET;

export default function middleware(req) {
    console.log("MIDDLE WARE")
    const { origin } = req.nextUrl
    const { cookies } = req;
    const jwt = cookies.OursiteJWT;
    const url = req.url;

    if (url.includes("/login")) {
        if (jwt) {
            try {
                verify(jwt, secret);
                return NextResponse.redirect(`${origin}/`);
            } catch (e) {
                return NextResponse.redirect(`${origin}/login`);
            }
        }
    }

    if (url.includes("/dashboard")) {
        if (jwt === undefined) {
            return NextResponse.redirect(`${origin}/login`);
        }

        try {
            verify(jwt, secret);
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(`${origin}/login`);
        }
    }

    return NextResponse.next();
}