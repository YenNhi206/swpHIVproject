import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Calendar, FileText, LogIn, UserPlus, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/about', label: 'Giới thiệu', icon: Info },
    { path: '/appointments', label: 'Đặt hẹn', icon: Calendar },
    { path: '/treatment-results', label: 'Kết quả', icon: FileText },
    { path: '/login', label: 'Đăng nhập', icon: LogIn },
    { path: '/signup', label: 'Đăng ký', icon: UserPlus },
  ];

  return (
    <nav className="bg-gradient-to-b from-red-50 to-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-red-700 hover:text-red-800 transition-colors duration-300">
            HIV Care+
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 py-2 px-4 rounded-t-lg transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-red-700 border-b-2 border-red-700 font-semibold'
                    : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-200'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-red-50 p-4 absolute w-full top-16 left-0 shadow-lg animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-4 text-gray-700 hover:bg-red-100 rounded ${
                  isActive(link.path) ? 'text-red-700 font-semibold' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                <link.icon className="w-5 h-5 inline mr-2" />
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}