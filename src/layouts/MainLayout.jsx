import React from 'react';
import Navbar from '../components/Navbar'; // Hoặc NewNavbar nếu đã tạo
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}