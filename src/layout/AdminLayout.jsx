import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import  Header  from '../components/layout/Header'
import AdminSidebar from '@/features/admin/auth/components/AdminSidebar'

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
   <div className="min-h-screen bg-[linear-gradient(180deg,_#f0faf6_0%,_#f7fbf9_28%,_#ffffff_100%)] text-slate-950">
      <div className="mx-auto max-w-[1600px] px-3 py-3 sm:px-4">
        <div className="grid items-start gap-4 xl:grid-cols-[256px_minmax(0,1fr)]">
          <AdminSidebar
            isMobileOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          <div className="min-w-0">
            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <main className="min-w-0 pt-2">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default AdminLayout
