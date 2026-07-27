const dns=require('dns')
const mongoose=require('mongoose')
require('dotenv').config()

// Windows/router DNS often fails on mongodb+srv SRV lookups (querySrv ECONNREFUSED)
dns.setServers(['8.8.8.8','1.1.1.1'])

const connectdb=async()=>{
    if(!process.env.MONGO_URI){
        console.error('MONGO_URI is not set. Please configure it in the Render environment.')
        return
    }

    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("connected db successfully"))
    .catch((err)=>{
        console.error("error connecting db", err)
    })
}

module.exports=connectdb;


//Connected database