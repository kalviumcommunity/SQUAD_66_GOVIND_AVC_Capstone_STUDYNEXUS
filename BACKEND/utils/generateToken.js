const jwt = require('jsonwebtoken')

require('dotenv').config()


const generateToken=(user)=>{
    try{
        const userId = user && typeof user === 'object' && user._id ? user._id : user
        const secret = process.env.SECRET_KEY || 'studynexus-dev-secret'
        return jwt.sign({id:userId}, secret, {expiresIn:'1d'})
    }catch(error){
        throw new Error(`Error while generating token: ${error.message}`)
    }
}


module.exports=generateToken;   