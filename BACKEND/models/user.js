const mongoose=require('mongoose')
const { hashpassword } = require('../utils/hashpassword')


const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    accomodation:{
        type:String,
        required:true,
        enum:["Hostel","Day Scholar"]
    },
    hostelDetails:{
        type:String,
        required:function (){
            return this.accomodationType==="Hostel"
        }
    },
    course:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},
    {timestamps:true}
)

userschema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    try{
        this.password=await hashpassword(this.password)
        next()
    }
    catch(error){
        next(error)
    }
});

module.exports =mongoose.model("User",userschema)