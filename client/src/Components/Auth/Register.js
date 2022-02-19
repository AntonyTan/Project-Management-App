import React, {useState} from 'react'
import {
    Link
  } from "react-router-dom";
function Register({setAuth}) {

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const {username, password} = inputs;


    const handleOnChange = (e) => {
        setInputs({...inputs, 
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                user_name: username, 
                user_password: password
            };
            const response = await fetch("/auth/register",{
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)}
            )
            if (response.status === 401){
                console.log("User already exists");
                return;
            }
            const jwtToken = await response.json();
            localStorage.setItem("token", jwtToken.token);
            setAuth(true);
        } catch (error) {
            console.error(error.message)
        }
    }
    return (
        <div className = 'auth-page'>
                <div className = "auth-title">
                    <h1>Register</h1>
                </div>
                <form className = "auth-form" onSubmit = {handleSubmit}>
                        <input 
                            type = "text" 
                            placeholder ="Username" 
                            value = {username} 
                            name = "username" 
                            className = "auth-input"
                            autoComplete = "username"
                            onChange = {handleOnChange}
                            required
                        />
                        <input
                            type = "password" 
                            placeholder ="Password" 
                            value = {password} 
                            name = "password" 
                            className = "auth-input"
                            autoComplete = "new-password"
                            onChange = {handleOnChange}
                            required
                        />
                <button className = 'auth-button'>
                    Register
                </button>
                </form>
                <p className = 'toggleAuth'>
                    
                    <Link to="/login">I already have an account</Link>
                </p>
        </div>
    )
}

export default Register
