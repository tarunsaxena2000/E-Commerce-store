let mongoose = require("mongoose");


const DB = 'mongodb://127.0.0.1/Temp';
mongoose.connect(DB,{
}).then(()=>{
    // console.log("connnection is sucessfully")
}).catch((err)=>{
    // console.log("connnection not sucessfully")
})