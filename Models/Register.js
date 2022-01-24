const mongoose=require("mongoose");
const registerSchema=new mongoose.Schema({
    username:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    category:{
        type:String
    },
    otp:{
        type:String
    },
},{
    timestamps:true
});

module.exports=mongoose.model("register",registerSchema);
