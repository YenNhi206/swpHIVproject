
import React from "react";

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <section>
        <h2 className="text-2xl font-bold text-red-600">Giới thiệu cơ sở y tế</h2>
        <p className="mt-2 text-gray-700">
          Cơ sở y tế chuyên điều trị HIV với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-red-600">Tài liệu giáo dục và giảm kỳ thị</h2>
        <ul className="list-disc list-inside mt-2 text-gray-700">
          <li>Kiến thức cơ bản về HIV và điều trị ARV</li>
          <li>Làm thế nào để sống chung với HIV một cách khỏe mạnh</li>
          <li>Phá bỏ kỳ thị và hiểu đúng về HIV</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-red-600">Blog chia sẻ kinh nghiệm</h2>
        <div className="mt-2 text-gray-700">
          <p>✔️ Câu chuyện vượt qua kỳ thị</p>
          <p>✔️ Kinh nghiệm điều trị hiệu quả</p>
          <p>✔️ Lời khuyên từ chuyên gia</p>
        </div>
      </section>
    </div>
  );
}

