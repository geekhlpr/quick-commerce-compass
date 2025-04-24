
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';
import MobileNavbar from '@/components/MobileNavbar';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile navbar */}
        <MobileNavbar />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Index;
