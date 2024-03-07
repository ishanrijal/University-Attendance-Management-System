const User =require('../models/adminSchema');

module.exports.register= async(req,res,next)=>{
  try{
    const {role,firstName,lastName,regNumber,email,password}=req.body;
    const regNumberCheck = await User.findOne({regNumber});
    if( regNumberCheck ) {
     return res
            .status(400)
            .json({msg:"User Already Exit"});
    }
    const userInfo= await User.create({role,firstName,lastName,regNumber,email,password});
    // If the user is successfully created, send a success message
    return res
            .status(200)
            .json({ msg: "User created successfully", userInfo });
  }catch(error){
    console.log("In the error")
    console.log(error)
    return res
           .status(500)
           .json({ error: "Internal Server Error" });
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
