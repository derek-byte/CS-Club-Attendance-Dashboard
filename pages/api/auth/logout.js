import connect from "../../../lib/mongodb";
import User from '../../../model/schema';
import { serialize } from "cookie";

connect()

export default async function handler(req, res){
    const {email,password}=req.body
    console.log(email, password)
    const user = await User.findOne({email, password})

    const { cookies } = req;

    const jwt = cookies.OursiteJWT;

    if (!jwt) {
        return res.json({ message: "Bro you are already not logged in..." });
    } else {
        const serialised = serialize("OursiteJWT", null, {
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