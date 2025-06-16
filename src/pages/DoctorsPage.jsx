import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Calendar, Phone, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. Nguyễn Văn A',
        specialty: 'Nội khoa',
        experience: '10 năm',
        phone: '0901234567',
        email: 'nguyenvana@hospital.vn',
        address: '123 Nguyễn Trãi, Quận 5, TP.HCM',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        description:
          'Chuyên gia nội khoa với hơn 10 năm kinh nghiệm, điều trị các bệnh mãn tính và cấp cứu.',
        certifications: ['Đại học Y Dược TP.HCM', 'Chứng chỉ nội khoa nâng cao'],
        workplace: 'Bệnh viện Nhiệt Đới TP.HCM',
      },
      {
        id: 2,
        name: 'Dr. Trần Thị B',
        specialty: 'HIV/AIDS',
        experience: '8 năm',
        phone: '0912345678',
        email: 'tranthib@hospital.vn',
        address: '75 Hai Bà Trưng, Quận 1, TP.HCM',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        description:
          'Chuyên gia HIV/AIDS, tận tâm đồng hành cùng người nhiễm trong quá trình điều trị.',
        certifications: ['Thạc sĩ y tế công cộng', 'Chứng chỉ điều trị ARV'],
        workplace: 'UNAIDS Việt Nam',
      },
      {
        id: 3,
        name: 'Dr. Lê Văn C',
        specialty: 'Truyền nhiễm',
        experience: '12 năm',
        phone: '0923456789',
        email: 'levanc@hospital.vn',
        address: '45 Lê Lợi, Quận 3, TP.HCM',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
        description:
          'Kinh nghiệm dày dặn trong truyền nhiễm, xử lý tốt các ca nhiễm virus phức tạp.',
        certifications: ['BSCK I Truyền nhiễm', 'Chứng chỉ phòng chống dịch bệnh'],
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-red-600 text-center">Đội ngũ Bác sĩ</h1>
        <p className="text-center text-gray-600">
          Các chuyên gia hàng đầu trong lĩnh vực HIV/AIDS và bệnh truyền nhiễm
        </p>

        {/* Search Bar */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md mb-6">
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ..."
              className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Doctor List */}
        <div className="space-y-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-6 hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full border-4 border-red-200 object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                  <p className="text-red-600 font-medium">{doctor.specialty}</p>
                  <p className="text-gray-600">Kinh nghiệm: {doctor.experience}</p>
                  <p className="text-gray-600 line-clamp-2 mt-1">{doctor.description}</p>
                  <p className="text-sm text-gray-500 mt-1">📞 {doctor.phone}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn mở modal khi click vào nút
                    handleBookAppointment(doctor);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Đặt lịch
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Không tìm thấy bác sĩ phù hợp.</p>
          )}
        </div>
      </div>

      {/* Modal hiển thị chi tiết bác sĩ */}
      <Dialog open={!!selectedDoctor} onClose={() => setSelectedDoctor(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            {selectedDoctor && (
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    className="w-24 h-24 rounded-full border-4 border-red-200 object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedDoctor.name}</h2>
                    <p className="text-red-600 font-medium">{selectedDoctor.specialty}</p>
                    <p className="text-sm text-gray-500">{selectedDoctor.workplace}</p>
                  </div>
                </div>

                <p className="text-gray-700">{selectedDoctor.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Liên hệ:</h4>
                    <p className="text-sm text-gray-600">📞 {selectedDoctor.phone}</p>
                    <p className="text-sm text-gray-600">📧 {selectedDoctor.email}</p>
                    <p className="text-sm text-gray-600">📍 {selectedDoctor.address}</p>
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
                  <button
                    onClick={() => handleBookAppointment(selectedDoctor)}
                    className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Đặt lịch hẹn
                  </button>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
