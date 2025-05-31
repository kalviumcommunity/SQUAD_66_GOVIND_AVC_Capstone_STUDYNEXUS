const jwt = require('jsonwebtoken')

require('dotenv').config()


const generateToken=(user)=>{
    try{
        return jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'1d'})
    }catch(error){
        throw new Error("Error while generating token : ",error)
    }
}


module.exports=generateToken;   