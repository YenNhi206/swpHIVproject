import React from 'react';
import Navbar from '../components/Navbar';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer';

export default function MainLayout({ children, user, setUser }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <Breadcrumb />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        {children}
      </main>

      <Footer />
    </div>
  );
}
