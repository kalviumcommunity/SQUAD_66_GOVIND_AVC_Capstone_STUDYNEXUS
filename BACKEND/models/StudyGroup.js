const mongoose=require('mongoose')

const studyGroupSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    course:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true,
    },
    studygoal:{
        type:String,
        enum:['Exam Prep','Project','Research','Usual Prep','Urgent Req']
    },
    knowledgelevel:{
        type:String,
        enum:['New to the topic','Medium-level understanding','High in-depth understanding'],
        required:true
    },
    studymode:{
        type:String,
        enum:['Online','Offline'],
        required:true
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    duration:{
        type:String
    },
    location:{
        type:String
    },
    maxSize:{
        type:Number,
        default:4
    },
    additionalInfo:{
        type:String
    },
    aiquestion:{
        type:String
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    language:{
        type:String
    },
    status:{
        type:String
    },
    members:{
        type:String
    }

})
const StudyGroup=mongoose.model("StudyGroup",studyGroupSchema)
module.exports=StudyGroup
