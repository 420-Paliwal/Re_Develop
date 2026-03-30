const express = require("express")
const cors = require("cors")
const jwt = require('jsonwebtoken')
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("server running")
})

app.post("/login", (req, res)=>{
    const { email, password } = req.body;
    if (email == "test@gmail.com" && password == "1234"){
        const token = jwt.sign(
            {email},
            "secretkey",
            {expiresIn: "1h"}
        )
        res.json({success: true, message: "Login successful", token}); 
    }
    else{
        res.json({success: false, message: "Invalid credentials"})
    }
});

app.listen(5000, ()=>{
    console.log("server started on port 5000")
})