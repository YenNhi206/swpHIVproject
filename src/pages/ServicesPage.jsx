import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, HelpCircle } from 'lucide-react';

const serviceGroups = {
  'Khám lần đầu': ['FIRST_VISIT'],
  'Tái khám': ['FOLLOW_UP'],
};

function formatPrice(price) {
  const number = Number(price); // Ép kiểu về số
  if (!isNaN(number)) {
    return number.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }
  return (
    <span className="inline-flex items-center gap-1 group relative cursor-help">
      {price}
    </span>
  );
}

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const response = await fetch('http://localhost:8080/api/services', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Lỗi khi tải danh sách dịch vụ');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Lỗi khi gọi API dịch vụ:', error);
      setError('Không thể tải danh sách dịch vụ. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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

      {/* ĐÃ BỎ NÚT TẢI LẠI */}

      <motion.section className="mt-12 space-y-12" variants={containerVariants}>
        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : Object.entries(serviceGroups).map(([groupTitle, types]) => (
          <div key={groupTitle}>
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" /> {groupTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services
                .filter((service) => types.includes(service.type))
                .map((service) => (
                  <motion.div
                    key={service.id}
                    className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:ring-1 hover:ring-red-300 transition-all duration-300 ease-in-out"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-red-500" /> {service.name}
                    </h3>
                    <div className="text-gray-600 mb-4 space-y-1">
                      {Array.isArray(service.description) ? (
                        service.description.map((line, index) => (
                          <p key={index}>• {line}</p>
                        ))
                      ) : (
                        <p>{service.description}</p>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-red-600">{formatPrice(service.price)}</p>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </motion.section>
    </motion.div>
  );
}
