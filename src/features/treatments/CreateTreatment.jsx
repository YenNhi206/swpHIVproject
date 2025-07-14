import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { message } from "antd";

export default function CreateTreatment() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    dosage: "",
    indication: "",
    sideEffects: "",
    monitoring: "",
    precautions: "",
    category: "",
    duration: "",
    evaluation: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/arv-protocols", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          name: form.name,
          description: form.indication,
          targetGroup: form.category,
          medications: form.ingredients
            ? form.ingredients.split(",").map((s) => s.trim())
            : [],
          dosage: form.dosage,
          contraindications: form.precautions,
          sideEffects: form.sideEffects,
          monitoring: form.monitoring,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Lỗi khi tạo phác đồ");
      }

      message.success("Tạo phác đồ thành công!");
      navigate("/doctor/treatment");
    } catch (err) {
      console.error(err);
      message.error(err.message || "Lỗi khi tạo phác đồ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-4 md:px-10 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-md border max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Tạo phác đồ điều trị ARV</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Tên phác đồ</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ví dụ: TDF + 3TC + DTG"
                className="input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Đối tượng áp dụng</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="input"
              >
                <option value="">-- Chọn đối tượng --</option>
                <option value="Người lớn">Người lớn</option>
                <option value="Trẻ em">Trẻ em</option>
                <option value="Phụ nữ mang thai">Phụ nữ mang thai</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Danh sách thuốc</label>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                rows={2}
                placeholder="TDF, 3TC, DTG"
                className="input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Liều dùng</label>
              <textarea
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                rows={2}
                placeholder="1 viên/ngày..."
                className="input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Chỉ định</label>
              <textarea
                name="indication"
                value={form.indication}
                onChange={handleChange}
                rows={2}
                className="input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Tác dụng phụ</label>
              <textarea
                name="sideEffects"
                value={form.sideEffects}
                onChange={handleChange}
                rows={2}
                className="input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Theo dõi</label>
              <textarea
                name="monitoring"
                value={form.monitoring}
                onChange={handleChange}
                rows={2}
                className="input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Chống chỉ định / thận trọng</label>
              <textarea
                name="precautions"
                value={form.precautions}
                onChange={handleChange}
                rows={2}
                className="input"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Thời gian điều trị</label>
              <textarea
                name="duration"
                value={form.duration}
                onChange={handleChange}
                rows={2}
                className="input"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Đánh giá</label>
              <textarea
                name="evaluation"
                value={form.evaluation}
                onChange={handleChange}
                rows={2}
                className="input"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button label="Quay lại" onClick={() => navigate("/doctor/treatment")} disabled={loading} />
            <Button label={loading ? "Đang lưu..." : "Lưu"} type="submit" disabled={loading} />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
