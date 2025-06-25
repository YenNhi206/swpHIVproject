import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import hivCareImg from "../assets/hiv-care.png";
import educationImg from "../assets/education.png";
import hiv1Img from "../assets/hiv1.jpg";
import hivbhytImg from "../assets/hivbhyt.webp";
import hivpaitentImg from "../assets/hivpaitent.jpg";
import img1 from "../assets/DYT.jpg";
import img2 from "../assets/hiv2.jpg";
import img3 from "../assets/doctor1.jpg";

const carouselImages = [
  { src: img1, alt: 'HIV Care 1' },
  { src: img2, alt: 'HIV Care 2' },
  { src: img3, alt: 'HIV Care 3' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

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
      {/* Header */}
      <motion.header
        className="text-center mb-10"
        variants={itemVariants}
      >
        <h1 className="text-3xl font-extrabold text-red-700">
          Chăm sóc và Hỗ trợ HIV – Vì một cuộc sống khỏe mạnh
        </h1>
      </motion.header>

      {/* Carousel */}
      <motion.div
        className="mb-10 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative"
        variants={itemVariants}
      >
        <motion.img
          src={carouselImages[currentSlide].src}
          alt={carouselImages[currentSlide].alt}
          className="w-full h-[300px] md:h-[380px] object-cover"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          key={currentSlide}
        />
        <motion.button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Giới thiệu cơ sở y tế */}
      <motion.section
        className="grid md:grid-cols-2 gap-8 items-center py-12"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} whileHover={imageVariants}>
          <img
            src={hivCareImg}
            alt="Giới thiệu cơ sở y tế"
            className="w-full h-80 object-cover rounded-xl shadow-sm"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <p className="text-red-600 text-sm font-semibold uppercase mb-2 tracking-wide">
            HỆ THỐNG CHUYÊN SÂU ĐIỀU TRỊ HIV
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
            Giới thiệu cơ sở y tế
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Chúng tôi là cơ sở y tế chuyên sâu trong điều trị HIV, với đội ngũ bác sĩ giàu kinh nghiệm, tận tâm và hệ thống trang thiết bị hiện đại, bảo mật. Mục tiêu là mang lại hy vọng và sức khỏe bền vững cho bệnh nhân.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-700">
              <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
              Đội ngũ chuyên gia y tế hàng đầu về HIV/AIDS
            </li>
            <li className="flex items-center text-gray-700">
              <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
              Cơ sở vật chất hiện đại, bảo mật thông tin
            </li>
            <li className="flex items-center text-gray-700">
              <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
              Chương trình chăm sóc toàn diện, hỗ trợ tâm lý
            </li>
            <li className="flex items-center text-gray-700">
              <CheckCircle className="w-4 h-4 text-red-600 mr-2" />
              Đồng hành cùng bệnh nhân trong suốt quá trình điều trị
            </li>
          </ul>
          <Button
            label="Tìm hiểu thêm"
            onClick={() => window.location.href = '/about'}
            icon={<ChevronRight className="w-4 h-4" />}
          />
        </motion.div>
      </motion.section>

      {/* Tài liệu giáo dục */}
      <motion.section
        className="grid md:grid-cols-2 gap-8 items-stretch py-12"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} whileHover={imageVariants}>
          <img
            src={educationImg}
            alt="Giáo dục và giảm kỳ thị"
            className="w-full h-full object-cover rounded-xl shadow-sm"
          />
        </motion.div>
        <motion.div className="flex flex-col justify-start space-y-6" variants={containerVariants}>
          <h2 className="text-3xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Tài liệu giáo dục & giảm kỳ thị
          </h2>
          {[
            {
              title: "HIV là gì?, HIV lây nhiễm như thế nào?",
              description:
                "Hầu như tất cả mọi người đều đã từng nghe đến HIV và AIDS, tuy nhiên có rất ít người hiểu đúng về nó...",
              link: "https://www.vinmec.com/vie/bai-viet/hiv-va-aids-nhung-dieu-ban-can-nho-vi",
            },
            {
              title: "4 bí quyết sống lâu, sống khỏe cho người nhiễm HIV",
              description:
                "SKĐS - Khi phát hiện mình bị nhiễm HIV, nhiều người cứ nghĩ cuộc đời mình sẽ mất tất cả...",
              link: "https://bvquan5.medinet.gov.vn/hivaids/4-bi-quyet-song-lau-song-khoe-cho-nguoi-nhiem-hiv-cmobile16896-191243.aspx",
            },
            {
              title: "Xóa bỏ kỳ thị và phân biệt đối xử với người nhiễm HIV/AIDS",
              description:
                "Chỉ thị 54-CT/TW, ngày 30/1/2005 của Ban Bí thư đã nêu rõ về việc chống kỳ thị...",
              link: "https://btgtu.binhthuan.dcs.vn/Trang-chu/post/1520/xoa-bo-ky-thi-va-phan-biet-doi-xu-voi-nguoi-nhiem-hivaids",
            },
          ].map(({ title, description, link }, idx) => (
            <motion.div
              key={title}
              className="bg-white shadow-sm rounded-xl p-6 border border-gray-100 hover:shadow-md transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <Button
                label="Đọc thêm"
                onClick={() => window.open(link, '_blank')}
                icon={<ChevronRight className="w-4 h-4" />}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Tin tức và bài báo */}
      <motion.section
        variants={containerVariants}
      >
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          Tin tức & Bài báo về HIV
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              img: hiv1Img,
              alt: "Phát hiện liệu pháp mới",
              title: "Thử nghiệm lâm sàng trên người liệu pháp mới điều trị HIV",
              description:
                "Nhóm chuyên gia công nghệ sinh học từ Hoa Kỳ đang thử nghiệm liệu pháp CRISPR trên 3 bệnh nhân HIV, với kỳ vọng tìm ra cách chữa dứt điểm “căn bệnh thế kỷ” HIV/AIDS.",
              link: "https://vaac.gov.vn/thu-nghiem-lam-sang-tren-nguoi-lieu-phap-moi-dieu-tri-hiv.html",
            },
            {
              img: hivbhytImg,
              alt: "Chương trình hỗ trợ ARV miễn phí",
              title: "TP. Hồ Chí Minh: Sẵn sàng công tác điều trị cho người nhiễm HIV thông qua BHYT",
              description:
                "Nếu không có thẻ BHYT, người nhiễm HIV sẽ phải chi một số tiền khá lớn để điều trị bằng thuốc ARV.",
              link: "https://baohiemxahoi.gov.vn/gioithieu/Pages/gioi-thieu-chung.aspx?CateID=0&ItemID=11910",
            },
            {
              img: hivpaitentImg,
              alt: "Hành trình sống chung với HIV",
              title: "Bệnh nhân HIV: HIV không phải là dấu chấm hết, sự đồng cảm giúp tôi vững bước",
              description:
                "SKĐS - Tôi - một bệnh nhân đang sống chung với HIV, hai từ khó khăn không đủ để diễn tả về hành trình của bản thân.",
              link: "https://bvquan5.medinet.gov.vn/hivaids/benh-nhan-hiv-hiv-khong-phai-la-dau-cham-het-su-dong-cam-giup-toi-vung-buoc-cmobile16896-199511.aspx",
            },
          ].map(({ img, alt, title, description, link }, idx) => (
            <motion.div
              key={title}
              className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={img}
                alt={alt}
                className="w-full h-40 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <Button
                  label="Đọc thêm"
                  onClick={() => window.open(link, '_blank')}
                  icon={<ChevronRight className="w-4 h-4" />}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Hành động & Dịch vụ */}
      <motion.section
        className="bg-white py-20"
        variants={containerVariants}
      >
        <div className="grid md:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-8">
              Nên làm gì khi có nghi vấn nhiễm HIV?
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Bước 1: Tìm cơ sở y tế",
                  desc: "Tìm một cơ sở y tế gần bạn hoặc trang y tế có cung cấp dịch vụ tư vấn và xét nghiệm HIV.",
                },
                {
                  title: "Bước 2: Xét nghiệm HIV",
                  desc: "Xét nghiệm là cách duy nhất để biết bạn có nhiễm HIV hay không. Hoàn toàn bảo mật.",
                },
                {
                  title: "Bước 3: Điều trị & sống khỏe",
                  desc: "Nếu dương tính, bạn sẽ được điều trị ARV và hỗ trợ để sống khỏe mạnh như người bình thường.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="text-3xl text-red-600">{index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-1">{step.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-red-600 mb-8">
              Tại sao chọn dịch vụ y tế của chúng tôi?
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Đội ngũ y bác sĩ tận tâm",
                  desc: "Chúng tôi có đội ngũ chuyên gia nhiều năm kinh nghiệm trong chăm sóc và điều trị HIV, luôn lắng nghe và đồng hành cùng bạn.",
                },
                {
                  title: "Bảo mật tuyệt đối",
                  desc: "Mọi thông tin cá nhân và kết quả xét nghiệm của bạn được bảo mật nghiêm ngặt, đảm bảo quyền riêng tư tối đa.",
                },
                {
                  title: "Giáo dục và hỗ trợ toàn diện",
                  desc: "Không chỉ điều trị, chúng tôi cung cấp tài liệu giáo dục, hỗ trợ tâm lý và cộng đồng để bạn sống tích cực và tự tin hơn.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <div className="text-3xl text-red-600">{index + 1}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-700 mb-1">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
}