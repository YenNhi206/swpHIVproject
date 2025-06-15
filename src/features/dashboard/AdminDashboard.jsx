import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, FileText, Calendar, Info } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [patients, setPatients] = useState([]);
  const [filterPaid, setFilterPaid] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data bệnh nhân
  const mockPatients = [
    { id: 1, name: 'Nguyễn Văn A', appointmentDate: '2025-06-01', paid: true },
    { id: 2, name: 'Trần Thị B', appointmentDate: '2025-06-02', paid: false },
    { id: 3, name: 'Lê Văn C', appointmentDate: '2025-06-03', paid: true },
    { id: 4, name: 'Phạm Thị D', appointmentDate: '2025-06-04', paid: false },
  ];

  const bookings = [
    { doctorId: 1, patientId: 1, date: '2025-06-01' },
    { doctorId: 1, patientId: 2, date: '2025-06-10' },
    { doctorId: 2, patientId: 3, date: '2025-06-15' },
    { doctorId: 3, patientId: 4, date: '2025-06-20' },
    { doctorId: 2, patientId: 1, date: '2025-06-25' },
    { doctorId: 1, patientId: 3, date: '2025-06-30' },
  ];

  const hivDoctors = [
    { id: 1, name: 'Dr. Trần Thị B', specialty: 'HIV/AIDS' },
    { id: 2, name: 'Dr. Nguyễn Văn H', specialty: 'HIV/AIDS' },
    { id: 3, name: 'Dr. Lê Thị M', specialty: 'HIV/AIDS' },
    { id: 4, name: 'Dr. Lê Thị N', specialty: 'HIV/AIDS' },
    { id: 5, name: 'Dr. Trần Văn A', specialty: 'HIV/AIDS' },
  ];

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const doctorsWithBookingCount = hivDoctors
    .map((doctor) => {
      const count = bookings.filter((b) => {
        if (b.doctorId !== doctor.id) return false;
        const d = new Date(b.date);
        return d.getFullYear() === year && d.getMonth() + 1 === month;
      }).length;
      return { ...doctor, bookingCount: count };
    })
    .sort((a, b) => b.bookingCount - a.bookingCount);

  const filteredPatients = patients.filter((p) => {
    if (filterPaid === 'paid') return p.paid;
    if (filterPaid === 'unpaid') return !p.paid;
    return true;
  });

  const chartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Số cuộc hẹn',
        data: [10, 15, 12, 18, 20, 25],
        backgroundColor: 'rgba(220, 38, 38, 0.6)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Tần suất lịch khám (2025)' },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600">
            Trang quản trị hệ thống
          </h1>
          <p className="mt-2 text-lg text-gray-600">Quản lý bệnh nhân và theo dõi hoạt động</p>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in [animation-delay:0.2s]">
          <SummaryCard icon={<Users className="w-8 h-8 text-red-500 mx-auto mb-2" />} title="Tổng người dùng" value="1,240" />
          <SummaryCard icon={<UserPlus className="w-8 h-8 text-red-500 mx-auto mb-2" />} title="Bệnh nhân đang điều trị" value="320" />
          <SummaryCard icon={<Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />} title="Cuộc hẹn chờ duyệt" value="45" />
        </div>

        {/* Biểu đồ + danh sách bác sĩ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in [animation-delay:0.3s]">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-y-auto max-h-[400px]">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Danh sách bác sĩ HIV và booking tháng {month}
            </h2>
            <ul className="space-y-2">
              {doctorsWithBookingCount.map((doctor) => (
                <li key={doctor.id} className="border p-3 rounded-lg hover:bg-gray-50 flex justify-between items-center">
                  <div>{doctor.name} - {doctor.specialty}</div>
                  <div className="font-semibold text-red-600">{doctor.bookingCount} booking</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quản lý bệnh nhân */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in [animation-delay:0.4s]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Quản lý bệnh nhân và thanh toán</h2>
          </div>

          <div className="mb-6">
            <label className="mr-2 font-semibold text-gray-700">Lọc theo trạng thái thanh toán:</label>
            <select className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-red-500" value={filterPaid} onChange={(e) => setFilterPaid(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="paid">Đã thanh toán</option>
              <option value="unpaid">Chưa thanh toán</option>
            </select>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="py-3 px-4 text-left">Tên bệnh nhân</th>
                  <th className="py-3 px-4 text-left">Ngày đặt lịch</th>
                  <th className="py-3 px-4 text-left">Trạng thái thanh toán</th>
                  <th className="py-3 px-4 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.length === 0 ? (
                  <tr><td colSpan="4" className="text-center py-4 text-gray-500">Không có dữ liệu</td></tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{patient.name}</td>
                      <td className="py-3 px-4">{patient.appointmentDate}</td>
                      <td className={`py-3 px-4 font-semibold ${patient.paid ? 'text-green-600' : 'text-red-600'}`}>
                        {patient.paid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </td>
                      <td className="py-3 px-4">
                        <Link to={`/patients/${patient.id}`} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          <Info className="w-4 h-4" /> Xem chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const SummaryCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
    {icon}
    <p className="text-gray-500">{title}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);
