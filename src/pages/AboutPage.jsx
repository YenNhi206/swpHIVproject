import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import healthcareImage from "../assets/healthcare.jpg";

// ✅ Đảm bảo bạn đã cài antd 5+
import { FloatButton } from "antd";
import {
  MessageOutlined,
  CalendarOutlined,
  FilePdfOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

export default function AboutPage() {
  const navigate = useNavigate();
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md">
      <div className="mb-12 overflow-hidden rounded-xl shadow-lg">
        <img
          src={healthcareImage}
          alt="Healthcare"
          className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <section className="mb-16">
        <h1 className="text-3xl font-extrabold text-red-700 mb-6 border-l-4 border-red-600 pl-4">
          Giới thiệu về hệ thống
        </h1>

        <div className="space-y-8">
          {/* Gioiws thiệu về hệ thống */}
          {/* Giới thiệu về hệ thống */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
              Mục đích và Sứ mệnh
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Hệ thống <strong className="text-red-700">HIV Treatment and Medical Services System </strong>
              được phát triển nhằm tăng cường khả năng tiếp cận các <strong>dịch vụ y tế</strong> và <strong>điều trị HIV</strong>
              một cách hiệu quả tại các cơ sở y tế. <br className="hidden md:block" />
              <br />
              Với cam kết đặt <strong>sự an toàn, minh bạch và bảo mật thông tin</strong> lên hàng đầu,
              chúng tôi hướng đến việc xây dựng một nền tảng hỗ trợ điều trị HIV toàn diện,
              đồng hành cùng người bệnh trên hành trình hồi phục và sống khỏe mạnh.
            </p>
          </div>


          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2">
              Chức năng chính
            </h2>
            <ul className="list-disc list-inside text-gray-800 space-y-2 leading-relaxed text-base">
              <li>
                <strong>Đăng ký lịch khám & điều trị:</strong> Chỉ định bác sĩ phù hợp cho từng trường hợp.
              </li>
              <li>
                <strong>Tra cứu kết quả xét nghiệm:</strong> CD4, tải lượng HIV, phác đồ ARV theo thời gian.
              </li>
              <li>
                <strong>Nhắc lịch tái khám & uống thuốc:</strong> Theo đúng phác đồ điều trị.
              </li>
              <li>
                <strong>Đặt lịch hẹn trực tuyến:</strong> Hỗ trợ chế độ ẩn danh nếu cần thiết.
              </li>
              <li>
                <strong>Quản lý hồ sơ:</strong> Dành cho cả bác sĩ và bệnh nhân.
              </li>
              <li>
                <strong>Dashboard & báo cáo:</strong> Hỗ trợ theo dõi và đưa ra quyết định điều trị.
              </li>
              <li>
                <strong>Chia sẻ tài liệu & blog:</strong> Góp phần giảm kỳ thị và nâng cao nhận thức về HIV.
              </li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-3 flex items-center gap-2">
              Đội ngũ phát triển
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nhóm phát triển gồm các chuyên gia công nghệ và bác sĩ có nhiều năm kinh nghiệm trong điều trị HIV/AIDS và phát triển phần mềm y tế.
            </p>
          </div>

          {/* Đối tượng phục vụ */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              Đối tượng phục vụ
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Hệ thống hướng đến phục vụ các đối tượng chính sau:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Đối tượng 1 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
                <div className="text-red-500 text-2xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Người sống chung với HIV/AIDS</h4>
                  <p className="text-sm text-gray-600">Hỗ trợ điều trị và theo dõi sức khỏe định kỳ.</p>
                </div>
              </div>

              {/* Đối tượng 2 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
                <div className="text-red-500 text-2xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Người có nguy cơ cao</h4>
                  <p className="text-sm text-gray-600">
                    Bao gồm MSM, người chuyển giới, tiêm chích ma túy, bạn tình của người nhiễm.
                  </p>
                </div>
              </div>

              {/* Đối tượng 3 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
                <div className="text-red-500 text-2xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Cán bộ y tế, bác sĩ</h4>
                  <p className="text-sm text-gray-600">
                    Quản lý, chăm sóc bệnh nhân và hỗ trợ công tác điều trị HIV.
                  </p>
                </div>
              </div>

              {/* Đối tượng 4 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
                <div className="text-red-500 text-2xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Cộng đồng và người thân</h4>
                  <p className="text-sm text-gray-600">
                    Cung cấp thông tin, hỗ trợ tâm lý và giảm kỳ thị HIV.
                  </p>
                </div>
              </div>

              {/* Đối tượng 5 */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-start gap-4">
                <div className="text-red-500 text-2xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Tổ chức & quản lý y tế</h4>
                  <p className="text-sm text-gray-600">
                    Hỗ trợ quản lý, báo cáo và hoạch định chính sách phòng chống HIV.
                  </p>
                </div>
              </div>
            </div>
          </div>






          {/* Liên hệ */}
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
              Liên hệ
            </h2>

            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 grid sm:grid-cols-2 gap-6">
              {/* Địa chỉ */}
              <div className="flex items-start gap-4">
                <div className="text-red-600 text-xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Địa chỉ</h4>
                  <p className="text-gray-700 text-sm">123 Đường ABC, Thành phố XYZ</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="text-red-600 text-xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Email</h4>
                  <a
                    href="mailto:support@hiv-treatment.com"
                    className="text-sm text-red-600 hover:underline"
                  >
                    support@hiv-treatment.com
                  </a>
                </div>
              </div>

              {/* Điện thoại */}
              <div className="flex items-start gap-4">
                <div className="text-red-600 text-xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Điện thoại</h4>
                  <a
                    href="tel:0123456789"
                    className="text-sm text-red-600 hover:underline"
                  >
                    0123 456 789
                  </a>
                </div>
              </div>

              {/* Giờ làm việc (thêm nếu muốn) */}
              <div className="flex items-start gap-4">
                <div className="text-red-600 text-xl"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Giờ làm việc</h4>
                  <p className="text-gray-700 text-sm">Thứ 2 – Thứ 6: 8h – 17h</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Float Button Group */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ bottom: 100, right: 24 }}
        icon={<PhoneOutlined />}
      >
        <FloatButton
          icon={<MessageOutlined />}
          tooltip={<div>Nhắn tư vấn</div>}
          onClick={() =>
            window.open("https://www.facebook.com/bich.tram.570234", "_blank")
          }
        />
        <FloatButton
          icon={<CalendarOutlined />}
          tooltip={<div>Đặt lịch khám</div>}
          onClick={() => navigate("/appointments")}
        />
        <FloatButton
          icon={<FilePdfOutlined />}
          tooltip={<div>Tài liệu</div>}
          onClick={() =>
            window.open(
              "https://www.prepwatch.org/wp-content/uploads/2019/05/Care_and_Treatment_Guidelines_Vietnam_2017.pdf",
              "_blank"
            )
          }
        />
      </FloatButton.Group>
    </div>
  );
}
