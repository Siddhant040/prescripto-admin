
import React from 'react'
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from './routes/appRoutes'
import AuthProvider from './context/authContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
    },
  },
});

function App() {
  return (
   <>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppRoutes />
    <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
   </>
   
  
)}

export default App
