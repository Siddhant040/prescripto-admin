import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "../features/admin/auth/pages/login"
import AdminLayout from '@/layout/AdminLayout'
import ProtectedRoutes from './protectedRoutes'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin/*" element={<ProtectedRoutes><AdminLayout /></ProtectedRoutes>} />
      

    </Routes>
  )
}

export default AppRoutes