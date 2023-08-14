import connect from "../../../lib/mongodb";
import User from '../../../model/schema';

import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET || "";
connect();

export default async function handler(req,res) {
    try {
        const { cookies } = req;
        const { inputtedCode, email } = req.body;
        const jwt = cookies.siteJWT;

        const token = await verify(jwt, secret);
        const user = await User.findOne({ email: email });
        
        if (token && inputtedCode === user.attendanceCode && user.attendanceCode !== user.prevAttendanceCode) {
            const conditions = {email: user.email};
            const update = {attendance: user.attendance + 1, prevAttendanceCode: user.attendanceCode};

            const result = await User.findOneAndUpdate(conditions, update);

            if (result) {
                return res.status(200).json({ status: 200, message: "Success!" });
            }
        } else {
            return res.status(200).json({ status: 200, message: "Wrong code buddy" });
        }
    } catch (error) {
        return res.status(400).json({status:'Not able to update attendance'});
    }
}