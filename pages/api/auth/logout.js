import connect from "../../lib/mongodb";
import User from '../../model/schema';

connect()

export default async function handler(req,res){
    const {email,password}=req.body
    console.log(email, password)
    const user = await User.findOne({email, password})

    
}