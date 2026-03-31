const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://harsh0420:harsh0420@ac-tv91lcj-shard-00-00.7u9mdhj.mongodb.net:27017,ac-tv91lcj-shard-00-01.7u9mdhj.mongodb.net:27017,ac-tv91lcj-shard-00-02.7u9mdhj.mongodb.net:27017/?ssl=true&replicaSet=atlas-15gljh-shard-0&authSource=admin&appName=Cluster0")
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("success")
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email, password})

    if(user){
        res.json({success : true});
    }else{
        res.json({success : false});
    }
})

app.post("/signup", async (req, res) => {
    const {email, password} = req.body;
    
    const existingUser = await User.findOne({email})

    if(existingUser){
        return res.status(400).json({success: false, message: "User already exists"});
    }
    
    try {const user = new User({
        email,
        password
    });
    await user.save();
    res.json({Message : "User Saved"});
}catch(err){
    if (err.code === 11000){
        return res.json({message: " Duplicate email"})
    }
    res.json({message: "Error"})
}
})

app.listen(5000, ()=> {
    console.log("app started");
})