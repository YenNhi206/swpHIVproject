import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import Button from '../components/Button';

export default function NotFoundPage() {
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
      className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-2xl shadow-sm w-full text-center p-8 border border-gray-100"
        variants={itemVariants}
      >
        <AlertTriangle className="w-24 h-24 text-red-500 mx-auto mb-6" />
        <h1 className="text-6xl font-extrabold text-red-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Trang không tồn tại</h2>
        <p className="text-gray-600 mb-6">
          Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng quay lại trang chủ.
        </p>
        <Button label="Quay lại Trang chủ" onClick={() => window.location.href = '/'} />
      </motion.div>
    </motion.div>
  );
}