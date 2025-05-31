const mongoose=require('mongoose')
require('dotenv').config()

const connectdb=async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("connected db successfully"))
    .catch((err)=>{
        console.log("error connecting db",err)
    })
}

module.exports=connectdb;