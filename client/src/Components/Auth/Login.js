import React, {Fragment, useState} from 'react'
import {
    Link
  } from "react-router-dom";
  
function Login({setAuth}) {
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
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const body = {
                user_name: username,
                user_password: password
            }
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            if (response.status === 401){
                console.log("Invalid login credentials");
                return;
            }

            const jwtToken = await response.json()
            localStorage.setItem("token", jwtToken.token);
            setAuth(true);
        } catch (error) {
            
        }
    }
    const showLoginPage = () => {
        return(
            <div className = 'auth-page'>
                <div className = "auth-title">
                    <h1>Login</h1>
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
                    Login
                </button>
                </form>
                <p className = 'toggleAuth'>
                <Link to="/register">I don't have an account</Link>
                </p>
            </div>
        )
    }

    return (
        <Fragment>
            {showLoginPage()}
        </Fragment>
    )
}

export default Login
