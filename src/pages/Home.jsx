import React from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminPanel from './AdminPanel'
import BookingPage from './BookingPage'
import UserDashboard from './UserDashboard'

const Home = () => {
  return (
    <div>
        <Routes>
          <Route path="/login" element={<Auth />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<BookingPage />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Routes>
    </div>
  )
}

export default Home