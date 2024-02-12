const Admin =require('../models/adminSchema');

exports.adminLogin = async (req,res)=>{
  res.send("You are in the Admin Login Route...");
}





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
