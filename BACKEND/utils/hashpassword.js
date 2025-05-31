const bcrypt = require('bcrypt')

const hashpassword =async(password)=>{
    try{
    const hashedpassword =await bcrypt.hash(password,10)
    return hashedpassword   
    }
    catch(err){
        throw new Error("error while hashing password",err)
    }
}

const comparePassword =async(enteredPassword,storedPassword)=>{
    try{
        return await bcrypt.compare(enteredPassword,storedPassword)
    }catch(error){
        throw new Error("Error whhile comparing password",error)
    }
}

module.exports={hashpassword,comparePassword}