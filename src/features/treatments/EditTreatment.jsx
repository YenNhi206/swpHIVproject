import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { message } from "antd";
import Button from "../../components/Button";

export default function EditTreatment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/api/arv-protocols/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });
        if (!res.ok) throw new Error("Không tìm thấy phác đồ");
        const data = await res.json();

        setForm({
          name: data.name || "",
          category: data.targetGroup || "",
          ingredients: Array.isArray(data.medications) ? data.medications.join(", ") : "",
          dosage: data.dosage || "",
          indication: data.description || "",
          sideEffects: data.sideEffects || "",
          monitoring: data.monitoring || "",
          precautions: data.contraindications || "",
        });
      } catch (err) {
        console.error(err);
        message.error(err.message || "Lỗi khi tải dữ liệu");
        navigate("/treatment");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        targetGroup: form.category,
        medications:
          form.ingredients.trim() === ""
            ? []
            : form.ingredients.split(",").map((s) => s.trim()),
        dosage: form.dosage,
        description: form.indication,
        sideEffects: form.sideEffects,
        monitoring: form.monitoring,
        contraindications: form.precautions,
      };

      const res = await fetch(`http://localhost:8080/api/arv-protocols/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = "Lỗi khi lưu thay đổi";
        try {
          const errData = await res.json();
          errorMessage = errData.message || errorMessage;
        } catch {
          const text = await res.text();
          console.error("Server response:", text);
        }
        throw new Error(errorMessage);
      }

      message.success("Cập nhật phác đồ thành công!");
      navigate(`/treatment/${id}`);
    } catch (err) {
      console.error(err);
      message.error(err.message || "Lỗi khi lưu thay đổi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Đang tải dữ liệu...</p>;
  if (!form) return <p className="p-6 text-red-600">Không tìm thấy dữ liệu phác đồ.</p>;

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-10 px-4 md:px-8 font-sans">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md border max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Chỉnh sửa Phác đồ ARV</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">Tên phác đồ</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>

          <div className="col-span-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">Đối tượng áp dụng</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input w-full"
              required
            >
              <option value="">-- Chọn đối tượng --</option>
              <option value="Người lớn">Người lớn</option>
              <option value="Trẻ em">Trẻ em</option>
              <option value="Phụ nữ mang thai">Phụ nữ mang thai</option>
            </select>
          </div>

          {[
            { key: "ingredients", label: "Danh sách thuốc (cách nhau dấu phẩy)" },
            { key: "dosage", label: "Liều dùng" },
            { key: "indication", label: "Chỉ định" },
            { key: "sideEffects", label: "Tác dụng phụ" },
            { key: "monitoring", label: "Theo dõi" },
            { key: "precautions", label: "Chống chỉ định / Thận trọng" },
          ].map(({ key, label }) => (
            <div key={key} className="col-span-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                rows={2}
                className="input w-full"
                placeholder={label}
              />
            </div>
          ))}

          <div className="col-span-full flex justify-end gap-3 mt-4">
            <Button
              label="Quay lại"
              type="button"
              onClick={() => navigate(`/treatment/${id}`)}
              disabled={saving}
            />
            <Button
              label={saving ? "Đang lưu..." : "Lưu thay đổi"}
              type="submit"
              disabled={saving}
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
}
