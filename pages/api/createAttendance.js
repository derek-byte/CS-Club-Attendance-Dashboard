import connect from "../../lib/mongodb";
import User from '../../model/schema';

import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET || "";
connect();

export default async function handler(req,res) {
    try {
        const { attendanceCode } = req.body;
        const { cookies } = req;
        const jwt = cookies.siteJWT;

        const user = await verify(jwt, secret);

        if (user.role === "admin") {
            const filter = {};
            const updateDoc = {attendanceCode: attendanceCode, prevAttendanceCode: user.prevAttendanceCode};
            console.log(updateDoc)

            const result = await User.updateMany(filter, updateDoc);
            console.log(`Updated ${result.modifiedCount} documents`);

            if(result){
                return res.status(200).json({ status: 200, message: "Success!" });
            }
        }
        return res.status(400).json({status:'You are not an admin'});
    } catch (error) {
        return res.status(400).json({status:'Not able to create attendance code'});
    }
}