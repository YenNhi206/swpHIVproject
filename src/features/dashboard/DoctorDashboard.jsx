import React from "react";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">Bảng điều khiển Bác sĩ</h1>

      {/* Thông tin bác sĩ */}
      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Thông tin cá nhân</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Họ tên:</strong> TS. Nguyễn Văn A</p>
          <p><strong>Chuyên môn:</strong> HIV/AIDS</p>
          <p><strong>Bằng cấp:</strong> Bác sĩ Chuyên khoa II</p>
          <p><strong>Kinh nghiệm:</strong> 10 năm</p>
        </div>
      </section>

      {/* Lịch hẹn hôm nay */}
      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Lịch hẹn hôm nay</h2>
        <ul className="list-disc ml-5">
          <li>10:00 - Nguyễn Thị A (Khám định kỳ)</li>
          <li>11:00 - (Ẩn danh) (Tư vấn ARV)</li>
        </ul>
      </section>

      {/* Danh sách bệnh nhân */}
      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Bệnh nhân của tôi</h2>
        <ul className="list-disc ml-5">
          <li>Nguyễn Văn B</li>
          <li>Trần Thị C</li>
        </ul>
      </section>

      {/* Phác đồ điều trị */}
      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Phác đồ điều trị</h2>
        <p>Ví dụ: TDF + 3TC + DTG</p>
        <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">Tùy chỉnh</button>
      </section>

      {/* Kết quả xét nghiệm */}
      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Theo dõi CD4 / HIV Load</h2>
        <p>Hiển thị biểu đồ diễn tiến CD4, tải lượng virus...</p>
      </section>

      {/* Nhắn tin tư vấn */}
      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Tư vấn & Nhắn tin</h2>
        <p>Gửi và nhận tin nhắn bảo mật với bệnh nhân</p>
        <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700">Xem tin nhắn</button>
      </section>

      {/* Ghi chú và báo cáo */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-2">Ghi chú & Báo cáo</h2>
        <textarea placeholder="Ghi chú nhanh..." className="w-full p-2 border rounded-md" rows={3}></textarea>
        <button className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700">Lưu báo cáo</button>
      </section>
    </div>
  );
}