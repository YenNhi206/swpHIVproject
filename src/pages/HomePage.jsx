import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import img4 from "../assets/hiv-3.jpg";
import img5 from "../assets/hiv-4.jpg";
import img6 from "../assets/hiv-5.jpg";
import img7 from "../assets/hiv-6.jpg";
import img8 from "../assets/hiv-7.jpg";
import camhungVideo from '../assets/camhung.mp4';
import { CalendarDays } from "lucide-react";


import { ShieldCheck } from "lucide-react";


const carouselImages = [
  { src: img1, alt: 'HIV Care 1' },
  { src: img2, alt: 'HIV Care 2' },
  { src: img3, alt: 'HIV Care 3' },
  { src: img4, alt: 'HIV Care 4' },
  { src: img5, alt: 'HIV Care 5' },
  { src: img6, alt: 'HIV Care 6' },
  { src: img7, alt: 'HIV Care 7' },
  { src: img8, alt: 'HIV Care 8' },

];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

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
        className="mb-10 rounded-xl overflow-hidden shadow-sm border border-gray-100 relative h-[300px] md:h-[380px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={carouselImages[currentSlide].src}
            alt={carouselImages[currentSlide].alt}
            className="w-full h-full object-cover absolute top-0 left-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />

        {/* Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 z-10 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 z-10 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-red-600 scale-110' : 'bg-gray-300'
                }`}
            />
          ))}
        </div>
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
          <p className="text-3xl font-bold text-red-600 mb-4 flex items-center gap-2">
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
            {
              title: "Làm thế nào để bảo vệ bản thân, hỗ trợ người khác và xóa bỏ định kiến về HIV?",
              description:
                " Tài liệu này là một trong số 9 tài liệu hướng dẫn kịch bản giảng dạy chi tiết...",
              link: "https://amaze.org/wp-content/uploads/2024/03/Vietnamese_Lesson-Plan-8_HIV.pdf",
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
              className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition h-full flex flex-col"
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
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
                  <p className="text-gray-600 mb-4">{description}</p>
                </div>
                <div className="mt-auto">
                  <Button
                    label="Đọc thêm"
                    onClick={() => window.open(link, '_blank')}
                    icon={<ChevronRight className="w-4 h-4" />}
                  />
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tin tức & tiến bộ y học mới */}
      <motion.section
        variants={containerVariants} className="mt-20">
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-red-600" />
            <span>Tin tức & tiến bộ y học mới</span>
          </h2>
          <p className="text-gray-600 max-w-xl">
            Cập nhật các diễn biến và bước tiến nổi bật trong nghiên cứu, điều trị, và chính sách HIV/AIDS trên toàn cầu.
          </p>
        </motion.div>

        {/* Lưới: 1 tin nổi bật + danh sách tin phụ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Tin nổi bật */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-2xl shadow hover:shadow-lg transition p-10 flex flex-col justify-between relative"
          >
            <a
              href="https://www.gilead.com/news/news-details/2025/yeztugo-lenacapavir-is-now-the-first-and-only-fda-approved-hiv-prevention-option-offering-6-months-of-protection"
              target="_blank"
              rel="noopener noreferrer"
              className="block space-y-4"
            >
              <div className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                Tin nổi bật
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                Ngày 18/06/2025, FDA chính thức phê duyệt lenacapavir dưới tên thương mại Yeztugo — thuốc tiêm PrEP đầu tiên kéo dài 6 tháng, mở ra kỳ vọng thay đổi phòng ngừa HIV toàn cầu.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 hover:text-red-600 transition">
                FDA chấp thuận thuốc tiêm PrEP lenacapavir (Yeztugo) 6 tháng/lần
              </h3>

              <ul className="text-gray-600 text-sm space-y-2 leading-relaxed list-disc list-inside">
                <li>Phương pháp PrEP đầu tiên kéo dài đến 6 tháng.</li>
                <li>Một bước ngoặt lớn trong phòng ngừa HIV toàn cầu.</li>
                <li>Giảm đáng kể rào cản tuân thủ so với thuốc hàng ngày.</li>
              </ul>

              <blockquote className="text-sm italic text-gray-500 border-l-4 border-red-200 pl-4">
                “Lenacapavir có thể cách mạng hóa phòng ngừa HIV trong thập kỷ tới.” — WHO
              </blockquote>

              <span className="text-sm font-medium text-red-500 hover:underline block">
                Xem chi tiết →
              </span>
            </a>

            <ShieldCheck className="w-16 h-16 text-red-100 absolute bottom-6 right-6 opacity-10" />
          </motion.div>

          {/* Danh sách tin nhỏ */}
          <div className="space-y-4">
            {[
              {
                title: "UNAIDS kêu gọi Gilead giảm giá thuốc còn 25 USD/năm",
                date: "18/06/2025",
                link: "https://www.unaids.org/en/resources/presscentre/pressreleaseandstatementarchive/2025/june/20250618_lenacapavir",
              },
              {
                title: "WHO hoan nghênh FDA phê duyệt lenacapavir",
                date: "19/06/2025",
                link: "https://www.who.int/news/item/19-06-2025-fda-approval-of-injectable-lenacapavir-marks-progress-for-hiv-prevention",
              },
              {
                title: "The New Yorker: lenacapavir có thể cách mạng hóa phòng ngừa HIV",
                date: "24/06/2025",
                link: "https://www.newyorker.com/news/the-lede/the-drug-that-could-revolutionize-the-fight-against-hiv",
              },

              {
                title: "Tòa án Tối cao Mỹ giữ yêu cầu bảo hiểm bao gồm PrEP",
                date: "27/06/2025",
                link: "https://www.reuters.com/business/healthcare-pharmaceuticals/gilead-shares-rise-after-us-top-court-ruling-preventative-coverage-2025-06-27/",
              },

            ].map(({ title, date, link }, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                  <p className="text-xs text-gray-400 mb-1">{date}</p>
                  <h4 className="text-sm font-medium text-gray-800 hover:text-red-600 transition leading-snug">
                    {title}
                  </h4>
                  <span className="text-xs text-red-500 hover:underline mt-1 inline-block">
                    Xem chi tiết →
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>


      {/* Góc sáng tạo */}
      <motion.section
        className="mt-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-red-600 mb-8 text-center flex items-center gap-2"
        >
          <CheckCircle className="w-6 h-6" />
          Góc sáng tạo – nghệ thuật từ cộng đồng
        </motion.h2>

        {/* Mô tả mục tiêu */}
        <motion.div variants={itemVariants}>
          <p className="text-gray-700 mb-3">Một phần độc đáo để:</p>
          <ul className="list-disc list-inside text-gray-800 space-y-2 mb-6">
            <li>Trưng bày tranh, thơ, video của người sống chung với HIV</li>
            <li>Truyền cảm hứng tích cực, giảm kỳ thị</li>
            <li>Kết nối cảm xúc mạnh mẽ với cộng đồng</li>
            <li>Khơi dậy sự đồng cảm qua nghệ thuật và câu chuyện chân thực</li>
            <li>Tạo không gian sáng tạo để lan tỏa thông điệp yêu thương</li>
          </ul>
        </motion.div>

        {/* Gợi ý đóng góp */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-lg font-semibold text-red-500 mb-2">💡 Gợi ý đóng góp</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Vẽ tranh hoặc gửi ảnh về hành trình sống tích cực</li>
            <li>Viết thơ, truyện ngắn hoặc nhật ký truyền cảm hứng</li>
            <li>Gửi video chia sẻ trải nghiệm, thông điệp yêu thương</li>
          </ul>
        </motion.div>

        {/* Ví dụ tác phẩm minh họa (mock) */}
        <motion.div variants={itemVariants} className="mb-10">
          <h3 className="text-lg font-semibold text-red-500 mb-4">🌟 Một vài tác phẩm tiêu biểu</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {/* PHẦN 1 */}
            <div className="bg-gray-100 rounded-lg p-4 shadow flex flex-col justify-between h-full">
              <div>
                <img
                  src="https://thtanthanh2.pgdtpthainguyen.edu.vn/upload/s/20171225/90e5cfa9791316a4d96830ff5762c426hiv4.jpg"
                  alt="Tác phẩm 1"
                  className="rounded mb-2"
                />
              </div>
              <p className="text-black hover:text-red-500 block text-center">
                <a
                  href="https://thtanthanh2.pgdtpthainguyen.edu.vn/tin-tuc-su-kien/bai-tuyen-truyen-ve-hiv-aids-va-khong-ki-thi-phan-biet-doi-x.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-red-500 block"
                >
                  "Bài tuyên truyền về HIV – AIDS và không kì thị, phân biệt, đối xử với trẻ em bị nhiễm hoặc bị ảnh hưởng bởi HIV"
                </a>
              </p>
            </div>

            {/* PHẦN 2 */}
            <div className="bg-gray-100 rounded-lg p-4 shadow flex flex-col justify-between h-full">
              <div>
                <div className="text-gray-700 bg-white rounded-md p-4 shadow-inner transition hover:shadow-md duration-200 max-h-64 overflow-y-scroll text-center whitespace-pre-line ">
                  {`Thơ phòng, chống HIV

Gì nguy bằng HIV
Đại dịch tàn phá không chê đường nào
Tế bào nó phá ào ào
Tan tành miễn dịch cách nào tránh xa
Chỉ trong một phút trôi qua
Toàn cầu đã có mười ca nhiễm vào
Tử vong mỗi lúc một cao
Tốc độ lây nhiễm nhường nào hiểm nguy.

Nói ra để hết hoài nghi
Có WHO, UNIAIDS vào
Đại dịch lây những đường nào?
Mang thai, tình dục, theo đường máu qua
Tệ nạn mắc phải nhiều ca
Mại dâm, ma túy đường xa thêm gần
Dây vào ta nhẹ lâng lâng
Con đường đại dịch tiến gần ngay đây
Tính chi kẻ dại người ngây
HIV/AIDS nó thề không tha
Trẻ em từ mới sinh ra
Đã nhiễm virus mẹ cha truyền vào.

Cách chữa, cách trị làm sao
Xin thưa chẳng có cách nào chữa xong
Chỉ hay cách tránh, cách phòng
Sống sao lành mạnh mới hòng thoát thân
Không tiêm, không chích, mại dâm
Sống như thế ấy ko lâm đường cùng
Đại dịch hết phá lung tung
Đe dọa tính mạng, hành hung loài người.

Giáo dục tất thẩy mọi người
Trẻ em, người lớn ko cười nạn nhân
Ko kỳ thị, chẳng biệt phân
Hết lòng đối xử nghĩa nhân giúp đời
Tương lai rạn rỡ ngời ngời
HIV/AIDS hết thời hại dân.`}
                </div>
              </div>

              <p className="text-black hover:text-red-500 block text-center">
                <a
                  href="https://tiengchuong.chinhphu.vn/tho-phong-chong-hiv-1-11363.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-red-500 block text-center"
                >
                  Thơ phòng, chống HIV
                </a>
              </p>
            </div>


            {/* PHẦN 3 */}
            <div className="bg-gray-100 rounded-lg p-4 shadow flex flex-col justify-between h-full items-center text-center">
              <div>
                <video controls className="rounded mb-2 w-[300px] max-w-full">
                  <source src={camhungVideo} type="video/mp4" />
                </video>
              </div>
              <p className="text-black hover:text-red-500 block text-center">
                <a>
                  Video về "Những người truyền cảm hứng cho cộng đồng người nhiễm HIV"
                </a>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Ghi chú cuối */}
        <motion.div variants={itemVariants} className="text-sm text-gray-500 italic">
          * Nội dung được chọn lọc từ cộng đồng & các sự kiện đặc biệt.
        </motion.div>
      </motion.section>

      {/* Tài nguyên hỗ trợ cộng đồng */}
      <motion.section
        variants={containerVariants} className="mt-16">
        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-3xl font-bold text-red-600 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-red-600" />
            <span>Tài nguyên hỗ trợ cộng đồng</span>
          </h2>
          <p className="text-gray-600 max-w-xl">
            Các tổ chức và nhóm hỗ trợ người nhiễm HIV – miễn phí, bảo mật, thân thiện và dễ tiếp cận.
          </p>
        </motion.div>

        <div className="space-y-8">
          {[
            {
              logo: "https://life-vietnam.org/wp-content/uploads/2022/12/Logo-LIFE-40.png",
              title: "Trung tâm LIFE (HCM)",
              description:
                "Cung cấp tư vấn, điều trị, và hỗ trợ tâm lý miễn phí cho người sống chung với HIV. Hỗ trợ đặc biệt cho MSM và phụ nữ.",
              link: "https://life-vietnam.org/",
            },
            {
              logo: "data:image/png;base64,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",
              title: "VNP+ - Mạng lưới người sống với HIV",
              description:
                "Kết nối cộng đồng người nhiễm HIV trên toàn quốc, hỗ trợ pháp lý, vận động chính sách và phòng chống kỳ thị.",
              link: "https://www.vietnamplus.vn/",
            },
            {
              logo: "https://www.ics.org.vn/thumb/2-163-60/upload/hinhanh/logo-9933.png",
              title: "ICS Center - Cộng đồng LGBT+",
              description:
                "Hỗ trợ cộng đồng LGBT+ tiếp cận xét nghiệm, điều trị HIV và bảo vệ quyền cá nhân. Hoạt động tại TP.HCM.",
              link: "https://www.ics.org.vn/",
            },
            {
              logo: "https://lighthousevietnam.org/wp-content/uploads/2023/02/logo-lighthouse.png",
              title: "Lighthouse Social Enterprise",
              description:
                "Tổ chức xã hội hỗ trợ MSM và người sống với HIV – cung cấp xét nghiệm nhanh HIV, PrEP, tư vấn đồng hành.",
              link: "https://lighthousevietnam.org/en/home/",
            },
          ].map(({ logo, title, description, link }, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-6 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 border border-gray-100"
              variants={itemVariants}
            >
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border border-gray-200 bg-white">
                <img src={logo} alt={title} className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700">{title}</h3>
                <p className="text-gray-700 text-sm mt-1 mb-2">{description}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-red-500 hover:underline font-medium"
                >
                  Truy cập website →
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>



    </motion.div >
  );
}