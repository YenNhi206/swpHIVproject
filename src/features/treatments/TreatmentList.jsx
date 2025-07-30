import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button";
import { message } from "antd";

export default function TreatmentList() {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchTreatments = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8080/api/arv-protocols/active", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (!res.ok) throw new Error("Không thể tải danh sách phác đồ");

        const data = await res.json();
        setTreatments(data);
      } catch (err) {
        console.error(err);
        message.error("Lỗi khi tải danh sách phác đồ");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, [location.state?.refresh]);

  return (
    <motion.div className="p-6 min-h-screen bg-gradient-to-b from-red-50 to-white font-sans">
      <h1 className="text-3xl font-bold text-red-600 mb-6">Danh sách phác đồ</h1>

      <div className="mt-6 flex justify-end">
        <Link to="/treatment/create">
          <Button label="Tạo phác đồ mới" />
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {treatments.length === 0 ? (
            <p className="text-gray-500">Chưa có phác đồ nào.</p>
          ) : (
            treatments.map((treatment) => (
              <Link
                key={treatment.id}
                to={`/treatment/${treatment.id}`}
                className="p-4 bg-white rounded-xl shadow hover:shadow-md transition border"
              >
                <h2 className="text-xl font-semibold text-red-600">{treatment.name}</h2>
                <p className="text-sm text-gray-500">{treatment.targetGroup}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
