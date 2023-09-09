const express = require("express")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

// import routes
const {userRouter} = require("./routes/user.routes")
const {apiRouter}=require("./routes/openai.routes")

// import db connection
const {connection} =require("./db")

// import models
const {logoutModel} = require("./models/logout.model")


app.use("/users",userRouter)
app.use("/openai",apiRouter)



app.get('/logout', async(req, res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
      try{
        const user = logoutModel({token})
        await user.save()
        if(user){
          res.status(200).json({msg:"User has been logged out"})
        }
      }catch(error){
        res.send({error:error.message})
      }
    }
  })


app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log(`server run on ${process.env.port}`)
        
    } catch (error) {
        console.log("something went wrong")
    }
    
})