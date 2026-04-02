const express = require("express");
const cors = require("cors")
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express()
const bcrypt = require("bcrypt");

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://harsh0420:harsh0420@ac-tv91lcj-shard-00-00.7u9mdhj.mongodb.net:27017,ac-tv91lcj-shard-00-01.7u9mdhj.mongodb.net:27017,ac-tv91lcj-shard-00-02.7u9mdhj.mongodb.net:27017/?ssl=true&replicaSet=atlas-15gljh-shard-0&authSource=admin&appName=Cluster0")
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

app.get("/", async (req, res) => {
    const allUser = await User.find()
    console.log(allUser);
    res.send("success")
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })    
    console.log(user)
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({ success: false, message: "Wrong Password" });
    }
    return res.status(200).json({ success: true, message: "Logged In" })
})


app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword
        }
        );
        await user.save();
        res.json({ Message: "User Saved" });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ message: " Duplicate email" })
        }
        res.json({ message: "Error" })
    }
})

app.listen(5000, () => {
    console.log("app started");
})