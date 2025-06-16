import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, Calendar } from 'lucide-react';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. Nguyễn Văn A',
        specialty: 'Nội khoa',
        experience: '10 năm',
        phone: '0901234567',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        description:
          'Chuyên gia nội khoa với hơn 10 năm kinh nghiệm, chuyên điều trị các bệnh mãn tính và cấp cứu.',
      },
      {
        id: 2,
        name: 'Dr. Trần Thị B',
        specialty: 'HIV/AIDS',
        experience: '8 năm',
        phone: '0912345678',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        description:
          'Bác sĩ chuyên sâu HIV/AIDS, tận tâm hỗ trợ bệnh nhân trong quá trình điều trị và phục hồi.',
      },
      {
        id: 3,
        name: 'Dr. Lê Văn C',
        specialty: 'Truyền nhiễm',
        experience: '12 năm',
        phone: '0923456789',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
        description:
          'Có nhiều năm kinh nghiệm trong lĩnh vực truyền nhiễm, đặc biệt là các bệnh lý liên quan đến virus.',
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
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-red-600 text-center">
          Đội ngũ Chuyên gia Bác sĩ
        </h1>
        <p className="text-center text-gray-600">
          Đội ngũ chuyên gia giàu kinh nghiệm, tận tâm chăm sóc sức khỏe HIV/AIDS
        </p>

        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm bác sĩ theo tên..."
              className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-red-200 flex-shrink-0"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
                  <p className="text-red-600 font-medium">{doctor.specialty}</p>
                  <p className="text-gray-600 mt-1">Kinh nghiệm: {doctor.experience}</p>
                  <p className="text-gray-600 mt-2">{doctor.description}</p>
                  <p className="text-gray-500 mt-2 flex items-center gap-1">
                    <Phone className="w-4 h-4" /> {doctor.phone}
                  </p>
                </div>
                <button
                  onClick={() => handleBookAppointment(doctor)}
                  className="ml-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 flex items-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Đặt lịch
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Không tìm thấy bác sĩ phù hợp</p>
          )}
        </div>
      </div>
    </div>
  );
}
