import { sign } from "jsonwebtoken";
import { serialize } from "cookie";

import connect from "../../../lib/mongodb";
import User from '../../../model/schema';

const secret = process.env.SECRET || "";
connect();

export default async function handler(req,res) {
    const {email, password} = req.body
    const user = await User.findOne({email, password})
    console.log("ATTENDANCE", user)
    if (user) {
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
          email: email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          attendance: user.attendance,
          prevAttendanceCode: user.prevAttendanceCode,
          currAttendanceCode: user.role === "admin" ? user.attendanceCode : null
        },
        secret
      );
  
      const serialised = serialize("siteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
  
      res.setHeader("Set-Cookie", serialised);
      res.status(200).json({ status: 200, message: "Success!" });
    } else {
      return res.status(401).json({
        message: "Invalid Credentials",
        type: "error",
      });
    }
}