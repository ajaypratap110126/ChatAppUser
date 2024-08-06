import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "No Token, authorization denied" });
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({error: "Invalid Tokem" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error: "No user found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Wrror in SecureRoute",+Error);
    }
}

export default secureRoute;