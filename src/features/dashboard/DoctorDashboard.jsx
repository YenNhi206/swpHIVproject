import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Users,
  AlertTriangle,
  RefreshCw,
  Activity,
  HeartPulse,
  ClipboardList,
} from 'lucide-react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
dayjs.locale('vi');

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // Fake patients, alerts, treatment data
  const patients = [
    { id: 1, name: 'Nguyễn Văn B' },
    { id: 2, name: 'Trần Thị C' },
    { id: 3, name: 'Phạm Văn D' },
  ];

  const alerts = [
    { id: 1, patient: 'Nguyễn Văn B', message: 'Chưa lấy thuốc (5 ngày trễ)', action: 'Liên hệ' },
    { id: 2, patient: 'Trần Thị C', message: 'Cần xét nghiệm VL', action: 'Xem chi tiết' },
    { id: 3, patient: 'Phạm Văn D', message: 'Kết quả CD4 giảm', action: 'Xem hồ sơ' },
  ];

  const treatmentRegimens = ['TDF + 3TC + DTG', 'AZT + 3TC + EFV', 'ABC + 3TC + LPV/r', 'NVP + 3TC + AZT'];

  // Slot cấu hình
  const SLOTS_PER_DAY = 8;

  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8;
    for (let i = 0; i < SLOTS_PER_DAY; i++) {
      const start = `${(startHour + i).toString().padStart(2, '0')}:00`;
      const end = `${(startHour + i + 1).toString().padStart(2, '0')}:00`;
      slots.push({ id: i + 1, time: `${start} - ${end}`, bookings: [] });
    }
    return slots;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    if (dateStr === '2025-06-13') {
      return [
        { id: 1, time: '09:00', patient: 'Nguyễn Văn B', purpose: 'Khám định kỳ' },
        { id: 2, time: '10:30', patient: 'Trần Thị C', purpose: 'Cập nhật phác đồ' },
        { id: 3, time: '13:00', patient: 'Phạm Văn D', purpose: 'Tư vấn uống thuốc' },
      ];
    } else if (dateStr === '2025-06-14') {
      return [
        { id: 4, time: '08:00', patient: 'Lê Thị E', purpose: 'Xét nghiệm định kỳ' },
        { id: 5, time: '14:00', patient: 'Ngô Văn F', purpose: 'Tư vấn thuốc mới' },
      ];
    } else {
      return [];
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchedAppointments = getAppointmentsForDate(selectedDate);
    const updatedSlots = generateTimeSlots().map((slot) => {
      const slotStartHour = parseInt(slot.time.split(':')[0]);
      const slotAppointments = fetchedAppointments.filter((appt) => {
        const apptHour = parseInt(appt.time.split(':')[0]);
        return apptHour === slotStartHour;
      });
      return { ...slot, bookings: slotAppointments };
    });

    setAppointments(fetchedAppointments);
    setSlots(updatedSlots);
    setIsLoading(false);
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-8">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Tiêu đề */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-red-700 mb-2 tracking-wide">Bảng Điều Khiển Bác Sĩ</h1>
          <p className="text-gray-500 text-lg">Theo dõi và quản lý điều trị HIV</p>
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Lịch hẹn hôm nay", value: appointments.length, icon: <Calendar className="w-5 h-5" /> },
            { label: "Bệnh nhân", value: patients.length, icon: <Users className="w-5 h-5" /> },
            { label: "Cảnh báo", value: alerts.length, icon: <AlertTriangle className="w-5 h-5" /> },
            { label: "Phác đồ", value: treatmentRegimens.length, icon: <ClipboardList className="w-5 h-5" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
              <div className="flex items-center gap-2 text-red-600">{item.icon} {item.label}</div>
              <p className="text-2xl font-bold mt-1 text-gray-800">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Lịch hẹn */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-600">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-red-700 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Lịch Hẹn Trong Ngày
            </h2>
            <DatePicker
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              format="DD/MM/YYYY"
              className="border border-red-400 rounded px-3 py-1"
            />
          </div>

          {isLoading ? (
            <p>Đang tải...</p>
          ) : slots.every(slot => slot.bookings.length === 0) ? (
            <p className="text-gray-500 italic">Không có lịch hẹn cho ngày này.</p>
          ) : (
            <div className="space-y-3">
              {slots.filter(slot => slot.bookings.length > 0).map(slot => (
                <div
                  key={slot.id}
                  className="p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition"
                >
                  <p className="font-semibold text-red-700 mb-2">
                    Slot {slot.id} ({slot.time}) - {slot.bookings.length} cuộc hẹn
                  </p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {slot.bookings.map(appt => (
                      <li key={appt.id} className="flex justify-between">
                        <span>{appt.time} - {appt.patient}</span>
                        <span className="italic text-gray-500">{appt.purpose}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Phác đồ và Bệnh nhân */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phác đồ */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" />
              Phác Đồ Điều Trị
            </h2>
            <ul className="space-y-2 text-gray-700">
              {treatmentRegimens.map((r, i) => (
                <li key={i} className="p-2 bg-gray-100 rounded">{r}</li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/treatment')}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Tùy chỉnh phác đồ
            </button>
          </section>

          {/* Bệnh nhân */}
          <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-red-500" />
              Bệnh Nhân Đang Điều Trị
            </h2>
            <ul className="space-y-3 text-gray-700">
              {patients.map((patient) => (
                <li key={patient.id} className="flex justify-between border-b pb-2 hover:bg-gray-50">
                  <span>{patient.name}</span>
                  <button
                    onClick={() => navigate(`/patients/${patient.id}`)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Xem hồ sơ
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Cảnh báo */}
        <section className="bg-white rounded-2xl shadow-lg p-6 border border-red-200">
          <h2 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Cảnh Báo & Nhắc Nhở
          </h2>
          <ul className="space-y-3 text-gray-700">
            {alerts.map((alert) => (
              <li key={alert.id} className="flex items-center justify-between border-b pb-2 hover:bg-gray-50">
                <span>{alert.patient} - {alert.message}</span>
                <button
                  onClick={() => navigate(`/patients/${alert.id}`)}
                  className="text-sm text-red-600 hover:underline"
                >
                  {alert.action}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate('/alerts')}
            className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RefreshCw className="w-5 h-5 inline mr-2" />
            Cập nhật cảnh báo
          </button>
        </section>
      </div>
    </div>
  );
}
