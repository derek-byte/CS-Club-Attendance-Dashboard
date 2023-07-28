// import mongoose from "mongoose";
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
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
        required:false,
        unique:true
    },
    role: {
        type:String,
        required:false
    },
    attendance: {
        type:Number,
        required:false
    }
});

const User = models.User || model('User', userSchema);
export default User;
