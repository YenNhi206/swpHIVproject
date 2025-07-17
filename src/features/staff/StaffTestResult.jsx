
import React, { useState, useEffect } from "react";
import { PlusCircle, Edit3 } from "lucide-react";

const StaffTestResult = () => {
  const [mode, setMode] = useState("create");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [testCategories] = useState([
    { id: 1, name: "HIV" },
    { id: 2, name: "Viêm gan" },
  ]); // hardcoded for now

  const [createData, setCreateData] = useState({
    patientId: "",
    testCategoryId: "",
    doctorId: "",
    appointmentId: "",
    note: "",
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    resultValue: "",
    resultNote: "",
    status: "",
  });

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetch("http://localhost:8080/api/patients", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setPatients)
      .catch(console.error);

    fetch("http://localhost:8080/api/doctors?page=0&size=100")
      .then((res) => res.json())
      .then((data) => setDoctors(data.content))
      .catch(console.error);

    
  }, []);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams(createData).toString();
      const res = await fetch(`http://localhost:8080/api/test-results?${queryParams}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Lỗi tạo xét nghiệm");
      alert("Tạo xét nghiệm thành công!");
      setCreateData({ patientId: "", testCategoryId: "", doctorId: "", appointmentId: "", note: "" });
      setMode("");
    } catch (err) {
      alert("Lỗi khi tạo xét nghiệm.");
      console.error(err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { id, status, resultValue, resultNote } = updateData;
    try {
      if (status) {
        const resStatus = await fetch(`http://localhost:8080/api/test-results/${id}/status?status=${status}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!resStatus.ok) throw new Error("Lỗi cập nhật trạng thái");
      }

      const resResult = await fetch(`http://localhost:8080/api/test-results/${id}/result`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
        body: new URLSearchParams({ resultValue, resultNote }),
      });

      if (!resResult.ok) throw new Error("Lỗi cập nhật kết quả");

      alert("Cập nhật kết quả thành công!");
      setUpdateData({ id: "", resultValue: "", resultNote: "", status: "" });
      setMode("");
    } catch (err) {
      alert("Lỗi khi cập nhật kết quả.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
        Thêm/ Cập Nhật Xét Nghiệm
      </h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setMode("create")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            mode === "create" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          <PlusCircle className="w-5 h-5" /> Tạo Mới Xét Nghiệm
        </button>
        <button
          onClick={() => setMode("update")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            mode === "update" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          <Edit3 className="w-5 h-5" /> Cập Nhật Kết Quả
        </button>
      </div>

      {mode === "create" && (
        <form onSubmit={handleCreateSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          <select required value={createData.patientId} onChange={(e) => setCreateData({ ...createData, patientId: e.target.value })} className="w-full p-2 border rounded">
            <option value="">-- Chọn bệnh nhân --</option>
            {patients.map((p) => <option key={p.id} value={p.id}>{p.fullName}</option>)}
          </select>
          <select required value={createData.testCategoryId} onChange={(e) => setCreateData({ ...createData, testCategoryId: e.target.value })} className="w-full p-2 border rounded">
            <option value="">-- Chọn loại xét nghiệm --</option>
            {testCategories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <select value={createData.doctorId} onChange={(e) => setCreateData({ ...createData, doctorId: e.target.value })} className="w-full p-2 border rounded">
            <option value="">-- Chọn bác sĩ (tuỳ chọn) --</option>
            {doctors.map((d) => <option key={d.id} value={d.id}>{d.fullName}</option>)}
          </select>
          <select value={createData.appointmentId} onChange={(e) => setCreateData({ ...createData, appointmentId: e.target.value })} className="w-full p-2 border rounded">
            <option value="">-- Chọn lịch hẹn (tuỳ chọn) --</option>
            {appointments.map((a) => <option key={a.id} value={a.id}>{`Lịch #${a.id}`}</option>)}
          </select>
          <textarea placeholder="Ghi chú thêm (nếu có)" value={createData.note} onChange={(e) => setCreateData({ ...createData, note: e.target.value })} className="w-full p-2 border rounded"></textarea>
          <div className="flex gap-4">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Tạo mới</button>
            <button type="button" onClick={() => setMode("")} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Huỷ</button>
          </div>
        </form>
      )}

      {mode === "update" && (
        <form onSubmit={handleUpdateSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
          <input type="number" value={updateData.id} onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })} required className="w-full p-2 border rounded" placeholder="ID xét nghiệm" />
          <select value={updateData.status} onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })} className="w-full p-2 border rounded">
            <option value="">-- Chọn trạng thái --</option>
            <option value="PENDING">Chờ xử lý</option>
            <option value="IN_PROGRESS">Đang thực hiện</option>
            <option value="COMPLETED">Hoàn thành</option>
            <option value="CANCELLED">Đã huỷ</option>
          </select>
          <input type="text" value={updateData.resultValue} onChange={(e) => setUpdateData({ ...updateData, resultValue: e.target.value })} required className="w-full p-2 border rounded" placeholder="Kết quả" />
          <textarea placeholder="Ghi chú thêm (nếu có)" value={updateData.resultNote} onChange={(e) => setUpdateData({ ...updateData, resultNote: e.target.value })} className="w-full p-2 border rounded"></textarea>
          <div className="flex gap-4">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Cập nhật</button>
            <button type="button" onClick={() => setMode("")} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">Huỷ</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StaffTestResult;
