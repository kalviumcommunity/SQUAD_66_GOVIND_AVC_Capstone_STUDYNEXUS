
const express=require('express')
const path=require('path')
const fs=require('fs')
const mongoose=require('mongoose')
const connectdb=require('./config/db')
const authRoutes=require('./routes/authRoutes')
const cors=require('cors')
const studyGroupRoutes=require('./routes/studyGroupRoutes')

require('dotenv').config()
const app=express()
const PORT=process.env.PORT || 4500
const uploadsDir=path.join(__dirname,'uploads')

if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir,{recursive:true})
}

const corsOptions={
    origin:['http://localhost:5173','http://127.0.0.1:5173','http://localhost:3000','https://squad-66-govind-avc-capstone-studynexus.vercel.app'],
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
    credentials:true
}

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:true,limit:'10mb'}))
app.use(cors(corsOptions))
app.options(/(.*)/, cors(corsOptions))
connectdb()

app.get('/',async (req,res)=>{
    await res.send("hello study nexus loading")
})


app.use('/uploads', express.static(uploadsDir))
app.use('/api/auth',authRoutes)

app.use('/api/studygroup',studyGroupRoutes)


app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})
