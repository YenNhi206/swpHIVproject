import React from "react";
import hivCareImg from "../assets/hiv-care.png";
import educationImg from "../assets/education.png";
import hiv1Img from "../assets/hiv1.jpg";
import hivbhytImg from "../assets/hivbhyt.webp";
import hivpaitentImg from "../assets/hivpaitent.jpg";

import img1 from "../assets/DYT.jpg";
import img2 from "../assets/hiv2.jpg";
import img3 from "../assets/doctor1.jpg";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { motion } from "framer-motion";

const images = [
  { original: img1 },
  { original: img2 },
  { original: img3 },
];

export default function HomePage() {
  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-10">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-extrabold text-red-700">
            Chăm sóc và Hỗ trợ HIV – Vì một cuộc sống khỏe mạnh
          </h1>
        </motion.header>

        <motion.div
          className="mb-10 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-[300px] md:h-[380px] relative">
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showThumbnails={false}
              autoPlay={true}
              slideInterval={5000}
              showNav={true}
            />
          </div>
        </motion.div>

        <motion.section
          className="grid md:grid-cols-2 gap-8 items-center py-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <img
              src={hivCareImg}
              alt="Giới thiệu cơ sở y tế"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <p className="text-red-600 text-sm font-semibold uppercase mb-2 tracking-wide">
              HỆ THỐNG CHUYÊN SÂU ĐIỀU TRỊ HIV
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-snug">
              Giới thiệu cơ sở y tế
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Chúng tôi là cơ sở y tế chuyên sâu trong điều trị HIV, với đội ngũ bác sĩ
              giàu kinh nghiệm, tận tâm và hệ thống trang thiết bị hiện đại, bảo mật. Mục tiêu là mang lại hy vọng và sức khỏe bền vững cho bệnh nhân.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="text-gray-700">Đội ngũ chuyên gia y tế hàng đầu về HIV/AIDS</li>
              <li className="text-gray-700">Cơ sở vật chất hiện đại, bảo mật thông tin</li>
              <li className="text-gray-700">Chương trình chăm sóc toàn diện, hỗ trợ tâm lý</li>
              <li className="text-gray-700">Đồng hành cùng bệnh nhân trong suốt quá trình điều trị</li>
            </ul>
          </div>
        </motion.section>

        <motion.section
          className="grid md:grid-cols-2 gap-8 items-stretch min-h-[600px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-full">
            <img
              src={educationImg}
              alt="Giáo dục và giảm kỳ thị"
              className="w-full h-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-start space-y-6 h-full">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              Tài liệu giáo dục & giảm kỳ thị
            </h2>

            {[{
              title: "HIV là gì?, HIV lây nhiễm như thế nào?",
              description: "Hầu như tất cả mọi người đều đã từng nghe đến HIV và AIDS, tuy nhiên có rất ít người hiểu đúng về nó...",
              link: "https://www.vinmec.com/vie/bai-viet/hiv-va-aids-nhung-dieu-ban-can-nho-vi"
            }, {
              title: "4 bí quyết sống lâu, sống khỏe cho người nhiễm HIV",
              description: "SKĐS - Khi phát hiện mình bị nhiễm HIV, nhiều người cứ nghĩ cuộc đời mình sẽ mất tất cả...",
              link: "https://bvquan5.medinet.gov.vn/hivaids/4-bi-quyet-song-lau-song-khoe-cho-nguoi-nhiem-hiv-cmobile16896-191243.aspx"
            }, {
              title: "Xóa bỏ kỳ thị và phân biệt đối xử với người nhiễm HIV/AIDS",
              description: "Chỉ thị 54-CT/TW, ngày 30/1/2005 của Ban Bí thư đã nêu rõ về việc chống kỳ thị...",
              link: "https://btgtu.binhthuan.dcs.vn/Trang-chu/post/1520/xoa-bo-ky-thi-va-phan-biet-doi-xu-voi-nguoi-nhiem-hivaids"
            }].map(({ title, description, link }) => (
              <motion.div
                key={title}
                className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 font-medium hover:underline"
                >
                  Đọc thêm →
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </>
  );
}
