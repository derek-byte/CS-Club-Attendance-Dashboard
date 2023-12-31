import connect from "../../lib/mongodb";
import User from '../../model/schema';

connect();

export default async function handler(req,res){
  try {
    const { email, password } = req.body;
    // Check if user already exists
    const checkUser = await User.findOne({ email: email });
    const admin = await User.findOne({ email: "sheed9333@wrdsb.ca" });

    if (checkUser)
      return res.status(500).json({
        message: "User already exists! Try logging in. 😄",
        type: "warning",
      });

    const user = await User.create({...req.body, role: "student", attendance: 0, attendanceCode: admin.attendanceCode});
    res.status(200).json({
      message: "User created successfully! 🥳",
      type: "success",
    });
    if(!user){
      return res.json({"code":'User not created'})
    }
  } catch (error) {
    res.status(400).json({status:'Not able to create a new user.', error: error})
  }
}