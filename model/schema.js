import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    attendance: {
        type:Number,
        required: false
    }
});

module.exports = mongoose.models.User || mongoose.model('User',userSchema);