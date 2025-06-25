import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import healthcareImage from '../assets/healthcare.jpg';
import {
  Heart,
  List,
  Users,
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageCircle,
  Calendar,
  FileText
} from 'lucide-react';
import Button from '../components/Button';

export default function AboutPage() {
  const navigate = useNavigate();
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
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

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="mb-12 overflow-hidden rounded-xl shadow-lg"
        variants={itemVariants}
        whileHover={imageVariants}
      >
        <img
          src={healthcareImage}
          alt="Healthcare"
          className="w-full h-64 object-cover"
        />
      </motion.div>

      <section className="mb-16 space-y-8">
        <motion.h1
          className="text-3xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4"
          variants={itemVariants}
        >
          Giới thiệu về HIV Care+
        </motion.h1>

        {/* Mục đích và Sứ mệnh */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            Sứ mệnh
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            HIV Care+ cam kết cung cấp dịch vụ y tế và điều trị HIV hiệu quả, bảo mật, và minh bạch, đồng hành cùng người bệnh để sống khỏe mạnh.
          </p>
        </motion.div>

        {/* Chức năng chính */}
        <motion.div
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <List className="w-6 h-6 text-red-500" />
            Chức năng chính
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-base">
            <li>Đặt lịch khám và điều trị với bác sĩ phù hợp.</li>
            <li>Tra cứu kết quả xét nghiệm CD4, tải lượng HIV.</li>
            <li>Nhắc nhở tái khám và uống thuốc ARV.</li>
            <li>Quản lý hồ sơ bệnh nhân và bác sĩ.</li>
            <li>Chia sẻ tài liệu, blog để nâng cao nhận thức.</li>
          </ul>
        </motion.div>

        {/* Đội ngũ phát triển */}
        <motion.div
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            Đội ngũ
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Gồm các bác sĩ HIV/AIDS giàu kinh nghiệm và chuyên gia công nghệ y tế, tận tâm với sứ mệnh chăm sóc sức khỏe cộng đồng.
          </p>
        </motion.div>

        {/* Đối tượng phục vụ */}
        <motion.div
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            Đối tượng phục vụ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Người nhiễm HIV', desc: 'Hỗ trợ điều trị và theo dõi sức khỏe.' },
              { title: 'Nhóm nguy cơ cao', desc: 'Tư vấn dự phòng và xét nghiệm.' },
              { title: 'Bác sĩ', desc: 'Quản lý và chăm sóc bệnh nhân.' },
              { title: 'Cộng đồng', desc: 'Giảm kỳ thị, nâng cao nhận thức.' },
              { title: 'Tổ chức y tế', desc: 'Hỗ trợ báo cáo và chính sách.' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-start gap-4 hover:bg-gray-50 transition"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Users className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Liên hệ */}
        <motion.div
          variants={containerVariants}
        >
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-red-500" />
            Liên hệ
          </h2>
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 grid sm:grid-cols-2 gap-6">
            {[
              { icon: MapPin, title: 'Địa chỉ', value: '123 Đường ABC, TP.HCM' },
              { icon: Mail, title: 'Email', value: 'support@hivcare.vn', href: 'mailto:support@hivcare.vn' },
              { icon: Phone, title: 'Điện thoại', value: '0123 456 789', href: 'tel:0123456789' },
              { icon: Clock, title: 'Giờ làm việc', value: 'Thứ 2 – Thứ 6: 8h – 17h' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-4"
                variants={itemVariants}
              >
                <item.icon className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-red-600 hover:underline">{item.value}</a>
                  ) : (
                    <p className="text-sm text-gray-600">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Floating Buttons */}
      <motion.div
        className="fixed bottom-24 right-6 flex flex-col gap-2 z-50"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          label="Nhắn tư vấn"
          onClick={() => window.open('https://www.facebook.com', '_blank')}
          icon={<MessageCircle className="w-4 h-4" />}
        />
        <Button
          label="Đặt lịch khám"
          onClick={() => navigate('/appointments')}
          icon={<Calendar className="w-4 h-4" />}
        />
        <Button
          label="Tài liệu"
          onClick={() => window.open('https://www.prepwatch.org/wp-content/uploads/2019/05/Care_and_Treatment_Guidelines_Vietnam_2017.pdf', '_blank')}
          icon={<FileText className="w-4 h-4" />}
        />
      </motion.div>
    </motion.div>
  );
}