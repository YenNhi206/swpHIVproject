import React from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
