import React, { useState } from 'react'

const LoginForm = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordType, setPasswordType] = useState("password")
    const [passwordTypeButton, setPasswordTypeButton] = useState("Show")
    const [loading, setLoading] = useState(false);

    function showPassword(){
        if (passwordType == "text"){
            setPasswordType("password")
            setPasswordTypeButton("Show")
        }
        else{
            setPasswordType("text")
            setPasswordTypeButton("Hide")
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if (!email || !password){
            alert("fill all fields")
            return
        }
        setLoading(true)
        setTimeout(() => {
            console.log(email, password)
            setLoading(false)
        }, 2000);
    }
    return (
    <>
    <div className="container">
        <form action="" method="" onSubmit={handleSubmit}>
            <h1>Hi {name},</h1>
            <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            <input type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <input type={passwordType}
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={showPassword}>{passwordTypeButton}</button>
            <button type='submit' disabled={loading}>{loading ? "loading" : "login"}</button>
        </form>
    </div>
    </>
  )
}

export default LoginForm