
import { Users } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [overview, setOverview] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const res = await fetch("http://localhost:8080/api/admin/overview", {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`Lỗi tải dữ liệu: ${res.status}`);
        const data = await res.json();
        setOverview(data);
      } catch (e) {
        setError(e.message || "Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="text-red-600">Lỗi: {error}</div>;
  if (!overview) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600">Trang quản trị hệ thống</h1>
          <p className="mt-2 text-lg text-gray-600">Quản lý bệnh nhân và theo dõi hoạt động</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 animate-fade-in [animation-delay:0.2s]">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Tổng người dùng</p>
            <p className="text-2xl font-semibold">{overview.totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Bệnh nhân mới tháng này</p>
            <p className="text-2xl font-semibold">{overview.newPatientsThisMonth.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Bác sĩ đang hoạt động</p>
            <p className="text-2xl font-semibold">{overview.activeDoctors.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Nhân viên đang hoạt động</p>
            <p className="text-2xl font-semibold">{overview.activeStaff.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Tỉ lệ tăng trưởng người dùng</p>
            <p className="text-2xl font-semibold">{(overview.userGrowthRate * 100).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}