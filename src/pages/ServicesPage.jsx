import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Stethoscope, CheckCircle } from 'lucide-react';
import Button from '../components/Button';

const firstVisitServices = [
  { id: 1, name: 'Khám HIV cơ bản', description: 'Xét nghiệm nhanh và tư vấn.', price: 200000 },
  { id: 2, name: 'Xét nghiệm tải lượng HIV', description: 'Đo lượng virus trong máu.', price: 500000 },
  { id: 3, name: 'Xét nghiệm CD4', description: 'Đánh giá hệ miễn dịch.', price: 300000 },
  { id: 4, name: 'Tư vấn dự phòng', description: 'Hỗ trợ biện pháp dự phòng HIV.', price: 150000 },
];

const followUpServices = [
  { id: 5, name: 'Khám tái khám HIV', description: 'Theo dõi tình trạng điều trị.', price: 180000 },
  { id: 6, name: 'Lấy thuốc ARV', description: 'Theo phác đồ điều trị.', price: 'Tùy phác đồ' },
];

function formatPrice(price) {
  return typeof price === 'number'
    ? price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    : price;
}

export default function ServicesPage() {
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
      className="min-h-screen bg-gray-50 p-8 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-extrabold text-red-700 text-center"
        variants={itemVariants}
      >
        Dịch vụ và Giá tiền
      </motion.h1>

      {/* Khám lần đầu */}
      <motion.section
        className="mt-12"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" /> Dịch vụ khám lần đầu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {firstVisitServices.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-500" /> {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-2xl font-bold text-red-600">{formatPrice(service.price)}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tái khám */}
      <motion.section
        className="mt-12"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
          <Stethoscope className="w-6 h-6" /> Dịch vụ tái khám
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {followUpServices.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-red-500" /> {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <p className="text-2xl font-bold text-red-600">{formatPrice(service.price)}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}