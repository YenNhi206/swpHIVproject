import React, { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";

const StaffTestResult = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [testCategories, setTestCategories] = useState([]);

  const [createData, setCreateData] = useState({
    patientId: "",
    testCategoryId: "",
    doctorId: "",
    note: "",
  });

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetch("http://localhost:8080/api/patients", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPatients)
      .catch(console.error);

    fetch("http://localhost:8080/api/doctors?page=0&size=100", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setDoctors(data.content))
      .catch(console.error);

    fetch("http://localhost:8080/api/test-results/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setTestCategories)
      .catch(console.error);
  }, [token]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const { patientId, testCategoryId, doctorId, note } = createData;

    try {
      const res = await fetch(`http://localhost:8080/api/test-results`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          testCategoryId,
          doctorId: doctorId || null,
          note: note || "",
        }),
      });

      if (!res.ok) throw new Error("Lỗi tạo xét nghiệm");

      alert("Tạo xét nghiệm thành công!");
      setCreateData({ patientId: "", testCategoryId: "", doctorId: "", note: "" });
    } catch (err) {
      alert("Lỗi khi tạo xét nghiệm.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
        Tạo Mới Xét Nghiệm
      </h1>

      <form
        onSubmit={handleCreateSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
      >
        <select
          required
          value={createData.patientId}
          onChange={(e) => setCreateData({ ...createData, patientId: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Chọn bệnh nhân --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.fullName}
            </option>
          ))}
        </select>

        <select
          required
          value={createData.testCategoryId}
          onChange={(e) => setCreateData({ ...createData, testCategoryId: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Chọn loại xét nghiệm --</option>
          {testCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={createData.doctorId}
          onChange={(e) => setCreateData({ ...createData, doctorId: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Chọn bác sĩ (tuỳ chọn) --</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.fullName}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Ghi chú thêm (nếu có)"
          value={createData.note}
          onChange={(e) => setCreateData({ ...createData, note: e.target.value })}
          className="w-full p-2 border rounded"
        ></textarea>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Tạo mới
          </button>
          <button
            type="button"
            onClick={() => setCreateData({ patientId: "", testCategoryId: "", doctorId: "", note: "" })}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffTestResult;
