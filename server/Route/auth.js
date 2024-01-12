const express = require('express')
const router =  express.Router()
const bcrypt  = require('bcrypt')
const jwt  =  require('jsonwebtoken')
const authent  = require('../middleware/authent')

require('../DB/db')
const User = require('../model/userSchema')

router.get('/',(req,res)=>{
    res.send(`hello world fromn the server`)
    })


    router.post('/register',async(req,res)=>{
           
       
          try{

            const {name,email,password,phone} =req.body
            if(!name || !email || !password || !phone){
                return res.status(422).json({error:"plzz fill all detailes"})
            }

           const userExists =  await User.findOne({email:email})
           if(userExists){
                 return  res.status(422).json({error:"user already exsists"})
           }

           const user  = new User({name,email,password,phone})

             await user.save()

             res.status(201).json({message:"user registered sucessfully"})

          }catch(err){
                     console.log(err)
          }
    })


    ///  login route ///


    router.post('/signin',async(req,res)=>{
             
           try{
            let token;
            const {email, password}  = req.body

            if(!email || !password){
                return res.status(400).json({error:"plzz filled the data "})
            }

            const userLogin = await User.findOne({email:email})

            if(userLogin){
                const  isMatch  = await bcrypt.compare(password , userLogin.password)
                 token =  await userLogin.generateAuthToken();
                //  console.log(token)

                  res.cookie("jwtcookie" ,token, {
                    expires: new Date(Date.now() + 240000000),
                    httpOnly:true
                  })
                  
                //   console.log(isMatch)

                if(!isMatch ){
                     res.status(400).json({error:"invalid credentials p "})
                }else{
                    res.status(200).json({
                        status: "OK",
                        message: "User created"
                    });
                }
            }

            else{
                res.status(400).json({error:"invalid credentials "})
            }

           }
           catch(err){
                    //  console.log(err)
           }





           router.get('/home',authent,(req,res)=>{
            res.send(`hello home from the server`)
            res.send(req.rootUser)
            })
    })



   


module.exports = router