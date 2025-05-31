const express=require('express')
const User=require('../models/user')
const generateToken=require('../utils/generateToken')
const { comparePassword } = require('../utils/hashpassword')

const signup=async(req,res)=>{
    try{
        const {name,userid,dob,number,email,accomodation,hostelDetails,course,year,password}=req.body;

        const existinguser =await User.findOne({$or:[{email},{userid}]})
        if(existinguser){
            return res.status(400).json({message:"User already exists please login"})
        }
        const newUser=new User({name,userid,dob,number,email,accomodation,hostelDetails,course,year,password});
        await newUser.save();
        const token=generateToken(newUser._id)
        res.status(201).json({
            message:"User created successfully",
            user:{name,email,userid},
            token
        })
    }
    catch(err){
        res.status(500).json({"error creating the account":err})
    }
}


const login=async(req,res)=>{
    try{
        const {email,userid,password}=req.body
        const existinguser=await User.findOne({$or:[{email},{userid}]})
        if(!existinguser){
            return res.status(404).json({message:"User is not found please signup"})
        }
        console.log(existinguser)
        const storedPassword=existinguser.password
        const iscorrectpassword=await comparePassword(password,storedPassword)
        if (!iscorrectpassword){
            return res.status(401).json({message:"Incorrect Password"})
        }
        const token = generateToken(existinguser._id)
        res.status(200).json({success:true,message:"Login successfull",token,user:{
            name:existinguser.name,
            userid:existinguser.userid,
            email:existinguser.email
        }
        })
    }catch(err){
        res.status(500).json({message:"error logging in",err})
    }

}


















module.exports={signup,login}
