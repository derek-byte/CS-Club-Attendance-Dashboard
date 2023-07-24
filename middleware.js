import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';


const secret = process.env.SECRET || "";

export default async function middleware(req) {

    const { origin } = req.nextUrl
    const { cookies, url } = req;

    const jwt = cookies.get('siteJWT')?.value;

    if (url.includes("/login")) {
        if (jwt) {
            try {
                await jwtVerify(jwt, new TextEncoder().encode(secret))
                return NextResponse.redirect(`${origin}/dashboard/user`);
            } catch (e) {
                // return NextResponse.redirect(`${origin}/login`);
            }
        }
    }

    if (url.includes("/dashboard")) {
        if (jwt === undefined) {
            return NextResponse.redirect(`${origin}/login`);
        }

        try {
            await jwtVerify(jwt, new TextEncoder().encode(secret))
            return NextResponse.next();
        } catch (e) {
            return NextResponse.redirect(`${origin}/login`);
        }
    }

    return NextResponse.next();
}