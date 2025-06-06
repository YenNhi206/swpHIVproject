import React from "react";
import hivCareImg from "../assets/hiv-care.png";
import educationImg from "../assets/education.png";
import blogImg from "../assets/blog.jpg";

export default function HomePage() {
  return (

    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      {/* Giới thiệu cơ sở y tế */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <img
            src={hivCareImg}
            alt="Giới thiệu cơ sở y tế"
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-red-600 mb-2">
            🏥 Giới thiệu cơ sở y tế
          </h2>
          <p className="text-gray-700 text-lg">
            Chúng tôi là cơ sở y tế chuyên sâu trong điều trị HIV, với đội ngũ bác sĩ giàu kinh nghiệm, tận tâm và hệ thống trang thiết bị hiện đại, bảo mật. Mục tiêu là mang lại hy vọng và sức khỏe bền vững cho bệnh nhân.
          </p>
        </div>
      </section>

      {/* Tài liệu giáo dục */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            📘 Tài liệu giáo dục & giảm kỳ thị
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
            <li>Kiến thức cơ bản về HIV và điều trị ARV</li>
            <li>Cách sống khỏe mạnh với HIV</li>
            <li>Phá bỏ kỳ thị – Hiểu đúng, thương đúng</li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={educationImg}
            alt="Giáo dục và giảm kỳ thị"
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      </section>

      {/* Blog chia sẻ */}
      <section>
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          ✍️ Blog chia sẻ kinh nghiệm
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              💡 Câu chuyện vượt qua kỳ thị
            </h3>
            <p className="text-gray-600 text-sm">
              Những hành trình thật từ người sống chung với HIV – cách họ đối mặt với ánh nhìn xã hội và vượt lên chính mình.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🧬 Kinh nghiệm điều trị hiệu quả
            </h3>
            <p className="text-gray-600 text-sm">
              Chia sẻ về quá trình điều trị ARV, theo dõi tải lượng HIV, và cách duy trì tâm lý tích cực khi điều trị lâu dài.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              👨‍⚕️ Lời khuyên từ chuyên gia
            </h3>
            <p className="text-gray-600 text-sm">
              Phỏng vấn các bác sĩ chuyên khoa HIV/AIDS về lời khuyên điều trị, lối sống, và cập nhật y khoa mới nhất.
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <img
            src={blogImg}
            alt="Blog cộng đồng"
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />

        </div>
      </header>

      {/* Title dưới header */}
      <div className="text-center my-10">
        <h2 className="text-3xl font-extrabold text-red-600">
          Chăm sóc và Hỗ trợ HIV – Vì một cuộc sống khỏe mạnh
        </h2>
      </div>



      {/* Main Content */}
      <main className="p-6 space-y-10 max-w-4xl mx-auto" id="explore">
        <section>
          <h2 className="text-2xl font-bold text-red-600">Giới thiệu cơ sở y tế</h2>
          <p className="mt-2 text-gray-700">
            Cơ sở y tế chuyên điều trị HIV với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-red-600">Tài liệu giáo dục và giảm kỳ thị</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
            <li>Kiến thức cơ bản về HIV và điều trị ARV</li>
            <li>Làm thế nào để sống chung với HIV một cách khỏe mạnh</li>
            <li>Phá bỏ kỳ thị và hiểu đúng về HIV</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-red-600">Blog chia sẻ kinh nghiệm</h2>
          <div className="mt-2 text-gray-700 space-y-1">
            <p>✔️ Câu chuyện vượt qua kỳ thị</p>
            <p>✔️ Kinh nghiệm điều trị hiệu quả</p>
            <p>✔️ Lời khuyên từ chuyên gia</p>
          </div>
        </section>
      </main>

      
    </div>
  );
}
