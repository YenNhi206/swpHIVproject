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
    active: true,
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
      navigate("/treatment");
    } catch (err) {
      console.error(err);
      message.error(err.message || "Lỗi khi tạo phác đồ");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "rounded-xl border border-gray-300 p-3 w-full focus:outline-none focus:ring-2 focus:ring-red-500";
  const labelClass = "text-sm font-medium mb-1 text-gray-700";

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-4 md:px-10 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg border max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Tạo phác đồ điều trị ARV</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Tên phác đồ</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ví dụ: TDF + 3TC + DTG"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Đối tượng áp dụng</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">-- Chọn đối tượng --</option>
                <option value="Người lớn">Người lớn</option>
                <option value="Trẻ em">Trẻ em</option>
                <option value="Phụ nữ mang thai">Phụ nữ mang thai</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Danh sách thuốc</label>
              <textarea
                name="ingredients"
                value={form.ingredients}
                onChange={handleChange}
                rows={3}
                placeholder="TDF, 3TC, DTG"
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Liều dùng</label>
              <textarea
                name="dosage"
                value={form.dosage}
                onChange={handleChange}
                rows={3}
                placeholder="1 viên/ngày..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Chỉ định</label>
              <textarea
                name="indication"
                value={form.indication}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Tác dụng phụ</label>
              <textarea
                name="sideEffects"
                value={form.sideEffects}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Theo dõi</label>
              <textarea
                name="monitoring"
                value={form.monitoring}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Chống chỉ định / thận trọng</label>
              <textarea
                name="precautions"
                value={form.precautions}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className={labelClass}>Thời gian điều trị</label>
              <textarea
                name="duration"
                value={form.duration}
                onChange={handleChange}
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Đánh giá</label>
              <textarea
                name="evaluation"
                value={form.evaluation}
                onChange={handleChange}
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button label="Quay lại" onClick={() => navigate("/treatment")} disabled={loading} />
            <Button label={loading ? "Đang lưu..." : "Lưu"} type="submit" disabled={loading} />
          </div>
        </form>

      </div>
    </motion.div>
  );
}
