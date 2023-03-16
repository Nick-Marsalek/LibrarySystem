import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import "../css/login.css"
import "../css/buttons.css"


//import "../css/login.css"
export function Login(){
    const [data, setData] = useState('')
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [tokenInput, setTokenInput] = useState("")
    const [tokenOutput, setTokenOutput] = useState("")
    const [tokenValue, setTokenValue] = useState("")
    const navigate = useNavigate();
    const handleClick = () => navigate('/');



    var jsonData = {
      "username": username,
      "password": password
    }
    const handleClick2 = async () => {
      const response = await axios
      .post('http://194.163.44.139:9000/loginPost', jsonData)
      .catch((error) => 
      {
        var message = JSON.stringify(error.message)
        if (message == '"Network Error"')
        {
          setErrorMessage('API is Offline')
        }
        else
        {
          setErrorMessage(JSON.stringify(error))
        }
      });
      if (response && response.data) {
        //console.log(response)
        //console.log(response.data)
        //console.log(JSON.stringify(jsonData))
        setData(JSON.stringify(response.data))
        const map = new Map(Object.entries(JSON.parse(JSON.stringify(response.data))))
        try
        {
          setTokenValue(map.get('accessToken'))
          setTokenInput("Bearer "+ map.get('accessToken'))
        }
        catch(err) {
          const tokeninputfail = {
            "token": "failed"
          }
          setTokenInput(tokeninputfail)
        }

        
        if(map.get("result") == "success")
        {
          navigate('/',
          {
            state: {
              token: map.get('accessToken')
            }
          })
        }
        else 
        {
          setErrorMessage("Username Or Password is Incorrect")
        }
      }
    }
    
    const handleClick3 = () => {
      navigate("/employeeLogin")
    }

    useEffect(() => {

    }, [data])


    
    const checkToken = async () =>
    {
      const res = await axios
      .get('http://194.163.44.139:9000/checkToken',
      {
        headers: {
          'authorization': tokenInput
        }
      })
      .catch((error) => console.log("Error: ", error));
      JSON.stringify(res.data)
      setTokenOutput(JSON.stringify(res.data))
      console.log(tokenOutput)
    }
    


 
    const handleChange2 = pass => {
      setpassword(pass.target.value)
    }

    const handleChange = user => {
        setusername(user.target.value)
      }

    //<button type="button" onClick={handleClick}>Back</button>
    return <>
    <div className="shape"></div>
    <header>
        <h1 className = 'loginheader'>Login</h1>
    </header>
    <label className='userlabel'>Username</label>
    <input className='username' type='text' value={username} onChange={handleChange}></input>
    <br></br>
    <label className='passlabel'>Password</label>
    <input className='password' type='password' value={password} onChange={handleChange2}></input>
    <button className = 'back' onClick={handleClick}>Back</button>
    <button className = 'enter' onClick={handleClick2}>Log In</button>
    <h2 className='errorMessage'>{errorMessage}</h2>
    <button className="Employee" onClick={handleClick3}>Employees</button>
    <br></br>
    
    
</>
}