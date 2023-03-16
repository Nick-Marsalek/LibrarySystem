import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Grid, h } from "gridjs";

import { useLocation, useNavigate } from "react-router-dom"


import "../css/searchle.css"

//var mysql = require('mysql');


export function Searchle() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("Name")
    const [data, setData] = useState("")
    const [token, setToken] = useState("null")


    var location = useLocation()
    var info = JSON.stringify(location.state)
    //console.log(location.state)
    useEffect(()=> {
        if(info !== 'null')
        {
            var map = new Map(Object.entries(JSON.parse(info)))
            
            console.log(map)
            console.log(map.get('token'))
            setToken(location.state.token)
            handleSearchle(location.state.token);
        }
        else {
            handleSearchle('null')
            console.log("Didn't get a token")
        }
        
    }, [])
    
    

    var jsonData = {
        "search": search,
        "filter": filter
    }
    const handleSearchle = async (tokey) => {
        const response = await axios
        .post('http://194.163.44.139:9000/searchPost', jsonData)
        .catch((error) => console.log("Error: ", error));
        if (response && response.data) {
            
            // Debug
            // console.log(response.data)
            
            var names = []
            for (const name of response.data) {
                names.push(name.Name)
            }
            setData(names)
            
            // Clears the table of old search data
            var mytbl = document.getElementById("myTable");
            clearTable(mytbl);

            // var results = []
            for (const book of response.data) {

                var bookPageLink = "http://194.163.44.139:3000/book/" + book.ISBN + "/" + tokey
                //console.log(bookPageLink)
                var checkoutLink = "http://194.163.44.139:3000"
                var row = document.getElementById('myTable').insertRow();
                row.insertCell(0).innerHTML = '<a href="'+bookPageLink+'">'+book.Name+'</a>';
                row.insertCell(-1).innerHTML = book.Author;
                row.insertCell(-1).innerHTML = book.Genre;
                // if (book.Copies > 0) {
                //     //var cell = row.insertCell(-1)
                //     //cell.innerHTML = '<a href="'+checkoutLink+'">Check Out</a>';
                    
                //     row.insertCell(-1).innerHTML = "<button onclick={handleCheckOut}>Check out</button>";
                    
                //     //row.insertCell(-1).innerHTML = "<button onClick={() => checkOut("+book.ISBN+", "+"1"+")}>Check out</button>"
                    
                // }
                // else {
                //     row.insertCell(-1).innerHTML = 'Unavailable'
                // }
            }



            // Debug
            // console.log(names)
            
        }
        else {
            alert("No response!")
        }
    }

    const handleSearchInput = pass => {
        setSearch(pass.target.value)
        //handleSearchle()
    }

    const handleFilterChange = pass => {
        setFilter(pass.target.value)
        handleSearchle(token)
    }


    const handleHome = () => navigate("/", {
        state: {
            token: location.state.token
        }
    });
    

    return (
        <>
        <button id="home" onClick={handleHome}>Back to Home</button>
        <input type="text" id="myInput" onKeyUp={handleSearchle} placeholder="Search for names.." onChange={handleSearchInput}>
        </input>

        <label for="searchParam" className="searchLabel">Search by:</label>

        <select name="searchParam" id="searchParam" onChange={handleFilterChange}>
            <option value="Name">Name</option>
            <option value="Genre">Genre</option>
            <option value="Author">Author</option>
        </select>

        <table id="myTable" width="100%">
            <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Genre</th>
            </tr>
        </table>

        </>
        
        
    )
}

// function handleSearchle() {
//     alert("You searched!")
// }


function clearTable(table) {
    var rows = table.rows;
    var i = rows.length;
    while (--i) {
      rows[i].parentNode.removeChild(rows[i]);
      // or
      // table.deleteRow(i);
    }
}