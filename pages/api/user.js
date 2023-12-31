import { verify } from 'jsonwebtoken';
import User from '../../model/schema';

const secret = process.env.SECRET || "";

export default async function userAPI(req, res) {
  try {
    const { cookies } = req;
    const jwt = cookies.siteJWT;

    const token = await verify(jwt, secret);
    const user = await User.findOne({email: token.email});
    const formattedData = {
      ...user._doc,
      password: null,
      attendanceCode: user.role === "admin" ? user.attendanceCode : null,
      prevAttendanceCode: null
    };
    res.json(formattedData);
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}