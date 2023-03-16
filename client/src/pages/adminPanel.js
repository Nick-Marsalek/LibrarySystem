import "../css/homePage.css"
import "../css/buttons.css"
import "../css/admin.css"
import data from "../mock-data.json"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export function AdminPanel() {
    const [loanData, setLoanData] = useState(data)
    const [bookData, setBookData] = useState()

    const [currentState, setState] = useState('panel')
    const navigate = useNavigate()
    
    const handleClick = async () => {
        setState('viewLoans')
        const res = await axios
        .post('http://194.163.44.139:9000/adminLoans')
        .catch((error) => console.log("Error: ", error));
        setLoanData(res.data)
        
        
    }

    const removeLoan = async (loan) => {
        const res = await axios
        .post('http://194.163.44.139:9000/revokeLoan', {
            body: loan.ID
        })
        .catch((error) => console.log("Error: ", error));
        handleClick()
    }

    const handleClick2 = (loan)=> {
        alert("You Revoked Loan ID: "+loan.ID)
        removeLoan(loan)
    }
    
    const handleClick3 = () => {
        navigate('/adminBooks')
        
        
        
    }

    const handleClick4 = (loan)=> {
        setState("panel")
    }

    const handleClick5 = ()=> {
        navigate('/adminAccounts')
    }

    const handleClick6 = ()=> {
        navigate('/')
    }


    if(currentState === 'viewLoans')
    {
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
                        <th>Loan ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Return Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loanData.map((loan)=> (
                        <tr>
                            <td>{loan.ID}</td>
                            <td>{loan.UserID}</td>
                            <td>{loan.Name}</td>
                            <td>{loan.BookID}</td>
                            <td>{loan.BookName}</td>
                            <td>{loan.ReturnDate}</td>
                            <td>
                                <button className="panel" type="button" onClick={()=> handleClick2(loan)}>Revoke</button>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
        </>
        )
    }
    else if(currentState === 'panel')
    {
        return (
            <>
            <h1 className="adminHeader">Admin Panel</h1>
            <button className="manageloans" type="button" onClick={handleClick}>Manage Loans</button>
            <button className="managebooks" type="button" onClick={handleClick3}>Manage Books</button>
            <button className="manageusers" type="button" onClick={handleClick5}>Manage Users</button>
            <button className="adminlogout" type="button" onClick={handleClick6}>Logout</button>

            
            </>
        )
    }
    
}