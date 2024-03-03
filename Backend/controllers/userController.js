const User =require('../models/adminSchema');

module.exports.register= async(req,res,next)=>{
  try{
    const {username, email, password, role}=req.body;
    
    const userNameCheck=await User.findOne({username});
    //Check whether username already exit or not
    if(userNameCheck) res.json({msg:"Username already Exit"});

    const emailCheck=await User.findOne({email});
    //check whether email already exist or not
    if(emailCheck) res.json({msg:"Email already exist."});

    const userInfo= await User.create({username,email,password});
    //Removing the password form the userInfo before sending the response
    delete userInfo.password;
    return res.json({userInfo});

  }catch(err){
    console.log(err)
  }
};


// exports.adminLogin = async (req,res)=>{
//   res.send("You are in the Admin Login Route...");
// }


// const User = require("../models/User");

// exports.userLogin = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username, password });

//     if (!user) {
//       return res.status(401).json({ message: "Invalid Credentials" });
//     }
//     //Token Generation Here

//     res.status(200).json({ message: "Login Seccessful", user });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
