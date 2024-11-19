import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login/Login'
import Admin from '../pages/admin/Admin'
import Employee from '../pages/employee/Employee'
import ResetPassword from '../pages/resetPassword/ResetPassword'
import SingleUserView from '../pages/singleUserView/SingleUserView';

function Routing() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' exact element={<Login />} />
                <Route path='/admin/:id' exact element={<Admin/>} />
                <Route path='/employee/:id' exact element={<Employee />} />
                <Route path='/resetPassword/:id' exact element={<ResetPassword />} />
                <Route path='/singleUserView/:id/:authId' exact element={<SingleUserView/>} />
            </Routes>
        </Router>
    </div>
  )
}

export default Routing;
