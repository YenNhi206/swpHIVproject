import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Info,
  BookOpen,
  Stethoscope,
  Phone,
  MapPin,
  Calendar,
  Smartphone,
  LogIn,
  UserPlus,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  CreditCard
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Trang chủ', icon: Home },
    { path: '/about', label: 'Giới thiệu', icon: Info },
    { path: '/knowledge', label: 'Kiến thức HIV', icon: BookOpen },
    { path: '/listdoctor', label: 'Chuyên Gia - Bác Sĩ', icon: Stethoscope },
    { path: '/services', label: 'Dịch vụ - Giá tiền', icon: CreditCard },
  ];

  return (
    <header className="w-full bg-red-50 shadow">
      {/* Top section with logo + hotline */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2 flex justify-between items-start flex-col lg:flex-row">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link to="/" className="text-red-700 text-3xl font-bold no-underline">
            HIV Care+
          </Link>
          <button
            className="lg:hidden text-red-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="hidden lg:flex flex-col items-end mt-2">
          <div className="flex gap-4 text-sm text-red-800 items-center">
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>Hotline: 1900 1234</span>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>TP. Hồ Chí Minh</span>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <div className="relative inline-block">
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                HOT
              </span>
              <Link
                to="/support"
                className="flex items-center gap-2 bg-white border border-red-500 text-red-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-600 hover:text-white shadow-md transition-all"
              >
                <Smartphone className="w-5 h-5" />
                Phòng khám online
              </Link>
            </div>
            <Link
              to="/appointments"
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm flex items-center gap-1"
            >
              <Calendar className="w-4 h-4" />
              Đặt lịch khám
            </Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-gradient-to-b from-red-100 to-white border-t border-red-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop menu */}
          <div className="hidden lg:flex justify-center items-center py-3 space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 py-2 px-4 rounded-t-lg transition-colors duration-300 ${isActive(link.path)
                  ? 'text-red-700 border-b-2 border-red-700 font-semibold'
                  : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-200'
                  }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <UserIcon className="w-6 h-6 text-red-700" />
                <span className="font-semibold text-red-700">
                  {user?.fullName ? ` ${user.fullName}` : ' Người dùng'}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 py-2 px-4 rounded-t-lg transition-colors duration-300 ${isActive('/login')
                    ? 'text-red-700 border-b-2 border-red-700 font-semibold'
                    : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-200'
                    }`}
                >
                  <LogIn className="w-5 h-5" />
                  Đăng nhập
                </Link>
                <Link
                  to="/signup"
                  className={`flex items-center gap-2 py-2 px-4 rounded-t-lg transition-colors duration-300 ${isActive('/signup')
                    ? 'text-red-700 border-b-2 border-red-700 font-semibold'
                    : 'text-gray-700 hover:text-red-600 hover:border-b-2 hover:border-red-200'
                    }`}
                >
                  <UserPlus className="w-5 h-5" />
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden flex flex-col py-2 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm border-l-4 ${isActive(link.path)
                    ? 'text-red-700 border-red-500 bg-red-100 font-semibold'
                    : 'text-gray-700 border-transparent hover:bg-red-50 hover:text-red-600'
                    }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}

              {user ? (
                <div className="flex items-center gap-4 px-4 py-2 border-l-4 border-red-500 bg-red-100 font-semibold">
                  <UserIcon className="w-5 h-5 text-red-700" />
                  <span>{user?.fullName ?? 'Người dùng'}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border-l-4 border-transparent hover:bg-red-50 hover:text-red-600"
                  >
                    <LogIn className="w-4 h-4" />
                    Đăng nhập
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm border-l-4 border-transparent hover:bg-red-50 hover:text-red-600"
                  >
                    <UserPlus className="w-4 h-4" />
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
