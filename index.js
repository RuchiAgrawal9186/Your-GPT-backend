const express = require("express")
require("dotenv").config()
const cors = require("cors")

const app = express()
app.use(express.json())
// app.use(cors())
// app.use(cors({
//   origin: "https://yourgpt-kappa.vercel.app", // ✅ Replace with your actual Vercel domain
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// }));
const allowedOrigins = [
  "https://yourgpt-kappa.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

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