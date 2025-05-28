import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>
            <Link to="/about" className="hover:underline">
              Giới thiệu
            </Link>
            <Link to="/appointments" className="hover:underline">
              Đặt hẹn
            </Link>
            <Link to="/treatment-results" className="hover:underline">
              Kết quả
            </Link>

            {/* Nút Đăng nhập */}
            <Link to="/login">
              <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-200">
                Đăng nhập
              </button>
            </Link>

            {/* Nút Đăng ký */}
            <Link to="/signup">
              <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-200">
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
          <Link to="/" className="block hover:underline">Trang chủ</Link>
          <Link to="/about" className="block hover:underline">Giới thiệu</Link>
          <Link to="/appointments" className="block hover:underline">Đặt hẹn</Link>
          <Link to="/results" className="block hover:underline">Kết quả</Link>

          <Link to="/login" className="block">
            <button className="w-full text-left bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-200">
              Đăng nhập
            </button>
          </Link>

          <Link to="/signup" className="block">
            <button className="w-full text-left bg-white text-red-600 font-semibold px-4 py-2 rounded-xl hover:bg-gray-200">
              Đăng ký
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}

