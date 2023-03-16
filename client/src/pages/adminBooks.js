

import "../css/homePage.css"
import "../css/buttons.css"
import "../css/admin.css"
import data from "../mock-data2.json"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

export function AdminBooks() {
    const [loanData, setLoanData] = useState(data)
    const [bookData, setBookData] = useState()
    const [ISBN, setISBN] = useState('')
    const [BookNAME, setBookName] = useState('')
    const [Genre, setGenre] = useState('')
    const [Author, setAuthor] = useState('')
    const [Copies, setCopies] = useState('')

    const [currentState, setState] = useState('')

    const navigate = useNavigate()
    
    const handleClick = async () => {
        const res = await axios
        .post('http://194.163.44.139:9000/viewBooks')
        .catch((error) => console.log("Error: ", error));
        setBookData(res.data)
        //console.log(res.data)
        setState('viewBooks')
        
        
    }

    const deleteBook = async (loan) => {
        const res = await axios
        .post('http://194.163.44.139:9000/deleteBook', {
            body: loan.ISBN
        })
        .catch((error) => console.log("Error: ", error));
        handleClick()
    }

    const handleClick2 = (loan)=> {
        alert("You Deleted Book: "+loan.ISBN)
        deleteBook(loan)
    }
    
    const handleClick3 = async () => {
        const res = await axios
        .post('http://194.163.44.139:9000/addBook', {
            Book: BookNAME,
            Genre: Genre,
            Author: Author,
            Copies: Copies
        })
        .catch((error) => console.log("Error: ", error));
        handleClick()
    }

    const handleClick4 = (loan)=> {
        navigate('/admin')
    }

    useEffect(()=> {
        handleClick()
        setBookData(data)
    }, [])

    const handleChange = bookid => {
        setISBN(bookid.target.value)
    }

    const handleChange2 = bookiename => {
        setBookName(bookiename.target.value)
    }

    const handleChange3 = genrechange => {
        setGenre(genrechange.target.value)
    }

    const handleChange4 = authorchange => {
        setAuthor(authorchange.target.value)
    }

    const handleChange5 = copieschange => {
        setCopies(copieschange.target.value)
    }
    if(currentState === 'viewBooks')
    {
        return (
        <>
            <h1 className="adminHeader">Admin Panel</h1>
            <button className="returnToPanel" type="button" onClick={handleClick4}>Back</button>
            <button className="addBook" type="button" onClick={handleClick3}>Add Book</button>
            <forum>
            <input className="bookName" type="text" value={BookNAME} onChange={handleChange2} placeholder="Book Name"></input>
            <input className="bookGenre" type="text" value={Genre} onChange={handleChange3} placeholder="Genre"></input>
            <input className="bookAuthor" type="text" value={Author} onChange={handleChange4} placeholder="Author"></input>
            <input className="bookCopies" type="text" value={Copies} onChange={handleChange5} placeholder="Number of Copies"></input>


            </forum>
            

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
        <div className="app-container">
                <table>
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Author</th>
                        <th>Copies</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((loan)=> (
                        <tr>
                            <td>{loan.ISBN}</td>
                            <td>{loan.Name}</td>
                            <td>{loan.Genre}</td>
                            <td>{loan.Author}</td>
                            <td>{loan.Copies}</td>
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
    else if(currentState === 'panel')
    {
        return (
            <>
            <h1 className="adminHeader">Admin Panel</h1>
            <button className="manageloans" type="button" onClick={handleClick}>Manage Loans</button>
            <button className="managebooks" type="button" onClick={handleClick3}>Manage Books</button>
            
            </>
        )
    }
}
    