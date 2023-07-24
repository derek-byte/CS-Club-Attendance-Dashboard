import connect from "../../../lib/mongodb";
import { serialize } from "cookie";

connect();

export default async function handler(req, res) {
    const { cookies } = req;

    const jwt = cookies.siteJWT;

    if (!jwt) {
        return res.json({ message: "Bro you are already not logged in..." });
    } else {
        const serialised = serialize("siteJWT", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
        });

        res.setHeader("Set-Cookie", serialised);

        res.status(200).json({ message: "Successfuly logged out!" });
    }
}