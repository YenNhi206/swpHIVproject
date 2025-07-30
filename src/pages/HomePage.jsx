import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoaderCircle } from 'lucide-react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import hivCareImg from "../assets/hiv-care.png";




const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
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

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };


  useEffect(() => {
    fetch('http://localhost:8080/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  function Section({ title, blogs }) {
    return (
      <motion.section
        className="mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <motion.h2 className="text-3xl font-bold text-red-600 mb-8 text-center flex items-center gap-2">
          <CheckCircle className="w-6 h-6" />
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white shadow-md p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all flex flex-col h-full"
            >
              <div className="text-lg font-semibold text-black mb-2">
                {blog.title}
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {blog.description || blog.content?.slice(0, 100) + '...'}
              </p>
              <div className="text-sm text-gray-400 mb-3 mt-auto">
                <span> {blog.author}</span> •{' '}
                <span>
                  {new Date(blog.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              {blog.link && (
                <a
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Đọc thêm →
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        <LoaderCircle className="animate-spin mr-2" /> Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="p-4">
      <motion.header
        className="text-center mb-10"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-extrabold text-red-700">
          Chăm sóc và Hỗ trợ HIV – Vì một cuộc sống khỏe mạnh
        </h1>
      </motion.header>

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

      <Section
        title="Tài Liệu Giáo Dục Và Giảm Kỳ Thị"
        blogs={blogs.slice(10, 14)}
      />

      <Section
        title="Tin Tức & Bài Báo Về HIV"
        blogs={blogs.slice(14, 17)}
      />

      <Section
        title="Tin Tức & Tiến Bộ Y Học Mới"
        blogs={blogs.slice(17, 24)}
      />
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

    </div>
  );
};

export default HomePage;
