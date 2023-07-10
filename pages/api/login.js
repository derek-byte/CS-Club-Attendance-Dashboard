import connect from "../../lib/mongodb";
import User from '../../model/schema'

connect()

export default async function handler(req,res){

    const {email,password}=req.body
    const user = await User.findOne({email,password})
    console.log("USER", user)
    if(!user){
        return res.json({status:'Not able to find the user'})
    }
    else{
        console.log("HI")
        res.redirect('/home', user)
    }
}