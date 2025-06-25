import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Search, X, Mail, MapPin } from 'lucide-react';
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/doctors?page=${page}&size=${size}&search=${encodeURIComponent(searchTerm)}&searchBy=name`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Không thể tải danh sách bác sĩ');
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
          setSelectedDoctor(null); // Đóng modal nếu không có token
          navigate('/login', { state: { from: `/doctors/${doctorId}` } }); // Lưu vị trí
          return;
        }
        // Lấy chi tiết bác sĩ
        const doctorResponse = await fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!doctorResponse.ok) {
          if (doctorResponse.status === 401) {
            navigate('/login', { state: { from: `/doctors/${doctorId}` } });
          }
          throw new Error('Không thể tải chi tiết bác sĩ');
        }
        const doctorData = await doctorResponse.json();

        // Lấy lịch trình của bác sĩ cho ngày hiện tại
        const currentDate = new Date().toISOString().split('T')[0];
        const scheduleResponse = await fetch(`http://localhost:8080/api/doctors/${doctorId}/schedule?date=${currentDate}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!scheduleResponse.ok) {
          if (scheduleResponse.status === 401) {
            navigate('/login', { state: { from: `/doctors/${doctorId}` } });
          }
          throw new Error('Không thể tải lịch trình');
        }
        const scheduleData = await scheduleResponse.json();
        setSelectedDoctor({ ...doctorData, schedule: scheduleData });
        setSchedule(scheduleData);
      } catch (error) {
        console.error('Lỗi khi gọi API chi tiết hoặc lịch trình:', error);
      }
    };
    if (selectedDoctor && selectedDoctor.id) {
      fetchDoctorDetailsAndSchedule(selectedDoctor.id);
    }
  }, [selectedDoctor?.id, navigate]);

  useEffect(() => {
    // Kiểm tra và xử lý quay lại từ đăng nhập
    const pending = JSON.parse(sessionStorage.getItem('pendingAppointment'));
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    if (pending && token) {
      sessionStorage.removeItem('pendingAppointment'); // Xóa sau khi xử lý
      navigate('/appointments', { state: { doctor: pending.doctor } });
    }
  }, [location, navigate]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (doctor) => {
    const token = JSON.parse(localStorage.getItem('user'))?.token;
    console.log('Token khi đặt lịch:', token); // Debug token
    if (!token) {
      // Lưu thông tin bác sĩ và vị trí vào sessionStorage
      sessionStorage.setItem('pendingAppointment', JSON.stringify({ doctor, from: '/doctors' }));
      navigate('/login');
    } else {
      navigate('/appointments', { state: { doctor } });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-extrabold text-red-700 text-center"
        variants={itemVariants}
      >
        Chuyên gia - Bác sĩ
      </motion.h1>
      <motion.p
        className="text-center text-gray-600 mt-2"
        variants={itemVariants}
      >
        Đội ngũ bác sĩ hàng đầu trong lĩnh vực HIV/AIDS và bệnh truyền nhiễm
      </motion.p>

      {/* Search Bar */}
      <motion.div
        className="flex justify-center mt-6"
        variants={itemVariants}
      >
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Tìm kiếm bác sĩ..."
            className="w-full border border-gray-100 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0); // Reset về trang 0 khi tìm kiếm
            }}
          />
          <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
        </div>
      </motion.div>

      {/* Doctor List */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
      >
        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedDoctor(doctor)}
            >
              <motion.img
                src={doctor.imageUrl || 'https://via.placeholder.com/96'} // Giả định nếu không có imageUrl
                alt={doctor.fullName}
                className="w-24 h-24 rounded-full border-4 border-red-100 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{doctor.fullName}</h2>
                <p className="text-red-600 font-medium">{doctor.specialization}</p>
                <p className="text-gray-600">Trình độ: {doctor.qualification || 'Không có thông tin'}</p>
                <p className="text-gray-600 line-clamp-2 mt-1">{doctor.description || 'Không có mô tả'}</p>
              </div>
              <Button
                label="Đặt lịch"
                onClick={(e) => {
                  e.stopPropagation();
                  handleBookAppointment(doctor);
                }}
                icon={<Calendar className="w-4 h-4" />}
              />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">Không tìm thấy bác sĩ phù hợp.</p>
        )}
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
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

      {/* Modal */}
      {selectedDoctor && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <img
                  src={selectedDoctor.imageUrl || 'https://via.placeholder.com/96'}
                  alt={selectedDoctor.fullName}
                  className="w-24 h-24 rounded-full border-4 border-red-100 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.fullName}</h2>
                  <p className="text-red-600 font-medium">{selectedDoctor.specialization}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.workplace || 'Không có thông tin'}</p>
                </div>
              </div>
              <p className="text-gray-700">{selectedDoctor.description || 'Không có mô tả'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Liên hệ:</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {selectedDoctor.phoneNumber || 'Không có số điện thoại'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {selectedDoctor.email || 'Không có email'}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {selectedDoctor.address || 'Không có địa chỉ'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Bằng cấp:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {(selectedDoctor.certifications || []).map((cert, i) => (
                      <li key={i}>{cert}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold text-gray-800 mt-2 mb-1">Lịch trình:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {(schedule || []).map((sch, i) => (
                      <li key={i}>{sch.date} - {sch.timeSlots.join(', ')}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-right">
                <Button
                  label="Đặt lịch hẹn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookAppointment(selectedDoctor);
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}