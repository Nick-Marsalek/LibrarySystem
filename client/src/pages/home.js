import "../css/homePage.css"
import "../css/buttons.css"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";


export function Home() {
    const navigate = useNavigate();
    const [welcomeMessage, setWelcomeMessage] = useState('Welcome')
    
    const handleClick = () => navigate('/login');
    const handleClick2 = () => navigate('/register')
    const handleClick3 = () => navigate('/search')
    


    //Token Code Start
    var location = useLocation()
    var tokenInputString =''
    var token = (JSON.stringify(location.state))
    console.log(token)
    const [loggedIN, setLoggedIN] = useState('false')
    const checkToken = async () =>
    {
      const res = await axios
      .get('http://194.163.44.139:9000/checkToken',
      {
        headers: {
          'authorization': tokenInputString
        }
      })
      .catch((error) => console.log("Error: ", error));
        var data = JSON.stringify(res.data)
        var map = new Map(Object.entries(JSON.parse(data)))
        var info = map.get('username')
        var map2 = new Map(Object.entries(JSON.parse(JSON.stringify(info))))
        setWelcomeMessage("Welcome "+map2.get('name'))
        setLoggedIN('true')
        //navigate('/search')
        
      
    }

    const handleClick4 = () => navigate('/search',
     {
        state: {
            token: location.state.token
        }
     })

    useEffect(() => {
        if(token !== "null")
        {
            var map = new Map(Object.entries(JSON.parse(token)))
            tokenInputString = "Bearer "+ map.get('token')
            checkToken()
        }
    }, [])
    useEffect(() => {

    }, [loggedIN])
    //End of Token code

    const loggoutButton = () => {
        setLoggedIN('false')
        token = 'null'
        setWelcomeMessage('Welcome')
        navigate('/')
    }

    const handleLoans = () => navigate('/account',
    {
        state: {
            token: location.state.token
        }
    })

    return (
    <>
        <div className = 'header'>
        <h1>Library System</h1>
        </div>
        <div className = 'header2'>
        <h2>{welcomeMessage}</h2>
        </div>
        <div>
            {(loggedIN=='true')?(
                <nav>
                    <h2 className="header2">You are logged in</h2>
                    <button className="Searchhome" onClick={handleClick4}>Search</button>
                    <button className="Logouthome" onClick={loggoutButton}>Logout</button>
                    <button className="Loanshome" onClick={handleLoans}>View Loans</button>
                </nav>
                
            ) 
            : 
            (
                <nav>
                <button className = 'login' onClick={handleClick}>Sign In</button>
                <br></br>
                <button className = 'register' onClick={handleClick2}>Register</button>
                <br></br>
                <button className="search" onClick={handleClick3}>Search</button>
            </nav>
            
            )}
        </div>
        
    </>
    )
}