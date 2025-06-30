import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';

export default function EditTreatment() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`/treatment/${id}`);
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
      className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-10 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        variants={itemVariants}
      >
        <motion.h2
          className="text-2xl font-bold text-red-600 mb-6"
          variants={itemVariants}
        >
          Chỉnh sửa phác đồ
        </motion.h2>

        <form className="space-y-4">
          {[
            ['Tên phác đồ', 'name'],
            ['Thành phần thuốc', 'ingredients'],
            ['Liều dùng', 'dosage'],
            ['Chỉ định', 'indication'],
            ['Tác dụng phụ', 'sideEffects'],
            ['Theo dõi hiệu quả', 'monitoring'],
            ['Thời gian áp dụng', 'duration'],
            ['Đánh giá hiệu quả điều trị', 'evaluation'],
            ['Lưu ý', 'precautions'],
          ].map(([label, name], idx) => (
            <motion.div key={name} variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <textarea
                name={name}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500"
              />
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">Đối tượng</label>
            <select
              name="category"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500"
            >
              <option value="">-- Chọn đối tượng áp dụng --</option>
              <option value="Người lớn">Người lớn</option>
              <option value="Trẻ em">Trẻ em</option>
              <option value="Phụ nữ mang thai">Phụ nữ mang thai</option>
              <option value="Người điều trị lần đầu">Người điều trị lần đầu</option>
              <option value="Người kháng thuốc">Người kháng thuốc</option>
            </select>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-between items-center pt-6 border-t mt-6 gap-3"
            variants={itemVariants}
          >
            <Link
              to="/treatment"
              className="text-red-600 hover:underline text-sm font-medium"
            >
              ← Quay lại danh sách
            </Link>
            <div className="flex gap-2 ml-auto">
              <Button
                label="Quay lại chi tiết"
                onClick={() => navigate(`/treatment/${id}`)}
              />
              <Button
                label="Hủy"
                onClick={handleCancel}
              />
              <Button
                label="Lưu thay đổi"
                type="submit"
                icon={<Save className="w-4 h-4" />}
              />
            </div>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
}