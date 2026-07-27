const express=require('express')
const fs=require('fs')
const path=require('path')
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

        let photoUrl=""
        if(req.file){
            const fileName=`${Date.now()}-${req.file.originalname.replace(/\s+/g,'-')}`
            const uploadPath=path.join(__dirname,'..','uploads',fileName)
            fs.writeFileSync(uploadPath, req.file.buffer)
            photoUrl=`${req.protocol}://${req.get('host')}/uploads/${fileName}`
        }

        const newUser=new User({name,userid,dob,number,email,accomodation,hostelDetails,course,year,password,photo:photoUrl});
        await newUser.save();
        const token=generateToken(newUser._id)
        res.status(201).json({
            message:"User created successfully",
            user:{name,email,userid,photo: newUser.photo || ""},
            token
        })
    }
    catch(err){
        console.error('Signup error:', err)
        res.status(500).json({message:'error creating the account', error: err.message || err})
    }
}


const login=async(req,res)=>{
    try{
        const {email,userid,password}=req.body
        const filters=[]
        if(email) filters.push({email: String(email).toLowerCase().trim()})
        if(userid) filters.push({userid: String(userid).trim()})
        if(filters.length===0){
            return res.status(400).json({message:"Email or User ID is required"})
        }
        if(!password){
            return res.status(400).json({message:"Password is required"})
        }

        const existinguser=await User.findOne({$or:filters})
        if(!existinguser){
            return res.status(404).json({message:"User is not found please signup"})
        }

        const storedPassword=existinguser.password
        const iscorrectpassword=await comparePassword(password,storedPassword)
        if (!iscorrectpassword){
            return res.status(401).json({message:"Incorrect Password"})
        }
        const token = generateToken(existinguser._id)
        res.status(200).json({success:true,message:"Login successfull",token,user:{
            name:existinguser.name,
            userid:existinguser.userid,
            email:existinguser.email,
            photo:existinguser.photo || "",
            course:existinguser.course,
            year:existinguser.year,
            accomodation:existinguser.accomodation,
            hostelDetails:existinguser.hostelDetails,
            dob:existinguser.dob,
            number:existinguser.number
        }
        })
    }catch(err){
        console.error('Login error:', err)
        res.status(500).json({message:"error logging in", error: err.message || err})
    }

}


















module.exports={signup,login}
