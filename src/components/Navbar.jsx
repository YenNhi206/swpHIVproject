import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home, Info, BookOpen, Stethoscope, Phone, MapPin, Calendar,
  Smartphone, LogIn, UserPlus, LogOut, User as UserIcon, CreditCard
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleUserClick = () => {
    switch (user?.role) {
      case 'ADMIN': navigate('/admin'); break;
      case 'DOCTOR': navigate('/doctor'); break;
      case 'STAFF': navigate('/staff'); break;
      default: navigate('/patient');
    }
  };

  const navLinks = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/about', label: 'Giới thiệu', icon: Info },
    { path: '/knowledge', label: 'Kiến thức HIV', icon: BookOpen },
    { path: '/listdoctor', label: 'Chuyên Gia - Bác Sĩ', icon: Stethoscope },
    { path: '/services', label: 'Dịch vụ - Giá tiền', icon: CreditCard },
  ];

  return (
    <motion.header
      className="w-full bg-gradient-to-r from-red-500 via-red-600 to-purple-600 backdrop-blur-md bg-opacity-90 shadow-lg"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 text-white">

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link to="/" className="text-2xl font-extrabold tracking-wide whitespace-nowrap">
              HIV Care+
            </Link>
            <div className="hidden md:flex gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>TP. Hồ Chí Minh</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {(!user || user.role === 'PATIENT') && (
              <>
                <Link
                  to="/support"
                  className="relative inline-flex items-center gap-1 bg-white text-red-600 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
                >
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                    HOT
                  </span>
                  <Smartphone className="w-4 h-4" />
                  Online
                </Link>
                <Link
                  to="/appointments"
                  className="bg-white text-red-600 font-semibold text-sm px-3 py-1.5 rounded-lg hover:bg-red-100 transition flex items-center gap-1"
                >
                  <Calendar className="w-4 h-4" />
                  Đặt khám
                </Link>
              </>
            )}
            {user && (
              <div className="flex items-center gap-3 cursor-pointer" onClick={handleUserClick}>
                <UserIcon className="w-5 h-5" />
                <span className="text-sm font-medium max-w-[200px] overflow-x-auto whitespace-nowrap">
                  {user?.fullName || 'Người dùng'}
                </span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="bg-white text-red-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="w-4 h-4 inline-block mr-1" />
                  Đăng xuất
                </motion.button>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-4 flex flex-wrap justify-center gap-3 md:gap-4">
          {user?.role === 'ADMIN' && (
            <TabLink to="/admin" label="Quản trị" icon={UserIcon} active={isActive('/admin')} />
          )}
          {user?.role === 'DOCTOR' && (
            <TabLink to="/doctor" label="Bác sĩ" icon={UserIcon} active={isActive('/doctor')} />
          )}
          {user?.role === 'STAFF' && (
            <TabLink to="/staff" label="Nhân viên" icon={UserIcon} active={isActive('/staff')} />
          )}
          {(!user || user.role === 'PATIENT') &&
            navLinks.map(link => (
              <TabLink key={link.path} to={link.path} label={link.label} icon={link.icon} active={isActive(link.path)} />
            ))
          }
          {!user && (
            <>
              <TabLink to="/login" label="Đăng nhập" icon={LogIn} active={isActive('/login')} />
              <TabLink to="/signup" label="Đăng ký" icon={UserPlus} active={isActive('/signup')} />
            </>
          )}
        </nav>
      </div>
    </motion.header>

  );
}

function TabLink({ to, label, icon: Icon, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 text-sm md:text-base rounded-lg transition
        ${active
          ? 'bg-white text-red-600 font-bold shadow'
          : 'text-white hover:bg-white/20 font-semibold'}
      `}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="truncate max-w-[160px]">{label}</span>
    </Link>
  );
}

