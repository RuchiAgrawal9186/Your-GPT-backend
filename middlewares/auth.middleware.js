const jwt = require("jsonwebtoken");
const { logoutModel } = require("../models/logout.model");
require("dotenv").config()


const auth = async(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    const blacklist = await logoutModel.findOne({ token });
    if(token){
        if(blacklist){
           res.status(201).json({msg: "Please Login again"})
           return
        }else{
            try{
                jwt.verify(token, process.env.secrete, (err, decoded)=>{
                    if(decoded){
                        req.body.userID= decoded.userID;
                        req.body.user=decoded.user
                        next()
                    }else{
                        res.status(201).json({msg:"Not authorize user"})
                    }
                })
        
               }catch(err){
        res.json({msg: err.message})
               } 
        }
       
    }else{
        res.status(500).json({msg:"Please Login"})
    }
  }
  
  module.exports={
      auth
  }