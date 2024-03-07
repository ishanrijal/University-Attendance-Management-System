const mongoose = require('mongoose');

const adminSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
    lastName:{
        type:String,
        required: true,
    },
    regNumber:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        //unique:true,
    },
    password:{
        type: String,
        required: true,
        min:8,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'teacher'],
        required: true
    },
    created_at: { 
        type: Date, 
        default: Date.now   // Automatically add the current date/time
    },
});
module.exports=mongoose.model("User", adminSchema);