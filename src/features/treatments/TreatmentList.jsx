import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Eye, Edit2, Trash2 } from 'lucide-react';
import Button from "../../components/Button";


export default function TreatmentList() {
  const location = useLocation();
  const navigate = useNavigate();
  const newTreatment = location.state?.newTreatment;

  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        name: 'TDF + 3TC + DTG',
        description: 'Phác đồ chuẩn cho người lớn',
        category: 'Người lớn',
      },
      {
        id: 2,
        name: 'AZT + 3TC + EFV',
        description: 'Phác đồ thay thế cho người lớn',
        category: 'Người lớn',
      },
      {
        id: 3,
        name: 'ABC + 3TC + LPV/r',
        description: 'Phác đồ dành cho phụ nữ mang thai',
        category: 'Phụ nữ mang thai',
      },
      {
        id: 4,
        name: 'NVP + 3TC + AZT',
        description: 'Phác đồ cho trẻ em',
        category: 'Trẻ em',
      },
    ];

    if (newTreatment) {
      const processedTreatment = {
        ...newTreatment,
        description: newTreatment.description || newTreatment.moTa || newTreatment.category || '',
      };
      fakeData.push(processedTreatment);
    }

    setTimeout(() => {
      setTreatments(fakeData);
      setIsLoading(false);
    }, 500);
  }, [newTreatment]);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa phác đồ này không?');
    if (confirmed) {
      setTreatments((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const filteredTreatments = treatments.filter((treatment) =>
    [treatment.name, treatment.category]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
      className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-10 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex justify-between items-center mb-8"
        variants={itemVariants}
      >
        <h2 className="text-3xl font-bold text-red-600">Danh sách phác đồ điều trị HIV</h2>
        <Button
          label="Tạo phác đồ mới"
          onClick={() => navigate('/treatment/create')}
          icon={<Plus className="w-5 h-5" />}
        />
      </motion.div>

      <motion.div
        className="mb-6"
        variants={itemVariants}
      >
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm phác đồ hoặc đối tượng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-lg p-6"
        variants={itemVariants}
      >
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-2">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredTreatments.length > 0 ? (
          <>
            <div className="hidden sm:block">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-red-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Tên phác đồ</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Mô tả</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Đối tượng</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTreatments.map((t) => (
                    <motion.tr
                      key={t.id}
                      className="border-t hover:bg-gray-50"
                      variants={itemVariants}
                    >
                      <td className="px-6 py-4 text-gray-800">{t.name}</td>
                      <td className="px-6 py-4 text-gray-600">{t.description}</td>
                      <td className="px-6 py-4 text-gray-600">{t.category}</td>
                      <td className="px-6 py-4 text-center space-x-2">
                        <Button
                          label="Chi tiết"
                          onClick={() => navigate(`/treatment/${t.id}`)}
                          icon={<Eye className="w-4 h-4" />}
                        />
                        <Button
                          label="Sửa"
                          onClick={() => navigate(`/treatment/${t.id}/edit`)}
                          icon={<Edit2 className="w-4 h-4" />}
                        />
                        <Button
                          label="Xóa"
                          onClick={() => handleDelete(t.id)}
                          icon={<Trash2 className="w-4 h-4" />}
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block sm:hidden space-y-4">
              {filteredTreatments.map((t) => (
                <motion.div
                  key={t.id}
                  className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                  <p className="text-gray-600 mt-1"><strong>Mô tả:</strong> {t.description}</p>
                  <p className="text-gray-600 mt-1"><strong>Đối tượng:</strong> {t.category}</p>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    <Button
                      label="Chi tiết"
                      onClick={() => navigate(`/treatment/${t.id}`)}
                      icon={<Eye className="w-4 h-4" />}
                    />
                    <Button
                      label="Sửa"
                      onClick={() => navigate(`/treatment/${t.id}/edit`)}
                      icon={<Edit2 className="w-4 h-4" />}
                    />
                    <Button
                      label="Xóa"
                      onClick={() => handleDelete(t.id)}
                      icon={<Trash2 className="w-4 h-4" />}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <motion.div
            className="text-center py-8 text-gray-500"
            variants={itemVariants}
          >
            <p>Không tìm thấy phác đồ điều trị nào.</p>
            <Button
              label="Tạo phác đồ mới"
              onClick={() => navigate('/treatment/create')}
              icon={<Plus className="w-5 h-5" />}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}