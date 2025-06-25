import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Stethoscope, CheckCircle } from 'lucide-react';

const firstVisitServices = [
  {
    id: 1,
    name: 'Xét nghiệm nhanh HIV và STIs',
    description: [
      'Chính xác & Bảo mật.',
      'Xét nghiệm nhanh HIV-1/2 Combo Antigen/Antibody (Ag/Ab).',
      'Kết quả nhanh chóng chỉ sau 20 phút.',
    ],
    price: 200000,
  },
  {
    id: 2,
    name: 'Dự phòng trước phơi nhiễm HIV – PrEP',
    description: [
      'Bảo mật & Hiệu quả.',
      'Sử dụng thuốc để phòng tránh lây nhiễm HIV trước khi có nguy cơ tiếp xúc.',
      'Được tư vấn và theo dõi bởi đội ngũ y tế giàu kinh nghiệm.',
    ],
    price: 500000,
  },
  {
    id: 3,
    name: 'Dự phòng sau phơi nhiễm HIV – PEP',
    description: [
      'Ít tác dụng phụ.',
      'Điều trị khẩn cấp sau khi có nguy cơ phơi nhiễm HIV.',
      'Hiệu quả nếu thực hiện trong vòng 72 giờ.',
    ],
    price: 300000,
  },
  {
    id: 4,
    name: 'Điều trị HIV – ARV',
    description: [
      'Bảo mật & Uy tín.',
      'Điều trị HIV lâu dài giúp kiểm soát virus.',
      'Nâng cao chất lượng cuộc sống và giảm nguy cơ lây nhiễm.',
    ],
    price: 'Tùy phác đồ',
  },
  {
    id: 5,
    name: 'Dịch vụ tại nhà',
    description: [
      'Theo lịch hẹn.',
      'Tư vấn khám chữa bệnh qua điện thoại, ứng dụng.',
      'Tiện lợi và bảo mật tối đa.',
    ],
    price: '...',
  },
  {
    id: 6,
    name: 'Tư vấn tâm lý',
    description: [
      'Hỗ trợ tinh thần.',
      'Tư vấn tâm lý cho người sống chung với HIV.',
      'Giảm căng thẳng, lo lắng, nâng cao tinh thần.',
    ],
    price: '...',
  },
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

      <motion.section className="mt-12" variants={containerVariants}>
        <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
          <FileText className="w-6 h-6" /> Dịch vụ khám và điều trị
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
      </motion.section>
    </motion.div>
  );
}
