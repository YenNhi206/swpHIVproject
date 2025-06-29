import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import healthcareImage from '../assets/healthcare.jpg';
import {
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
    <motion.div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 font-sans" variants={containerVariants} initial="hidden" animate="visible">

      {/* Logo trang web */}
      <section className="flex flex-col items-center text-center pt-12 pb-16 px-6 bg-gradient-to-b from-white via-red-50 to-white shadow-inner rounded-2xl mx-4">
        {/* Logo / Tên thương hiệu */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          <span className="text-red-700">HIV Care</span>
          <span className="text-red-500">+</span>
        </h1>

        {/* Slogan (tuỳ chọn) */}
        <p className="text-gray-600 text-lg italic mb-8">
          Đồng hành cùng sức khoẻ cộng đồng
        </p>

        {/* Thông tin liên hệ */}
        <div className="text-gray-700 text-base md:text-lg space-y-4 w-full max-w-xl">
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>123 Đường Sức Khoẻ, Quận 3, TP. Hồ Chí Minh, Việt Nam</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-red-500" />
            <span>(028) 1234 5678</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Mail className="w-5 h-5 text-red-500" />
            <a href="mailto:contact@hivtreatment.vn" className="text-red-600 hover:underline">
              contact@hivtreatment.vn
            </a>
          </div>
        </div>
      </section>


      {/* Lịch sử thành lập & Cơ sở hoạt động */}
      <section>
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4">
          Lịch sử thành lập & Cơ sở hoạt động
        </h2>

        <div className="px-4 sm:px-6 lg:px-12 py-12 text-gray-800 space-y-12">

          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">🏥 Lịch sử thành lập</h3>
            <p>
              HIV Care+ được thành lập với sứ mệnh cung cấp nền tảng y tế trực tuyến chuyên sâu, đáng tin cậy và toàn diện trong điều trị HIV/AIDS tại Việt Nam.
            </p>
            <p className="mt-2">
              Ý tưởng khởi nguồn từ năm <strong>2018</strong>, khi một nhóm bác sĩ chuyên khoa truyền nhiễm, chuyên gia tâm lý và kỹ sư công nghệ cùng nhìn thấy khoảng trống trong việc tiếp cận thông tin y tế chính thống. Sau nhiều năm nghiên cứu và hợp tác với các trung tâm y tế lớn, <strong>trang web HIV Care+ chính thức ra đời vào đầu năm 2021</strong>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">📍 Cơ sở hoạt động</h3>
            <p>
              Chúng tôi hoạt động dưới sự cấp phép của Bộ Y tế, với <strong>trụ sở chính tại 123 Đường Sức Khoẻ, Quận 3, TP. Hồ Chí Minh</strong>. Cơ sở bao gồm:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Phòng khám chuyên khoa HIV/AIDS đạt chuẩn quốc tế</li>
              <li>Đội ngũ bác sĩ, dược sĩ và chuyên gia tư vấn tâm lý giàu kinh nghiệm</li>
              <li>Trung tâm hỗ trợ bệnh nhân trực tuyến 24/7</li>
              <li>Hệ thống bảo mật và lưu trữ thông tin bệnh án theo chuẩn quốc tế (HIPAA)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">💡 Tầm nhìn & Giá trị</h3>
            <p>
              HIV Care+ không chỉ là một trang web — mà là một <strong>hệ sinh thái chăm sóc sức khoẻ toàn diện</strong>, nơi bệnh nhân được hỗ trợ bằng:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Thông tin chính xác, cập nhật từ chuyên gia</li>
              <li>Tư vấn điều trị và kết nối với cơ sở y tế uy tín</li>
              <li>Không kỳ thị, không phân biệt — chỉ tập trung vào đồng hành điều trị</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Năng lực & Thành tựu chuyên môn */}
      <section>
        <h2 className="text-3xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4">
          Năng lực & Thành tựu chuyên môn
        </h2>
        <div className="px-4 sm:px-6 lg:px-12 py-12 text-gray-800 space-y-12">
          {/* Phạm vi hoạt động & Dịch vụ */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">📍 Phạm vi hoạt động & Dịch vụ</h3>
            <p className="mb-4 leading-relaxed">
              HIVCare+ phục vụ cộng đồng trên toàn quốc qua nền tảng trực tuyến và các cơ sở đối tác tại các thành phố lớn.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Tư vấn, khám & điều trị HIV/AIDS trực tuyến</li>
              <li>Cấp phát thuốc ARV & hỗ trợ tuân thủ điều trị</li>
              <li>Tư vấn tâm lý, hỗ trợ cộng đồng LGBT và nhóm nguy cơ</li>
              <li>Xét nghiệm HIV, tải lượng virus (VL), CD4, PrEP/PEP</li>
              <li>Kết nối & chuyển tuyến đến các cơ sở y tế uy tín</li>
            </ul>
          </div>

          {/* Kỹ thuật cao */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">🧪 Các kỹ thuật cao đã thực hiện</h3>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Xét nghiệm tải lượng HIV RNA (PCR Real-time)</li>
              <li>Đo tế bào miễn dịch CD4/CD8 bằng kỹ thuật FACS</li>
              <li>Xét nghiệm kháng thuốc gen HIV</li>
              <li>Sàng lọc bệnh đồng nhiễm: Viêm gan B, C, giang mai</li>
              <li>Hệ thống kỹ thuật số quản lý & theo dõi tuân thủ điều trị</li>
            </ul>
          </div>

          {/* Thành tích */}
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">🏆 Thành tích đã đạt được</h3>
            <ul className="list-disc list-inside space-y-2 leading-relaxed">
              <li>Hơn <strong>50.000 lượt tư vấn & điều trị</strong> toàn quốc</li>
              <li>Hợp tác với hơn <strong>30 cơ sở y tế</strong> và tổ chức cộng đồng</li>
              <li>Giải thưởng <strong>"Sáng kiến sức khỏe cộng đồng"</strong> năm 2023</li>
              <li>Ghi nhận bởi Bộ Y tế & các tổ chức quốc tế về phòng chống HIV/AIDS</li>
              <li>Vận hành hệ thống hỗ trợ điều trị 24/7 với bảo mật theo chuẩn HIPAA</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="space-y-16">

        <motion.h1 className="text-3xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4" variants={itemVariants}>Chúng tôi khác biệt</motion.h1>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <img src="https://phongkhamdakhoaphuduc.com/wp-content/uploads/2022/07/kham-benh-online.jpg" alt="Tâm đức" className="w-full h-auto rounded-xl shadow" />
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4">TÂM ĐỨC</h3>
              <p className="text-gray-700 leading-relaxed">Chúng tôi đặt tâm đức làm trọng tâm nhằm mang đến dịch vụ chăm sóc sức khỏe toàn diện dành cho cộng đồng.</p>
            </div>
          </div>

          <div className="bg-red-100 py-8 px-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-4">CHUYÊN NGHIỆP</h3>
                <p className="text-gray-700 leading-relaxed">Chúng tôi cam kết không ngừng chuyên mình để đáp ứng tốt nhất nhu cầu chăm sóc sức khỏe của khách hàng.</p>
              </div>
              <img src="https://nutrihome.vn/wp-content/uploads/2020/08/lay-mau-xet-nghiem.jpg" alt="Chuyên nghiệp" className="w-full h-auto rounded-xl shadow" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <img src="http://image.congan.com.vn/thumbnail/CATP-2048-2022-12-17/hp76886.jpg" alt="Ân cần" className="w-full h-80 rounded-xl shadow object-cover" />
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4">ÂN CẦN</h3>
              <p className="text-gray-700 leading-relaxed">Cam kết duy nhất của chúng tôi suốt hơn 1 thập niên không ngừng chuyên mình.</p>
            </div>
          </div>
        </div>

        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            Đội ngũ
          </h2>
          <p className="text-gray-700 leading-relaxed">Gồm các bác sĩ HIV/AIDS giàu kinh nghiệm và chuyên gia công nghệ y tế, tận tâm, chuyên nghiệp, ân cần với sứ mệnh chăm sóc sức khỏe cộng đồng.</p>
        </motion.div>

        <motion.div variants={containerVariants} className="pt-4">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            Đối tượng phục vụ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Người nhiễm HIV', desc: 'Hỗ trợ điều trị và theo dõi sức khỏe.' },
              { title: 'Nhóm nguy cơ cao', desc: 'Tư vấn dự phòng và xét nghiệm.' },
              { title: 'Bác sĩ', desc: 'Quản lý và chăm sóc bệnh nhân.' },
              { title: 'Cộng đồng', desc: 'Giảm kỳ thị, nâng cao nhận thức.' },
              { title: 'Tổ chức y tế', desc: 'Hỗ trợ báo cáo và chính sách.' },
            ].map((item, idx) => (
              <motion.div key={idx} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-start gap-4 hover:bg-gray-50 transition" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                <Users className="w-6 h-6 text-red-500" />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="bg-red-100 p-6 rounded-xl shadow-sm border border-gray-100 mt-12" variants={itemVariants} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-4">TẦM NHÌN</h2>
              <p>HIVCare+ là thương hiệu uy tín, trách nhiệm trong lĩnh vực chăm sóc sức khỏe, góp phần khẳng định vị thế của cộng đồng trong xã hội.</p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-4">SỨ MỆNH</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Kiến tạo</strong> hệ sinh thái chăm sóc sức khỏe cộng đồng.</li>
                <li><strong>Khai phóng</strong> tiềm năng, trao quyền lãnh đạo cộng đồng.</li>
                <li><strong>Khẳng định</strong> vai trò cộng đồng trong nâng cao sức khỏe xã hội.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-600 mb-4">GIÁ TRỊ CỐT LÕI</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Gắn kết</strong></li>
                <li><strong>Lắng nghe</strong></li>
                <li><strong>In dấu</strong></li>
                <li><strong>Nhiệt tâm</strong></li>
                <li><strong>Khai phóng</strong></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={containerVariants}>
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
              <motion.div key={idx} className="flex items-start gap-4" variants={itemVariants}>
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

      <motion.div className="fixed bottom-24 right-6 flex flex-col gap-2 z-50" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Button label="Nhắn tư vấn" onClick={() => window.open('https://www.facebook.com', '_blank')} icon={<MessageCircle className="w-4 h-4" />} />
        <Button label="Đặt lịch khám" onClick={() => navigate('/appointments')} icon={<Calendar className="w-4 h-4" />} />
        <Button label="Tài liệu" onClick={() => window.open('https://www.prepwatch.org/wp-content/uploads/2019/05/Care_and_Treatment_Guidelines_Vietnam_2017.pdf', '_blank')} icon={<FileText className="w-4 h-4" />} />
      </motion.div>
    </motion.div>
  );
}
