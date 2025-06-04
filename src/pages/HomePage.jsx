import React from "react";

export default function HomePage() {
  return (
    <div>
      <header>
        <div
          className="relative bg-cover bg-center min-h-[80vh] flex items-center justify-center text-white"
          style={{
            backgroundImage: "url('https://charlescountyhealth.org/wp-content/uploads/2022/01/HIV-Services.jpg')",
          }}
        >
          <div className="text-center bg-black/50 backdrop-brightness-75 p-8 rounded-xl max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Chào mừng bạn đến với HIV Care+</h1>
            <p className="text-lg md:text-xl mb-6">
              Nơi chia sẻ kiến thức, hỗ trợ và đồng hành cùng bạn trong hành trình sống khỏe với HIV.
            </p>
            <a
              href="#explore"
              className="inline-block text-white px-6 py-3 rounded-lg text-lg transition"
              style={{
                backgroundColor: "#E7000B", color: "#FFFFFF",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF", e.currentTarget.style.color = "#E7000B")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#E7000B", e.currentTarget.style.color = "#FFFFFF")}
            >
              Khám phá ngay
            </a>
          </div>
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
