import React, { useEffect, useState } from "react";
import { Calendar, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function CreatePrescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorId = Number(localStorage.getItem("doctorId"));
  const patientId = location.state?.patientId;
  const appointmentId = location.state?.appointmentId;
  const token = localStorage.getItem("token");

  function decodeToken(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }

  const [protocols, setProtocols] = useState([]);
  const [form, setForm] = useState({
    protocolId: "",
    startDate: "",
    endDate: "",
    customInstructions: "",
    dosageAdjustments: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch phác đồ ARV
  useEffect(() => {
    fetch("http://localhost:8080/api/arv-protocols/active")
      .then((res) => res.json())
      .then((data) => setProtocols(data))
      .catch(() => setError("Không thể tải danh sách phác đồ."));
  }, []);

  useEffect(() => {
    if (!patientId) {
      alert("Không tìm thấy bệnh nhân. Vui lòng quay lại trang lịch hẹn.");
      navigate("/doctor/appointments");
    }
  }, [patientId, navigate]);

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      patientId: Number(patientId),
      appointmentId: Number(appointmentId),
      doctorId: doctorId, // <-- Đã chắc chắn là số
      protocolId: Number(form.protocolId),
      startDate: form.startDate,
      endDate: form.endDate,
      customInstructions: form.customInstructions,
      dosageAdjustments: form.dosageAdjustments,
      notes: form.notes,
      status: "ACTIVE",
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8080/api/prescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Lỗi ${res.status}: ${text}`);
      }

      alert("Tạo đơn thuốc thành công!");
      navigate("/prescriptions");
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center gap-2">
        <ClipboardList className="w-6 h-6" /> Tạo đơn thuốc mới
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Chọn phác đồ */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Phác đồ ARV
          </label>
          <select
            name="protocolId"
            value={form.protocolId}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">-- Chọn phác đồ --</option>
            {protocols.map((protocol) => (
              <option key={protocol.id} value={protocol.id}>
                {protocol.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ngày bắt đầu */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Ngày bắt đầu
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Ngày kết thúc */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Ngày kết thúc
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full outline-none"
            />
          </div>
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Ghi chú
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ghi chú thêm (nếu có)"
          ></textarea>
        </div>

        {/* Hướng dẫn sử dụng */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Hướng dẫn sử dụng
          </label>
          <textarea
            name="customInstructions"
            value={form.customInstructions}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ví dụ: uống sau ăn sáng"
          ></textarea>
        </div>

        {/* Điều chỉnh liều lượng */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Điều chỉnh liều lượng
          </label>
          <textarea
            name="dosageAdjustments"
            value={form.dosageAdjustments}
            onChange={handleChange}
            rows={2}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ghi rõ nếu cần điều chỉnh"
          ></textarea>
        </div>

        {/* Nút gửi */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Tạo đơn thuốc"}
          </button>
        </div>
      </form>
    </div>
  );
}
