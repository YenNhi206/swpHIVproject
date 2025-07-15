import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertCircle,
  User,
  Stethoscope,
  Calendar,
  ArrowLeft,
} from 'lucide-react';
import Button from '../../components/Button';

export default function ResultPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const patientId = localStorage.getItem('patientId');
        const res = await fetch(`http://localhost:8080/api/test-results/patient/${patientId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
          },
        });
        if (!res.ok) throw new Error('Lỗi khi tải dữ liệu');
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) throw new Error('Không có kết quả xét nghiệm');

        const latest = data[data.length - 1];

        setResult({
          id: latest.id,
          patientId: latest.patientId,
          patientName: latest.patientName,
          doctorId: latest.doctorId,
          doctorName: latest.doctorName,
          testCategoryId: latest.testCategoryId,
          testCategoryName: latest.testCategoryName,
          appointmentId: latest.appointmentId,
          status: latest.status,
          resultValue: latest.resultValue,
          resultNote: latest.resultNote,
          createdAt: latest.createdAt,
          updatedAt: latest.updatedAt,
          resultDate: latest.resultDate,
        });
      } catch (err) {
        console.error(err);
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-10 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-red-600 mb-8 text-center"
        variants={itemVariants}
      >
        Kết quả điều trị
      </motion.h1>

      <motion.div className="bg-white rounded-2xl shadow-lg p-8" variants={itemVariants}>
        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : !result ? (
          <p className="text-center text-red-500">Không tìm thấy kết quả.</p>
        ) : (
          <div className="space-y-8">
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Thông tin cơ bản</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <User className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">Bệnh nhân</p>
                    <p className="text-lg text-gray-800">{result.patientName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <Stethoscope className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">Bác sĩ phụ trách</p>
                    <p className="text-lg text-gray-800">{result.doctorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
                  <Calendar className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase">Ngày xét nghiệm</p>
                    <p className="text-lg text-gray-800">{result.resultDate?.slice(0, 10)}</p>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Thông tin chi tiết</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 font-semibold">Mã kết quả</p>
                  <p className="text-gray-800">{result.id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 font-semibold">Loại xét nghiệm</p>
                  <p className="text-gray-800">{result.testCategoryName} (#{result.testCategoryId})</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 font-semibold">Mã lịch hẹn</p>
                  <p className="text-gray-800">{result.appointmentId}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 font-semibold">Ngày tạo</p>
                  <p className="text-gray-800">{result.createdAt?.slice(0, 10)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-500 font-semibold">Ngày cập nhật</p>
                  <p className="text-gray-800">{result.updatedAt?.slice(0, 10)}</p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Kết quả xét nghiệm</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                  <p className="font-semibold text-red-600 text-lg">CD4</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{result.resultValue}</p>
                </div>
                <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
                  <p className="font-semibold text-red-600 text-lg">Tải lượng virus</p>
                  <p className="text-xl font-bold text-gray-900 mt-2">{result.resultNote}</p>
                </div>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-red-600 mb-4">Đánh giá tổng quan</h2>
              <div className="flex items-center gap-3">
                {result.status === 'Đáp ứng tốt' ? (
                  <CheckCircle className="text-green-600" size={28} />
                ) : (
                  <AlertCircle className="text-yellow-500" size={28} />
                )}
                <p className="text-lg font-medium text-gray-800">
                  <strong>Trạng thái:</strong>{' '}
                  <span className={result.status === 'Đáp ứng tốt' ? 'text-green-600' : 'text-yellow-600'}>
                    {result.status}
                  </span>
                </p>
              </div>
            </motion.section>

            <motion.section className="flex justify-center" variants={containerVariants}>
              <Button label="Quay lại" onClick={() => navigate('/patient')} icon={<ArrowLeft className="w-4 h-4" />} />
            </motion.section>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
