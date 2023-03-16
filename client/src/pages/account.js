// Displays the user's account information
// From here the user can view what loans they've taken out

import React from "react"
import axios from "axios"

import "../css/buttons.css"
import "../css/homePage.css"


import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export function Account() {
    const navigate = useNavigate();

    //Token Code Start
    var location = useLocation()
    var tokenInputString =''
    var token = (JSON.stringify(location.state))
    console.log(token)
    const [loggedIN, setLoggedIN] = useState(null)

    var user = ''

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
        //setWelcomeMessage("Welcome "+map2.get('name'))
        user = map2.get('name')
        setLoggedIN(map2.get('name'))
        console.log(user)
        document.getElementById("User").innerHTML = map2.get('name');
        //navigate('/search')
        updateLoans();
      
    }

    // Navigates to the search and sends the token
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


    function handleReturn(clicked) {
        console.log(this)
        // Look at me go
        var rowID = this.id;
        console.log(rowID)

        returnAsync(rowID);
    }
    
    const returnAsync = async (rowID) => {
        

        var jsonData = {
            "table": "Loans",
            "get": "WHERE ID = " + rowID
        }

        // Request the user's id from the database
        const response1 = await axios
        .post('http://194.163.44.139:9000/deleteLoan', jsonData)
        .catch((error) => console.log("Error: ", error));
        if (response1 && response1.data) { 
            console.log("Returned loan " + rowID + " successfully")
        }
        updateLoans()
    }

    const updateLoans = async () => {
        var jsonData = {
            "table": "Users",
            "get": "WHERE Name = \"" + user + "\""
        }

        // Request the user's id from the database
        const response1 = await axios
        .post('http://194.163.44.139:9000/selectPost', jsonData)
        .catch((error) => console.log("Error: ", error));
        if (response1 && response1.data) { 
            
            console.log(response1.data)

            jsonData = {
                "table": "Loans",
                "get": "WHERE UserID = " + response1.data[0].ID
            }
            const response2 = await axios
            .post('http://194.163.44.139:9000/selectPost', jsonData)
            .catch((error) => console.log("Error: ", error));
            if (response2 && response2.data) {
                
                // Debug
                console.log(response2.data)
                
                
                // Clears the table of old search data
                var mytbl = document.getElementById("myTable");
                clearTable(mytbl);

                // var results = []
                var i = 0
                for (const loan of response2.data) {

                    // Get the book based on it's ID
                    jsonData = {
                        "table": "Books",
                        "get": "WHERE ISBN = " + loan.BookID
                    }
                    const response3 = await axios
                    .post('http://194.163.44.139:9000/selectPost', jsonData)
                    .catch((error) => console.log("Error: ", error));
                    if (response3 && response3.data) {
                        if (document.getElementById(loan.ID) == null) {
                            var row = document.getElementById('myTable').insertRow();
                            // row.id = loan.ID;
                            row.insertCell(0).innerHTML = response3.data[0].Name;
                            row.insertCell(-1).innerHTML = response3.data[0].Author;
                            row.insertCell(-1).innerHTML = response3.data[0].Genre;
                            var day = new Date(loan.ReturnDate)
                            console.log(day)
                            row.insertCell(-1).innerHTML = day.getFullYear() + "-" + day.getMonth() + "-" + day.getDay();
                            row.insertCell(-1).innerHTML = "<button id='" + loan.ID + "' className='returnButton'>Return</button>"
                            document.getElementById(loan.ID).style.width = '120px';
                            document.getElementById(loan.ID).style.height = '70px';
                            document.getElementById(loan.ID).onclick = handleReturn; 
                        }                          
                    }
                    // if (book.Copies > 0) {
                    //     //var cell = row.insertCell(-1)
                    //     //cell.innerHTML = '<a href="'+checkoutLink+'">Check Out</a>';
                        
                    //     row.insertCell(-1).innerHTML = "<button onclick={handleCheckOut}>Check out</button>";
                        
                    //     //row.insertCell(-1).innerHTML = "<button onClick={() => checkOut("+book.ISBN+", "+"1"+")}>Check out</button>"
                        
                    // }
                    // else {
                    //     row.insertCell(-1).innerHTML = 'Unavailable'
                    // }
                    i+=1;
                }
            }

            
        }
        else {
            alert("No response!")
        }
    }

    const handleBack = () => navigate("/", {
        state: {
            token: location.state.token
        }
    });

    return (
        <>
        <button id='back' onClick={handleBack}>Back</button>
        <h1 className="header">My Account</h1>
        <h2 className="header2" id="User">Username: Matt</h2>
        <h2 className="loanheader">Loans</h2>

        <table id="myTable" width="100%">
            <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Due</th>
                <th>Return</th>
            </tr>
        </table>
        </>
    )
}

function clearTable(table) {
    var rows = table.rows;
    var i = rows.length;
    while (--i) {
      rows[i].parentNode.removeChild(rows[i]);
      // or
      // table.deleteRow(i);
    }
}