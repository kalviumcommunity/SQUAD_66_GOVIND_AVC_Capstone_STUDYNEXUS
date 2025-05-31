// const mongoose=require('mongoose')
const user=require('../models/user')
const jwt =require('jsonwebtoken')


const protectRoute=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];

        if(!token){
            res.status(404).json({message:"Authorization Revoked Token not FOUND"})
        }

        const decoded = jwt.verify(token,process.env.SECRET_KEY)
        req.user=await user.findById(decoded.id).select("-password")
        next();
    }catch(err){
        return res.status(500).json({message:"ERROR FOUND AUTHORIZING",err})
    }
}

module.exports=protectRoute;