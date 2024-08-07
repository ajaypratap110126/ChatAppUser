import createTokenAndSaveCookies from "../jwt/generateToken.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signup =async (req, res) =>{
    const {fullname, email, password, confirm_password} = req.body;
    try {
        if(password !== confirm_password){
            return res.status(400).json({error: "Password do not match!"});
        }
        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({error: "User already registered with this email id!"});
        }
        const hashPassword = await bcryptjs.hash(password,10);
        const newUser =await new User({
            fullname,
            email,
            password: hashPassword,
        });
        await newUser.save();
        if(newUser){
            createTokenAndSaveCookies(newUser._id, res);
            return res.status(201).json({message: "User created Successfully!",
                user:{
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                },
             });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error in Signup Page!"});
    }
};

export default signup;


export const login = async(req, res) =>{
    const {email, password} =req.body;
    try {
        const user =await User.findOne({email});
        const isMatch =await bcryptjs.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(400).json({error: "Invalid User Credential" });
        }
        createTokenAndSaveCookies(user._id, res);
        res.status(200).json({message: "User Login Successfully!",user:{
            _id: user._id,
            fullname: user.fullname,
            email:user.email
        }})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error in Login Page!"});
    }
}

export const logout = async(req, res) =>{
    try {
        res.clearCookie("jwt");
        res.status(200).json({message: "User Logout Successfully!" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error in Login Page!"});
    }
}

export const allUsers = async(req, res) =>{
    try {
        const loggedInUser = req.user._id;
        const filterUsers = await User.find({
            _id: {$ne: loggedInUser },
        }).select("-password");
        res.status(201).json(filterUsers);
    } catch (error) {
        console.log("Error in allUsers Controller:"+ error);
    }
}



