const mongoose = require('mongoose');

const adminSchema= new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:4,
        max:20,
    },
    email:{
        type: String,
        required: true,
        unique:true,
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
    }
});
module.exports=mongoose.model("User", adminSchema);