// import "../css/homePage.css"
// import "../css/buttons.css"

import React from "react";
import axios from "axios"

import { BrowserRouter as Router, Route, Link, useParams } from "react-router-dom";
import { useNavigate, useLocation} from "react-router-dom"
import { useEffect, useState} from "react"



export function Book() {
    let params = useParams()
    //var {type, passedToken} = useParams();
    const navigate = useNavigate();
    const [sqldata, setSqlData] = useState(0)
    const [count, setCount] = useState(0);

    //Token Code Start
    var location = useLocation()
    var tokenInputString =''
    var token = (JSON.stringify(location.state))
    const [loggedIN, setLoggedIN] = useState(null)

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
        // console.log("Help, I'm being repressed!")
        // console.log(map)

        var info = map.get('username')
        var map2 = new Map(Object.entries(JSON.parse(JSON.stringify(info))))
        // console.log("Map 2")
        // console.log(map2)
        // console.log(map2.get('name'))
        setLoggedIN(map2.get('name'))        
      
    }
    // useEffect(() => {
    //     if(token !== "null")
    //     {
    //         var map = new Map(Object.entries(JSON.parse(token)))
    //         tokenInputString = "Bearer "+ map.get('token')
    //         checkToken()
    //     }
    // }, [])
    useEffect(() => {

    }, [loggedIN])
    //End of Token code

    // This allows us to use the extra info in the link
    useEffect(() => {
        fetchData();
        console.log(params.type);
        console.log(params.passedToken)
        //console.log(passedToken);
        //token = params.token;

        // Query the database
        handleSelect(params.passedToken);
        if(params.passedToken !== "null")
        {
            // var map = new Map(Object.entries(JSON.parse()))
            tokenInputString = "Bearer "+ params.passedToken
            checkToken()
        }

    }, []);

    const fetchData = async () => {
            fetch("http://194.163.44.139:3000/book/${params.type}/${params.passedToken}")
            // .then((data) => data.json())
            // .then((data) => {
            //     console.log(data);
            // });
    }

    
    const handleSelect = async (tokey) => {
        
        // Get the number of copies the library owns
        var jsonData = {
            "table": "Books",
            "get": "WHERE ISBN = " + params.type
        }
        var copies = 0;
        const response = await axios
        .post('http://194.163.44.139:9000/selectPost', jsonData)
        .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
            console.log("Setting total copies")
            console.log(response.data)
            copies = response.data[0].Copies
            console.log(copies)
            setSqlData(copies)
            var label = document.getElementById('bookName');
            label.innerHTML = response.data[0].Name

        }

        var jsonDataCount = {
            "isbn": params.type,
        }
        // Get the number of copies checked out
        const response2 = await axios
        .post('http://194.163.44.139:9000/countPost', jsonDataCount)
        .catch((error) => console.log("Error: ", error));
        if (response2 && response2.data) {
            console.log("Setting loan count")
            //console.log(sqldata)
            console.log(copies)
            console.log(response2.data)
            var checked = copies-response2.data[0].CheckedOut
            setCount(checked)
            document.getElementById('copiesAvailable').innerHTML = checked + "/" + copies + " available"
            if (checked <= 0) {
                document.getElementById('checkOut').style.visibility = 'hidden';
            }
            //document.getElementById('copiesAvailable').innerHTML = checked + "/" + sqldata + " available"
            // var label = document.getElementById('bookName');
            // label.innerHTML = response.data[0].Name

        }
    }

    // Handles click on the back button
    // Will return user to the search page
    const handleBack = () => navigate('/search', {
        state: {
            token: params.passedToken
        }
    });

    // Handles click on the checkout button
    // Will send a query to the database to create a new loan if there are copies available
    const handleCheckOut = async () => {
        var jsonData = {
            "table": "Users",
            "get": "WHERE Name = \"" + loggedIN + "\""
        }

        if (count > 0) {
            // Request the user's id from the database
            const response1 = await axios
            .post('http://194.163.44.139:9000/selectPost', jsonData)
            .catch((error) => console.log("Error: ", error));
            if (response1 && response1.data) { 
                
                console.log(response1.data)
                // Successfully found the user
                
                // Get the current date and add 4 weeks
                var returnDate = new Date()
                returnDate.setHours(0,0,0,0)
                returnDate.setDate(returnDate.getDate() + 28)

                var dateString = returnDate.getMonth() + "/" + returnDate.getDay() + "/" + returnDate.getFullYear();
                var jsonData = {
                    "table": "Loans",
                    "values": "VALUES (" + response1.data[0].ID + ", " + params.type + ", DATE_ADD(CURDATE(), INTERVAL 28 DAY), 0)"
                }

                // Check out the book in the user's name
                const response2 = await axios
                .post('http://194.163.44.139:9000/insertPost', jsonData)
                .catch((error) => console.log("Error: ", error));
                if (response2 && response2.data) { 
                    console.log(response2)
                }
            }

            

        }
        handleSelect();
    }

    return (<>
        <button onClick={handleBack}>Back to search</button>
        <div></div>
        <nav>
            <h1 id="bookName">Hey there</h1>
            <h1 id="copiesAvailable">0/0 available</h1>
            <div>
            {(count > 0)?(
                <div>
                {(loggedIN!=null)?(
                    <button id="checkOut" onClick={handleCheckOut}>Check Out</button>
                    ):(
                    <>
                        <div></div>
                        <h2 id="notLoggedIn">Login to check out this book</h2>
                    </>
                    )}
                    </div>
            ):(
                <div>
                

                </div>
            )}
            
            </div>
            
        </nav>
        
    </>)
}