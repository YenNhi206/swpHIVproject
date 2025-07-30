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

  const [patientPrescriptions, setPatientPrescriptions] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      patientId: Number(patientId),
      appointmentId: Number(appointmentId),
      doctorId: doctorId,
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
      navigate("/patientappointments");
    } catch (err) {
      setError(err.message || "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("===> patientId FE:", patientId);
  }, [patientId]);

  useEffect(() => {
    if (patientId) {
      console.log("Fetching prescriptions for patientId:", patientId);
      fetch(`http://localhost:8080/api/prescriptions/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Prescriptions data:", data);
          setPatientPrescriptions(data);
        })
        .catch((err) => {
          console.error("Không thể tải danh sách đơn thuốc bệnh nhân:", err);
          setPatientPrescriptions([]);
        });
    }
  }, [patientId, token]);

  useEffect(() => {
    if (appointmentId) {
      console.log("Fetching prescriptions for appointmentId:", appointmentId);
      fetch(
        `http://localhost:8080/api/prescriptions/appointment/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Appointment prescriptions data:", data);
          if (data && data.length > 0) {
            setPatientPrescriptions(data);
          }
        })
        .catch((err) => {
          console.error(
            "Không thể tải danh sách đơn thuốc theo appointment:",
            err
          );
        });
    }
  }, [appointmentId, token]);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center gap-2">
        <ClipboardList className="w-6 h-6" /> Tạo đơn thuốc mới
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Đơn thuốc đã kê cho bệnh nhân
          </h3>
          <div className="text-sm text-gray-500">
            Tổng cộng: {patientPrescriptions.length} đơn thuốc
          </div>
        </div>
        {patientPrescriptions.length === 0 ? (
          <p className="text-gray-500">Chưa có đơn thuốc nào.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border">
                <div className="text-blue-600 font-semibold">
                  {
                    patientPrescriptions.filter((p) => p.status === "ACTIVE")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Đang hoạt động</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border">
                <div className="text-green-600 font-semibold">
                  {
                    patientPrescriptions.filter((p) => p.status === "SUSPENDED")
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Tạm ngưng</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border">
                <div className="text-red-600 font-semibold">
                  {
                    patientPrescriptions.filter(
                      (p) => p.status === "DISCONTINUED"
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Đã dừng</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <div className="text-gray-600 font-semibold">
                  {patientPrescriptions.length}
                </div>
                <div className="text-sm text-gray-600">Tổng cộng</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border">#</th>
                    <th className="px-4 py-2 text-left border">Phác đồ</th>
                    <th className="px-4 py-2 text-left border">Ngày kê</th>
                    <th className="px-4 py-2 text-left border">Từ ngày</th>
                    <th className="px-4 py-2 text-left border">Đến ngày</th>
                    <th className="px-4 py-2 text-left border">Trạng thái</th>
                    <th className="px-4 py-2 text-left border">
                      Hướng dẫn sử dụng
                    </th>
                    <th className="px-4 py-2 text-left border">
                      Điều chỉnh liều lượng
                    </th>
                    <th className="px-4 py-2 text-left border">Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {patientPrescriptions.map((pres, index) => (
                    <tr key={pres.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2 border font-medium">
                        {index + 1}
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="font-medium text-blue-600">
                          {pres.protocolName || pres.protocolId || "Không rõ"}
                        </div>
                        {pres.protocolId && (
                          <div className="text-xs text-gray-500">
                            ID: {pres.protocolId}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {pres.prescribedDate ? (
                          <span className="text-purple-600 font-medium text-sm">
                            {new Date(pres.prescribedDate).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            Không có
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {pres.startDate || pres.startDateLocal ? (
                          <span className="text-green-600 font-medium text-sm">
                            {new Date(
                              pres.startDate || pres.startDateLocal
                            ).toLocaleDateString("vi-VN")}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            Chưa có
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        {pres.endDate || pres.endDateLocal ? (
                          <span className="text-orange-600 font-medium text-sm">
                            {new Date(
                              pres.endDate || pres.endDateLocal
                            ).toLocaleDateString("vi-VN")}
                          </span>
                        ) : (
                          <span className="text-gray-400 italic text-xs">
                            Chưa kết thúc
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${pres.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : pres.status === "DISCONTINUED"
                              ? "bg-red-100 text-red-800"
                              : pres.status === "SUSPENDED"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                        >
                          {pres.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="max-w-xs">
                          {pres.customInstructions ? (
                            <span className="text-sm text-gray-700">
                              {pres.customInstructions}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic text-xs">
                              Không có
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="max-w-xs">
                          {pres.dosageAdjustments ? (
                            <span className="text-sm text-gray-700">
                              {pres.dosageAdjustments}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic text-xs">
                              Không có
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-2 border">
                        <div className="max-w-xs">
                          {pres.notes ? (
                            <span className="text-sm text-gray-700">
                              {pres.notes}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic text-xs">
                              Không có
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
