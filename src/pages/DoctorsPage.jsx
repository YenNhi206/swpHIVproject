import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Search, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/doctors?page=${page}&size=${size}&search=${encodeURIComponent(searchTerm)}&searchBy=name`,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!response.ok) throw new Error(`Lỗi API: ${response.status}`);
        const data = await response.json();
        setDoctors(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Lỗi khi gọi API danh sách bác sĩ:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, [page, size, searchTerm]);

  useEffect(() => {
    const fetchDoctorDetailsAndSchedule = async (doctorId) => {
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (!token) {
          setSelectedDoctor(null);
          return;
        }

        const doctorResponse = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!doctorResponse.ok) throw new Error('Không thể tải chi tiết bác sĩ');
        const doctorData = await doctorResponse.json();

        const currentDate = new Date().toISOString().split('T')[0];
        const scheduleResponse = await fetch(
          `http://localhost:8080/api/doctors/${doctorId}/schedule?date=${currentDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        if (!scheduleResponse.ok) throw new Error('Không thể tải lịch trình');
        const scheduleData = await scheduleResponse.json();
        setSelectedDoctor({ ...doctorData, schedule: scheduleData });
        setSchedule(scheduleData);
      } catch (error) {
        console.error('Lỗi khi gọi API chi tiết hoặc lịch trình:', error);
      }
    };

    if (selectedDoctor?.id && showModal) {
      fetchDoctorDetailsAndSchedule(selectedDoctor.id);
    }
  }, [selectedDoctor?.id, showModal]);

  useEffect(() => {
    const pending = JSON.parse(sessionStorage.getItem('pendingAppointment'));
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (pending && token) {
      sessionStorage.removeItem('pendingAppointment');
      navigate('/appointments', { state: { doctor: pending.doctor } });
    }
  }, [location, navigate]);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      setSelectedDoctor(null);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-3xl font-extrabold text-red-700 text-center" variants={itemVariants}>
        Chuyên gia - Bác sĩ
      </motion.h1>
      <motion.p className="text-center text-gray-600 mt-2" variants={itemVariants}>
        Đội ngũ bác sĩ hàng đầu trong lĩnh vực HIV/AIDS và bệnh truyền nhiễm
      </motion.p>

      <motion.div className="flex justify-center mt-6" variants={itemVariants}>
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm bác sĩ..."
            className="w-full border border-gray-100 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
              setSelectedDoctor(null);
            }}
          />
          <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
        </div>
      </motion.div>

      <motion.div className="space-y-6" variants={containerVariants}>
        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : doctors.length > 0 ? (
          doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer"
              variants={itemVariants}
              onClick={() => handleSelectDoctor(doctor)}
            >
              <div className="flex items-center gap-6">
                <img
                  src={doctor.imageUrl || 'https://via.placeholder.com/96'}
                  alt={doctor.fullName}
                  className="w-24 h-24 rounded-full border-4 border-red-100 object-cover"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-bold text-gray-800">{doctor.fullName}</h2>
                  <p className="text-red-600 font-medium">{doctor.specialization}</p>
                  <p className="text-gray-600">Trình độ: {doctor.qualification || 'Không có thông tin'}</p>
                  <p className="text-gray-600 line-clamp-2">{doctor.description || 'Không có mô tả'}</p>
                  <div className="text-right">
                    <Button
                      label="Đặt lịch"
                      onClick={(e) => {
                        e.stopPropagation();
                        const token = JSON.parse(localStorage.getItem('user'))?.token;
                        if (!token) {
                          sessionStorage.setItem('pendingAppointment', JSON.stringify({ doctor, from: '/doctors' }));
                          navigate('/login');
                        } else {
                          navigate('/appointments', { state: { doctor } });
                        }
                      }}
                      icon={<Calendar className="w-4 h-4" />}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không tìm thấy bác sĩ phù hợp.</p>
        )}
      </motion.div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Trước
        </button>
        <span className="px-4 py-2 bg-gray-100">
          Trang {page + 1} / {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r-lg hover:bg-gray-300 disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {showModal && selectedDoctor && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative border border-gray-200">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedDoctor.imageUrl || 'https://via.placeholder.com/100'}
                alt={selectedDoctor.fullName}
                className="w-24 h-24 rounded-full border-4 border-red-200 object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold text-red-700">{selectedDoctor.fullName}</h2>
                <p className="text-gray-600">{selectedDoctor.specialization}</p>
              </div>
            </div>

            <p><strong>Trình độ:</strong> {selectedDoctor.qualification || 'Không rõ'}</p>
            <p><strong>Mô tả:</strong> {selectedDoctor.description || 'Không có mô tả'}</p>
            <p><strong>Điện thoại:</strong> {selectedDoctor.phoneNumber || 'Không có'}</p>
            <p><strong>Email:</strong> {selectedDoctor.email || 'Không có'}</p>
            <p><strong>Địa chỉ:</strong> {selectedDoctor.address || 'Không có'}</p>
            <div className="mt-4">
              <h4 className="font-semibold">Lịch trình:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {(schedule || []).map((sch, i) => (
                  <li key={i}>{sch.date} - {sch.timeSlots.join(', ')}</li>
                ))}
              </ul>
            </div>
            <div className="text-right mt-4">
              <Button
                label="Đặt lịch"
                onClick={() => {
                  setShowModal(false);
                  const token = JSON.parse(localStorage.getItem('user'))?.token;
                  if (!token) {
                    sessionStorage.setItem('pendingAppointment', JSON.stringify({ doctor: selectedDoctor, from: '/doctors' }));
                    navigate('/login');
                  } else {
                    navigate('/appointments', { state: { doctor: selectedDoctor } });
                  }
                }}
                icon={<Calendar className="w-4 h-4" />}
              />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
