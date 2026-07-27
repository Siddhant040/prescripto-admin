
import React from 'react'
import { Toaster } from "sonner";
import AppRoutes from './routes/appRoutes'
import AuthProvider from './context/authContext';

function App() {
  return (
   <>
    <AuthProvider>
      <AppRoutes />
    <Toaster richColors position="top-right" />
      </AuthProvider>
   </>
   
  
)}

export default App