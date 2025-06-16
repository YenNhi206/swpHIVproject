import React from "react";
import hivCareImg from "../assets/hiv-care.png";
import educationImg from "../assets/education.png";
import blogImg from "../assets/blog.jpg";
import hiv1Img from "../assets/hiv1.jpg";
import hivbhytImg from "../assets/hivbhyt.webp";
import hivpaitentImg from "../assets/hivpaitent.jpg";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-16">

      {/* Title chính ở đầu trang */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-red-600">
          Chăm sóc và Hỗ trợ HIV – Vì một cuộc sống khỏe mạnh
        </h1>
      </header>

      {/* Giới thiệu cơ sở y tế */}
      <section className="grid md:grid-cols-2 gap-8 items-center py-12">
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
            🏥 Giới thiệu cơ sở y tế
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Chúng tôi là cơ sở y tế chuyên sâu trong điều trị HIV, với đội ngũ bác sĩ giàu kinh nghiệm, tận tâm và hệ thống trang thiết bị hiện đại, bảo mật. Mục tiêu là mang lại hy vọng và sức khỏe bền vững cho bệnh nhân.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-700">
              ✅ Đội ngũ chuyên gia y tế hàng đầu về HIV/AIDS
            </li>
            <li className="flex items-center text-gray-700">
              ✅ Cơ sở vật chất hiện đại, bảo mật thông tin
            </li>
            <li className="flex items-center text-gray-700">
              ✅ Chương trình chăm sóc toàn diện, hỗ trợ tâm lý
            </li>
            <li className="flex items-center text-gray-700">
              ✅ Đồng hành cùng bệnh nhân trong suốt quá trình điều trị
            </li>
          </ul>
        </div>
      </section>


      {/* Tài liệu giáo dục & giảm kỳ thị */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1 space-y-6">
          <h2 className="text-3xl font-bold text-red-600 mb-4">
            📘 Tài liệu giáo dục & giảm kỳ thị
          </h2>

          {/* Mỗi bài tài liệu */}
          {[
            {
              title: "HIV là gì?, HIV lây nhiễm như thế nào?",
              description:
                "Hầu như tất cả mọi người đều đã từng nghe đến HIV và AIDS, tuy nhiên có rất ít người hiểu đúng về nó. Những sai lầm trong hiểu biết về HIV/AIDS khiến chúng ta có cái nhìn không thiện cảm với bệnh nhân không may mắc phải căn bệnh thế kỷ này. Bài viết sau đây sẽ cung cấp cho bạn những kiến thức cơ bản cần nhớ về HIV và AIDS.",
              link: "https://www.vinmec.com/vie/bai-viet/hiv-va-aids-nhung-dieu-ban-can-nho-vi",
            },
            {
              title: "4 bí quyết sống lâu, sống khỏe cho người nhiễm HIV",
              description:
                "SKĐS - Khi phát hiện mình bị nhiễm HIV, nhiều người cứ nghĩ cuộc đời mình sẽ mất tất cả. Đây là lối suy nghĩ tiêu cực và hết sức sai lầm. Nếu tuân thủ điều trị tốt và thực hành lối sống lành mạnh, người nhiễm HIV vẫn có thể sống khỏe mạnh, lâu dài.Để được sống lâu, sống khỏe, điều quan trọng là người nhiễm HIV cần thực hiện các nguyên tắc sau:",
              link: "https://bvquan5.medinet.gov.vn/hivaids/4-bi-quyet-song-lau-song-khoe-cho-nguoi-nhiem-hiv-cmobile16896-191243.aspx",
            },
            {
              title: "Xóa bỏ kỳ thị và phân biệt đối xử với người nhiễm HIV/AIDS",
              description:
                "Chỉ thị 54-CT/TW, ngày 30/1/2005 của Ban Bí thư “về tăng cường lãnh đạo công tác phòng, chống HIV/AIDS trong tình hình mới” đã nêu: “Phát huy truyền thống tương thân, tương ái, chăm sóc, giúp đỡ của cộng đồng, chống kỳ thị và phân biệt đối xử với người nhiễm HIV/AIDS”.",
              link: "https://btgtu.binhthuan.dcs.vn/Trang-chu/post/1520/xoa-bo-ky-thi-va-phan-biet-doi-xu-voi-nguoi-nhiem-hivaids",
            },
          ].map(({ title, description, link }) => (
            <div
              key={title}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
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
            </div>
          ))}
        </div>

        <div className="order-1 md:order-2 h-full">
          <img
            src={educationImg}
            alt="Giáo dục và giảm kỳ thị"
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>
      </section>

      

      {/* Tin tức & Bài báo về HIV */}
      <section>
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
          📰 Tin tức & Bài báo về HIV
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
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
                "Đây sẽ là thách thức lớn trong việc duy trì ổn định điều trị cho bệnh nhân HIV. Nếu không có thẻ BHYT, người nhiễm HIV sẽ phải chi một số tiền khá lớn để điều trị bằng thuốc ARV.",
              link: "https://baohiemxahoi.gov.vn/gioithieu/Pages/gioi-thieu-chung.aspx?CateID=0&ItemID=11910",
            },
            {
              img: hivpaitentImg,
              alt: "Hành trình sống chung với HIV",
              title: 'Bệnh nhân HIV: HIV không phải là dấu chấm hết, sự đồng cảm giúp tôi vững bước',
              description:
                "SKĐS - Tôi - một bệnh nhân đang sống chung với HIV, hai từ khó khăn không đủ để diễn tả về hành trình của bản thân. Hy vọng, sự đồng cảm và hỗ trợ là những điều giúp tôi vững bước hơn trong cuộc sống.",
              link: "https://bvquan5.medinet.gov.vn/hivaids/benh-nhan-hiv-hiv-khong-phai-la-dau-cham-het-su-dong-cam-giup-toi-vung-buoc-cmobile16896-199511.aspx",
            },
          ].map(({ img, alt, title, description, link }) => (
            <div
              key={title}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition group"
            >
              <img
                src={img}
                alt={alt}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6">
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
              </div>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-red-600 text-white shadow-md py-4 mt-5 border-top text-center small text-secondary position-relative">
        <div className="container">
          <p className="mb-1">
            Bản quyền thuộc về Hệ thống Dịch vụ Y tế và Điều trị HIV - Bộ Y Tế, 2025
          </p>
          <p className="mb-1">
            Trụ sở: 123 Đường Sức Khoẻ, Quận 3, TP. Hồ Chí Minh, Việt Nam - Tel: (028) 1234 5678 - E-mail: contact@hivtreatment.vn
          </p>
          <p className="mb-1">
            Giám đốc hệ thống: TS.BS. Nguyễn Văn A
          </p>
          <p className="mb-3">
            Giấy phép số 123/GP-BC ngày 01/01/2025 của Cục Báo chí, Bộ Văn hoá, Thông tin.
          </p>
        </div>
      </footer>

    </div>
  );
}
