import jwt from "jsonwebtoken";

const createTokenAndSaveCookies = (userId,res) =>{
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn:"15d"
    });
    console.log("Token?",token);
    res.cookie("jwt", token,{
        httpOnly: true,  //xss
        secure: true,
        samesite:"strict"     //csrf
    })
}

export default createTokenAndSaveCookies;