import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Thêm framer-motion cho hiệu ứng
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react'; // Thêm biểu tượng nếu cần (tùy chọn)

export default function DoctorTestResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const doctorId = localStorage.getItem('doctorId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      setError('Không tìm thấy thông tin bác sĩ.');
      setLoading(false);
      return;
    }
    fetch(`http://localhost:8080/api/test-results/doctor/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Lỗi khi lấy kết quả xét nghiệm');
        return res.json();
      })
      .then((data) => setResults(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [doctorId, token]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg border border-red-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold mb-8 text-red-600 text-center border-b-2 border-red-100 pb-2 flex items-center justify-center gap-2"
        variants={itemVariants}
      >
        <FileText className="w-6 h-6" /> Kết quả xét nghiệm bệnh nhân
      </motion.h2>

      {loading ? (
        <motion.p
          className="text-gray-600 text-center py-4"
          variants={itemVariants}
        >
          Đang tải...
        </motion.p>
      ) : error ? (
        <motion.p
          className="text-red-500 text-center py-4 bg-red-50 rounded-lg"
          variants={itemVariants}
        >
          {error}
        </motion.p>
      ) : results.length === 0 ? (
        <motion.p
          className="text-gray-600 text-center py-4 italic"
          variants={itemVariants}
        >
          Không có kết quả xét nghiệm nào.
        </motion.p>
      ) : (
        <motion.div variants={itemVariants}>
          <div className="overflow-x-auto rounded-xl shadow-sm">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-red-50 text-red-700 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 border-b border-red-100">STT</th>
                  <th className="px-6 py-3 border-b border-red-100">Bệnh nhân</th>
                  <th className="px-6 py-3 border-b border-red-100">Loại xét nghiệm</th>
                  <th className="px-6 py-3 border-b border-red-100">Ngày</th>
                  <th className="px-6 py-3 border-b border-red-100">Giá trị</th>
                  <th className="px-6 py-3 border-b border-red-100">Ghi chú</th>
                  <th className="px-6 py-3 border-b border-red-100">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <motion.tr
                    key={r.id}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-red-50 transition-colors duration-200'}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <td className="px-6 py-3 border-b border-red-100">{idx + 1}</td>
                    <td className="px-6 py-3 border-b border-red-100">
                      {r.patientName || r.patientId}
                    </td>
                    <td className="px-6 py-3 border-b border-red-100">
                      {r.testCategoryName || r.testCategoryId}
                    </td>
                    <td className="px-6 py-3 border-b border-red-100">
                      {r.createdAt ? (
                        new Date(r.createdAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })
                      ) : (
                        <span className="text-gray-400 italic">Chưa có</span>
                      )}
                    </td>
                    <td className="px-6 py-3 border-b border-red-100 text-gray-700">
                      {r.resultValue || <span className="text-gray-400 italic">Chưa có</span>}
                    </td>
                    <td className="px-6 py-3 border-b border-red-100 text-gray-700">
                      {r.resultNote || <span className="text-gray-400 italic">-</span>}
                    </td>
                    <td className="px-6 py-3 border-b border-red-100">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          r.status === 'REQUESTED'
                            ? 'bg-yellow-100 text-yellow-700'
                            : r.status === 'COMPLETED'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}