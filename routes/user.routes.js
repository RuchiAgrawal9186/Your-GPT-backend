const express = require("express")
require("dotenv").config()
const userRouter = express.Router()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const {UserModel} = require("../models/user.model")

userRouter.post("/register",async(req,res)=>{
    // 1) get data from body
       const {username,email,password} = req.body
       try
       {
   
           let finduser = await UserModel.findOne({email})
   
           if(finduser)
           {
               res.status(201).json({mesg:"User already exist, please login"})
           }
   
           else
           {
                   bcrypt.hash(password,10,async(err,hash)=>{

                       if(err)
                       {
                         res.json({err:err.message})
                       }
                       else
                       {
                               const user = new UserModel({username,email,password:hash})
                               await user.save()
                               res.status(200).json({mesg:"Registration Successfully" , user:req.body})   
                        
                       }
                 
                    })
   
            } 
             
         } catch (error) {
             res.status(500).json({error:error.message})
         }
   })
   
   userRouter.post("/login",async(req,res)=>{
   
       // 1) get email, pass from req.body
       const {email,password} = req.body
   
       try {
   
           let user = await UserModel.findOne({email}).maxTimeMS(30000);
   
           if(user)
           {
               bcrypt.compare(password,user.password,(err,result)=>{
                   if(result)
                   {
                       let token = jwt.sign({id:user._id,user:user.email},process.env.secrete)
   
                       res.status(200).json({mesg:"Login Successfull", token:token,user:user})
                   }
                   else
                   {
                       res.status(201).json({mesg:"Wrong Crediantials"})
                   }
               })
           }
           else
           {
               res.status(201).json({mesg:"User does not exists"})
           }  
           
       } catch (error) {
           
          res.json({error:error.message})
       }
   
   })

  

module.exports = {
    userRouter
}