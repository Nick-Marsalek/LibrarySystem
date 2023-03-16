

import "../css/homePage.css"
import "../css/buttons.css"
import "../css/admin.css"
import data from "../mock-data3.json"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export function AdminAccounts() {
    const [userData, setUserData] = useState(data)

    const [currentState, setState] = useState('')

    const navigate = useNavigate()
    
    const handleClick = async () => {
        const res = await axios
        .post('http://194.163.44.139:9000/viewUsers')
        .catch((error) => console.log("Error: ", error));
        console.log(res.data)
        setUserData(res.data)
        //console.log(res.data)
        
        
    }



    const handleClick4 = (loan)=> {
        navigate('/admin')
    }

    const handleClick2 = async (loan)=> {
        const res = await axios
        .post('http://194.163.44.139:9000/deleteUser', {
            body: loan.ID
        })
        .catch((error) => console.log("Error: ", error));
        handleClick()
    }
    useEffect(()=> {
        handleClick()
    }, [])

        return (
        <>
            <h1 className="adminHeader">Admin Panel</h1>
            <button className="returnToPanel" type="button" onClick={handleClick4}>Back</button>
            

            <br></br>
            <br></br>
        <div className="app-container">
                <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((loan)=> (
                        <tr>
                            <td>{loan.ID}</td>
                            <td>{loan.Name}</td>
                            <td>{loan.Password}</td>
                            <td>
                                <button className="panel" type="button" onClick={()=> handleClick2(loan)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </>
        )
}
    