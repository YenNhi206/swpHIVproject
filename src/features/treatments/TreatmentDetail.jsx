import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { message, Modal } from "antd";

export default function TreatmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreatment = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/arv-protocols/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (!res.ok) throw new Error("Không tìm thấy phác đồ");

        const data = await res.json();
        setTreatment(data);
      } catch (err) {
        console.error(err);
        message.error(err.message || "Lỗi khi tải phác đồ");
        navigate("/treatment");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatment();
  }, [id, navigate]);

  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa phác đồ này không?",
      okText: "Xóa",
      okButtonProps: { danger: true },
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/arv-protocols/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          });
          if (!res.ok) throw new Error("Xóa phác đồ thất bại");
          message.success("Xóa phác đồ thành công");
          navigate("/treatment");
        } catch (error) {
          message.error(error.message || "Lỗi khi xóa phác đồ");
        }
      },
    });
  };

  if (loading) {
    return (
      <motion.div className="p-6 min-h-screen bg-gradient-to-b from-red-50 to-white font-sans">
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      </motion.div>
    );
  }

  if (!treatment) {
    return null;
  }

  return (
    <motion.div className="p-6 min-h-screen bg-gradient-to-b from-red-50 to-white font-sans max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6">{treatment.name}</h1>

      <div className="mb-4">
        <strong>Đối tượng áp dụng:</strong> {treatment.targetGroup}
      </div>
      <div className="mb-4">
        <strong>Mô tả:</strong> {treatment.description}
      </div>
      <div className="mb-4">
        <strong>Danh sách thuốc:</strong>{" "}
        {Array.isArray(treatment.medications)
          ? treatment.medications.join(", ")
          : treatment.medications}
      </div>
      <div className="mb-4">
        <strong>Liều dùng:</strong> {treatment.dosage}
      </div>
      <div className="mb-4">
        <strong>Chống chỉ định / thận trọng:</strong> {treatment.contraindications}
      </div>
      <div className="mb-4">
        <strong>Tác dụng phụ:</strong> {treatment.sideEffects}
      </div>
      <div className="mb-4">
        <strong>Theo dõi:</strong> {treatment.monitoring}
      </div>

      <div className="flex gap-4 mt-6">
        <Button label="Quay lại" onClick={() => navigate("/treatment")} />
        <Link to={`/treatment/edit/${treatment.id}`}>
          <Button label="Chỉnh sửa" />
        </Link>
        <Button
          label="Xóa"
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
        />
      </div>
    </motion.div>
  );
}
