import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    User,
    LogOut,
    Home,
    Calendar,
    Users,
    BarChart,
    FileText,
    AlertTriangle,
    DollarSign,
    BookOpen,
    PlusCircle,
} from "lucide-react";

export default function SidebarVertical({ user, handleLogout }) {
    const location = useLocation();
    const [showLogout, setShowLogout] = useState(false);

    if (!user || user.role === "PATIENT") {
        return null; // Ẩn sidebar cho patient hoặc chưa đăng nhập
    }

    const isActive = (path) => location.pathname === path;

    // Menu sidebar theo role
    const sidebarLinks = [];

    if (user.role === "ADMIN") {
        sidebarLinks.push(
            { path: "/admin", label: "Trang chủ Admin", icon: Home },
            { path: "/admin/accounts", label: "Quản lý tài khoản", icon: Users },
            { path: "/admin/finance", label: "Quản lý tài chính", icon: DollarSign },
            { path: "/admin/statistics", label: "Báo cáo thống kê", icon: BarChart },
            { path: "/admin/blogs", label: "Quản lý bài viết", icon: BookOpen }
        );
    }

    if (user.role === "DOCTOR") {
        sidebarLinks.push(
            { path: "/doctor", label: "Trang Bác sĩ", icon: Home },
            { path: "/doctor/patientappointments", label: "Lịch hẹn bệnh nhân", icon: Calendar },
            { path: "/doctor/patientlists", label: "Danh sách bệnh nhân", icon: Users },
            { path: "/doctor/treatment", label: "Phác đồ điều trị", icon: FileText },
            { path: "/doctor/alerts", label: "Cảnh báo", icon: AlertTriangle }
        );
    }

    if (user.role === "STAFF") {
        sidebarLinks.push(
            { path: "/staff", label: "Trang Nhân viên", icon: Home },
            { path: "/staff/appointments", label: "Quản lý lịch hẹn", icon: Calendar },
            { path: "/staff/testsmanagement", label: "Quản lý kết quả", icon: Users },
            { path: "/staff/listpatients", label: "Danh sách bệnh nhân", icon: Users }

        );
    }

    const toggleLogout = () => setShowLogout((prev) => !prev);

    return (
        <div className="h-screen w-64 bg-red-50 shadow-lg flex flex-col p-4 fixed left-0 top-0 z-30">
            <h2 className="text-red-700 text-2xl font-bold mb-6">HIV Care+</h2>

            <div className="flex flex-col gap-3 flex-1">
                {sidebarLinks.map(({ path, label, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive(path)
                            ? "bg-red-200 text-red-700 font-bold"
                            : "text-gray-700 hover:bg-red-100"
                            }`}
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </Link>
                ))}
            </div>

            {/* User info + nút đăng xuất */}
            <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={toggleLogout}
                title="Click để hiển thị / ẩn đăng xuất"
            >
                <User className="w-6 h-6 text-red-700" />
                <span className="font-medium text-red-700">{user.fullName}</span>

                {showLogout && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLogout();
                        }}
                        className="ml-auto flex items-center gap-1 text-red-600 hover:underline text-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        Đăng xuất
                    </button>
                )}
            </div>
        </div>
    );
}
