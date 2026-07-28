import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "../features/admin/auth/pages/login"
import AdminLayout from '@/layout/AdminLayout'
import ProtectedRoutes from './protectedRoutes'
import AdminDashboard from "../features/admin/auth/pages/AdminDashboard"
import DoctorsPage from "../features/admin/auth/pages/DoctorsPage"
import AppointmentsPage from "../features/admin/auth/pages/AppointmentsPage"
import ReviewsPage from "../features/admin/auth/pages/ReviewsPage"
import MyProfile from "../features/admin/auth/pages/MyProfile"
import Setting from "../features/admin/auth/pages/Setting"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="admin" element={<ProtectedRoutes><AdminLayout /></ProtectedRoutes>}>
        <Route index element={<AdminDashboard />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="appointments" element={<AppointmentsPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="settings" element={<Setting />} />
      </Route>
      

    </Routes>
  )
}

export default AppRoutes
