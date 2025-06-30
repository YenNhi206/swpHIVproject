import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Button from '../../components/Button';

export default function CreateTreatment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    ingredients: '',
    dosage: '',
    indication: '',
    sideEffects: '',
    monitoring: '',
    precautions: '',
    category: '',
    duration: '',
    evaluation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTreatment = {
      id: Date.now(),
      ...form,
      moTa: form.category,
    };
    navigate('/treatment', { state: { newTreatment } });
  };

  const handleBack = () => {
    navigate('/treatment');
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
          Tạo phác đồ mới
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">Tên phác đồ</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700">Đối tượng</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
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

          {[
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
                value={form[name]}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500"
              />
            </motion.div>
          ))}
          <motion.div
            className="flex justify-end space-x-3 pt-6"
            variants={itemVariants}
          >
            <Button
              label="Quay lại danh sách"
              onClick={handleBack}
              icon={<ArrowLeft className="w-4 h-4" />}
            />
            <Button
              label="Lưu phác đồ"
              type="submit"
            />
          </motion.div>

        </form>
      </motion.div>
    </motion.div>
  );
}