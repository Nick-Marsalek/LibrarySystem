import React from "react"
import axios from "axios"
import { useState } from "react"
import '../css/register.css'
import '../css/buttons.css'
import { useNavigate } from "react-router-dom"
export function Register() 
{
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const attemptRegister = async () => 
    {
        const res = await axios
        .post('http://194.163.44.139:9000/register',
        {
            username: username,
            password: password
        })
        .catch((error) => console.log("Error: ", error))
        //console.log(res)
        if(res.data === "Success")
        {
            navigate("/login")
        }
        else
        {
            setErrorMessage("Username not available")
        }
    }

    const handleChange = user => {
        setUsername(user.target.value)
    }
    const handleChange2 = pass => {
        setPassword(pass.target.value)
    }
    const handleChange3 = confirm => {
        setConfirmPassword(confirm.target.value)
    }
    const handleClick = () => {
        if(username !== "" && password !== "" && confirmPassword  !== "")
        {
            if(password === confirmPassword)
            {
                attemptRegister()
            }
            else
            {
                setErrorMessage('Passwords Do Not Much')
            }
        }
        else
        {
            setErrorMessage("Please Fill Out Every Field.")
        }
    }
    const handleClick2 = () => navigate('/')

    return<>
        <div className="shape"></div>
        <h1 className="registerHeader">Register</h1>
        <fourm>
            <label className="userLabel">Username</label>
            <input className='regUsername' type='text' onChange={handleChange}></input>
            <label className="passLabel">Password</label>
            <input className='regPassword' type='password' onChange={handleChange2}></input>
            <label className="confirmLabel">Confirm Password</label>
            <input className='confirmPassword' type='password' onChange={handleChange3}></input>
        </fourm>
        <button className="createAccount" onClick={handleClick}>Create Account</button>
        <button className="registerBack" onClick={handleClick2}>Back</button>
        <h2 className="registerError">{errorMessage}</h2>
    </>
}