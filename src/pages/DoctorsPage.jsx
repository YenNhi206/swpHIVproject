import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Phone, Search, X, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: 'GS.TS.BS. Nguyễn Văn A',
        specialty: 'Nội khoa',
        experience: '10 năm',
        phone: '0901234567',
        email: 'nguyenvana@hospital.vn',
        address: '123 Nguyễn Trãi, Quận 5, TP.HCM',
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        description: 'Chuyên gia nội khoa, điều trị bệnh mãn tính và cấp cứu.',
        certifications: ['Đại học Y Dược TP.HCM', 'Chứng chỉ nội khoa nâng cao'],
        workplace: 'Bệnh viện Nhiệt Đới TP.HCM',
      },
      {
        id: 2,
        name: 'PGS.TS.BS. Trần Thị B',
        specialty: 'HIV/AIDS',
        experience: '8 năm',
        phone: '0912345678',
        email: 'tranthib@hospital.vn',
        address: '75 Hai Bà Trưng, Quận 1, TP.HCM',
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        description: 'Chuyên gia HIV/AIDS, tận tâm đồng hành cùng bệnh nhân.',
        certifications: ['Thạc sĩ y tế công cộng', 'Chứng chỉ điều trị ARV'],
        workplace: 'UNAIDS Việt Nam',
      },
      {
        id: 3,
        name: 'PGS.TS. Lê Văn C',
        specialty: 'Truyền nhiễm',
        experience: '12 năm',
        phone: '0923456789',
        email: 'levanc@hospital.vn',
        address: '45 Lê Lợi, Quận 3, TP.HCM',
        image: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
        description: 'Kinh nghiệm dày dặn trong xử lý các ca nhiễm virus.',
        certifications: ['BSCK I Truyền nhiễm', 'Chứng chỉ phòng chống dịch'],
        workplace: 'Viện Pasteur TP.HCM',
      },
    ];
    setDoctors(mockDoctors);
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (doctor) => {
    navigate('/appointments', { state: { doctor } });
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
        </div>
      </motion.div>

      {/* Doctor List */}
      <motion.div
        className="space-y-6"
        variants={containerVariants}
      >
        {filteredDoctors.length > 0 ? (
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
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full border-4 border-red-100 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                <p className="text-red-600 font-medium">{doctor.specialty}</p>
                <p className="text-gray-600">Kinh nghiệm: {doctor.experience}</p>
                <p className="text-gray-600 line-clamp-2 mt-1">{doctor.description}</p>
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
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-24 h-24 rounded-full border-4 border-red-100 object-cover"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                  <p className="text-red-600 font-medium">{selectedDoctor.specialty}</p>
                  <p className="text-sm text-gray-600">{selectedDoctor.workplace}</p>
                </div>
              </div>
              <p className="text-gray-700">{selectedDoctor.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Liên hệ:</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {selectedDoctor.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail className="w-4 h-4" /> {selectedDoctor.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {selectedDoctor.address}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Bằng cấp:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {selectedDoctor.certifications.map((cert, i) => (
                      <li key={i}>{cert}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-right">
                <Button
                  label="Đặt lịch hẹn"
                  onClick={() => handleBookAppointment(selectedDoctor)}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}