import React from 'react';
import { Route, Routes } from 'react-router-dom'; //Context Tool
import { Home } from './pages/home';
import { Login} from './pages/login'
import { Account} from './pages/account'
import { Searchle} from './pages/searchle'
import { Register } from './pages/register';
import { Book } from './pages/book';
import { EmployeeLogin } from './pages/employeeLogin';
import { AdminPanel } from './pages/adminPanel';
import { AdminBooks } from './pages/adminBooks';
import { AdminAccounts } from './pages/adminAccounts';

function App() {

  return (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/employeeLogin' element={<EmployeeLogin />} />
    <Route path='/account' element={<Account />} />
    <Route path='/search' element={<Searchle />} />
    <Route path='/register' element={<Register />} />
    <Route path='/book/:type/:passedToken' exact element={<Book />} />
    <Route path='/admin' element={<AdminPanel/>} />
    <Route path='/adminBooks' element={<AdminBooks/>} />
    <Route path='/adminAccounts' element={<AdminAccounts/>} />
  </Routes>
  )
}

export default App;
