import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarVertical from '../components/SidebarVertical';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isSidebar = user && ['ADMIN', 'DOCTOR', 'STAFF'].includes(user.role);

  return (
    <div className="min-h-screen flex">
      {isSidebar && (
        <SidebarVertical user={user} handleLogout={handleLogout} />
      )}

      <div className={`flex-1 flex flex-col ${isSidebar ? 'ml-64' : ''}`}>
        {!isSidebar && (
          <Navbar user={user} handleLogout={handleLogout} />
        )}

        <Breadcrumb />

        <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
          {children}
        </main>


      </div>
    </div>
  );
}
