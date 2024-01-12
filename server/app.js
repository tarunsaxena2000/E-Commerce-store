const mongoose = require("mongoose")
const dotenv = require("dotenv")
const express  = require("express")
const app  = express();
const User  =require("./model/userSchema")
const path  =  require("path")
require('./DB/db')
 dotenv.config({path:'./config.env'})


 app.use(express.json())

// env 

const PORT=process.env.PORT

app.use(require('./Route/auth'))

//middleware

// const middleware = (req,res,next)=>{
//      console.log(`i am middleone`)
//      next();
// }

app.use(express.static(path.join(__dirname,'../frontend/build')))
app.get('*',function(req,res){
       res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
})
// routes

// app.get('/',(req,res)=>{
// res.send(`hello world fromn the server`)
// })
// app.get('/home',middleware,(req,res)=>{
//     res.send(`hello home from the server`)
//     })
// app.get('/signup',(req,res)=>{
//     res.send(`I am inregister`)
//     })

//  app.get('/signin',(req,res)=>{
//         res.send(`I am in login`)
//         })


app.listen(PORT ,()=>{
    console.log(`server is running ON ${PORT}`)
})