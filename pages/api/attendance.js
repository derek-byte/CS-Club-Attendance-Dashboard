import connect from "../../lib/mongodb";
import User from '../../model/schema';

import { verify } from 'jsonwebtoken';

const secret = process.env.SECRET || "";
connect();

export default async function handler(req,res) {
    try {
        const { cookies } = req;
        const jwt = cookies.siteJWT;

        const user = await verify(jwt, secret);

        const conditions = {email: user.email};
        const update = {attendance: user.attendance + 1};

        const result = await User.findOneAndUpdate(conditions, update);

        if(result){
            return res.status(200).json({ status: 200, message: "Success!" });
        }
    } catch (error) {
        return res.status(400).json({status:'Not able to update attendance'});
    }
}