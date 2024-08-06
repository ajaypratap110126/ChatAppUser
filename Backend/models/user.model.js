import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirm_password:{
        type: String
    }
},{timestamps: true})    //timestamps:=> createdAt & UpdatedAt

const User = mongoose.model("User",userSchema)

export default User;