const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User =require('../models/adminSchema');

// need to keep it safe
const secretKey = "a048cede314a5295d3f83f9d8b34c8e375aa7c68ae29de3ffa5908e425719bf0";

// user signup 
const register= async(req,res,next)=>{
  try{
    const {role,firstName,lastName,regNumber,email,password}=req.body;
    const regNumberCheck = await User.findOne({regNumber});
    if( regNumberCheck ) {
     return res
            .status(400)
            .json({msg:"User Already Exit"});
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const userInfo= await User.create({ role,firstName,lastName,regNumber,email, password: hash });
    // If the user is successfully created, send a success message
    return res
            .status(200)
            .json({ msg: "User created successfully" });
  }catch(error){
    return res
           .status(400)
           .json({ error: error.message });
  }
};

// user login
const login= async(req, res)=>{
  try{
    const { username, password } = req.body;
    const user = await User.findOne({username});

    if(!user) return res.status(404).json({msg: "User not found..." });

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // If credentials are valid, create token
    const token = jwt.sign({ userId: user._id }, secretKey);

    // Return token
    return res.status(200).json({ token });
  } catch(error){
    return res.status(400).json({ error: error.message });
  }
}

module.exports ={ register, login }