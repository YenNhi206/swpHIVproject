import React from 'react';
import { Users, Calendar, DollarSign } from 'lucide-react';

import { Line, Bar } from 'react-chartjs-2';
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
  // Thống kê chung
  const totalUsers = 1240;
  const patientsUnderTreatment = 320;
  const appointmentsPending = 45;

  // Báo cáo tài chính giả lập
  const revenueData = [5000000, 7000000, 6500000, 8000000, 9000000, 11000000]; // theo tháng
  const costData = [3000000, 4000000, 3500000, 4500000, 5000000, 6000000]; // theo tháng

  // Tổng các số liệu
  const totalRevenue = revenueData.reduce((a, b) => a + b, 0);
  const totalCost = costData.reduce((a, b) => a + b, 0);
  const profit = totalRevenue - totalCost;

  // Label tháng
  const monthsLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];

  // Biểu đồ Line chart booking theo ngày
  const lineChartData = {
    labels: ['01/06', '02/06', '03/06', '04/06', '05/06', '06/06', '07/06'],
    datasets: [
      {
        label: 'Cuộc hẹn theo ngày',
        data: [5, 7, 4, 8, 6, 9, 7],
        borderColor: 'rgba(220, 38, 38, 1)', // Red-600
        backgroundColor: 'rgba(220, 38, 38, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Biểu đồ Bar chart booking theo tháng
  const barChartData = {
    labels: monthsLabels,
    datasets: [
      {
        label: 'Số cuộc hẹn theo tháng',
        data: [10, 15, 12, 18, 20, 25],
        backgroundColor: 'rgba(220, 38, 38, 0.6)', // Red-600
      },
    ],
  };

  // Biểu đồ Bar chart báo cáo tài chính
  const financeChartData = {
    labels: monthsLabels,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueData,
        backgroundColor: 'rgba(34, 197, 94, 0.6)', // Green-500
      },
      {
        label: 'Chi phí',
        data: costData,
        backgroundColor: 'rgba(239, 68, 68, 0.6)', // Red-500
      },
    ],
  };

  // Các option chung cho biểu đồ
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600">Trang quản trị hệ thống</h1>
          <p className="mt-2 text-lg text-gray-600">Quản lý bệnh nhân và theo dõi hoạt động</p>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in [animation-delay:0.2s]">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Tổng người dùng</p>
            <p className="text-2xl font-semibold">{totalUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Users className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Bệnh nhân đang điều trị</p>
            <p className="text-2xl font-semibold">{patientsUnderTreatment.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-500">Cuộc hẹn đang chờ</p>
            <p className="text-2xl font-semibold">{appointmentsPending.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-gray-500">Lợi nhuận tháng</p>
            <p className={`text-2xl font-semibold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profit.toLocaleString()} VNĐ
            </p>
          </div>
        </div>

        {/* Biểu đồ Line chart: Quản lý booking theo ngày */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in [animation-delay:0.3s]">
          <h2 className="text-xl font-semibold mb-4">Lịch hẹn theo ngày</h2>
          <Line
            data={lineChartData}
            options={{
              ...chartOptions,
              plugins: { ...chartOptions.plugins, title: { display: true, text: 'Lịch hẹn theo ngày (tháng 6/2025)' } },
            }}
          />
        </div>

        {/* Biểu đồ Bar chart: Booking theo tháng */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in [animation-delay:0.4s]">
          <h2 className="text-xl font-semibold mb-4">Lịch hẹn theo tháng</h2>
          <Bar
            data={barChartData}
            options={{
              ...chartOptions,
              plugins: { ...chartOptions.plugins, title: { display: true, text: 'Lịch hẹn theo tháng (2025)' } },
            }}
          />
        </div>

        {/* Biểu đồ Bar chart báo cáo tài chính */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in [animation-delay:0.5s]">
          <h2 className="text-xl font-semibold mb-4">Báo cáo tài chính theo tháng</h2>
          <Bar data={financeChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
