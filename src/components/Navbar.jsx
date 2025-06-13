import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold">HIV Care+</span>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-6 items-center">
            {isActive('/') ? (
              <button className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[80px]">
                Trang chủ
              </button>
            ) : (
              <Link to="/" className="hover:underline">
                Trang chủ
              </Link>
            )}

            {isActive('/about') ? (
              <button className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[80px]">
                Giới thiệu
              </button>
            ) : (
              <Link to="/about" className="hover:underline">
                Giới thiệu
              </Link>
            )}

            {isActive('/appointments') ? (
              <button className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[80px]">
                Đặt hẹn
              </button>
            ) : (
              <Link to="/appointments" className="hover:underline">
                Đặt hẹn
              </Link>
            )}

            {isActive('/treatment-results') || isActive('/results') ? (
              <button className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[80px]">
                Kết quả
              </button>
            ) : (
              <Link to="/treatment-results" className="hover:underline">
                Kết quả
              </Link>
            )}

            {/* Nút Đăng nhập */}
            <Link to="/login" className="flex items-center">
              <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white transition-colors duration-300 min-w-[100px]">
                Đăng nhập
              </button>
            </Link>

            {/* Nút Đăng ký */}
            <Link to="/signup" className="flex items-center">
              <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white transition-colors duration-300 min-w-[100px]">
                Đăng ký
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-red-700 px-4 py-3 space-y-2">
          {isActive('/') ? (
            <button className="w-full text-left bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[100px]">
              Trang chủ
            </button>
          ) : (
            <Link to="/" className="block hover:underline" onClick={() => setOpen(false)}>
              Trang chủ
            </Link>
          )}

          {isActive('/about') ? (
            <button className="w-full text-left bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[100px]">
              Giới thiệu
            </button>
          ) : (
            <Link to="/about" className="block hover:underline" onClick={() => setOpen(false)}>
              Giới thiệu
            </Link>
          )}

          {isActive('/appointments') ? (
            <button className="w-full text-left bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[100px]">
              Đặt hẹn
            </button>
          ) : (
            <Link to="/appointments" className="block hover:underline" onClick={() => setOpen(false)}>
              Đặt hẹn
            </Link>
          )}

          {isActive('/treatment-results') || isActive('/results') ? (
            <button className="w-full text-left bg-red-100 text-red-700 font-semibold px-4 py-2 rounded-xl min-w-[100px]">
              Kết quả
            </button>
          ) : (
            <Link to="/treatment-results" className="block hover:underline" onClick={() => setOpen(false)}>
              Kết quả
            </Link>
          )}

          <Link to="/login" className="block" onClick={() => setOpen(false)}>
            <button className="w-full text-left bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white transition-colors duration-300 min-w-[100px]">
              Đăng nhập
            </button>
          </Link>

          <Link to="/signup" className="block" onClick={() => setOpen(false)}>
            <button className="w-full text-left bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-red-700 hover:text-white transition-colors duration-300 min-w-[100px]">
              Đăng ký
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}