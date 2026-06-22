import { User } from "../models/userModel.js"
import jwt from 'jsonwebtoken'



export const googleAuth = async (req, res) => {
  try {
    const {name, email, avatar} = req.body
    let user = await User.findOne({email})
    if(!user){
      user = await User.create({name, email, avatar})
    }
     //jwt
    const token = jwt.sign({id:user._id}, process.env.SECRET_KEY, {expiresIn:"7d"})
    //cookie generate
    res.cookie("token", token,
      {httpOnly:true, secure: true, sameSite: "none", maxAge: 7*24*60*60*1000}
    )
    return res.status(200).json(user)

  } catch (error) {
  console.error("Google Auth Error:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack
  });
}
  
}



export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json("message:user logout successfully")
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
  
}
