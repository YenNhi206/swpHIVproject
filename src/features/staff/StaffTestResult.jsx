import React, { useState, useEffect } from "react";

const StaffTestResult = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [testCategories, setTestCategories] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [createData, setCreateData] = useState({
    patientId: "",
    testCategoryId: "",
    doctorId: "",
    note: "",
  });

  const [updateData, setUpdateData] = useState({
    testResultId: "",
    resultValue: "",
    resultNote: "",
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


  useEffect(() => {
    if (showUpdateForm) {
      fetch("http://localhost:8080/api/test-results", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {

          if (Array.isArray(data)) setTestResults(data);
          else if (Array.isArray(data.content)) setTestResults(data.content);
          else setTestResults([]);
        })
        .catch(console.error);
    }
  }, [showUpdateForm, token]);

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const { patientId, testCategoryId, doctorId, note } = createData;

    try {
      const params = new URLSearchParams();
      params.append("patientId", patientId);
      params.append("testCategoryId", testCategoryId);
      if (doctorId) params.append("doctorId", doctorId);
      if (note) params.append("note", note);

      const res = await fetch(`http://localhost:8080/api/test-results?${params.toString()}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Lỗi tạo xét nghiệm");

      alert("Tạo xét nghiệm thành công!");
      setCreateData({ patientId: "", testCategoryId: "", doctorId: "", note: "" });
    } catch (err) {
      alert("Lỗi khi tạo xét nghiệm.");
      console.error(err);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { testResultId, resultValue, resultNote } = updateData;

    if (!testResultId || !resultValue) {
      alert("Vui lòng chọn xét nghiệm và nhập kết quả!");
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("resultValue", resultValue);
      if (resultNote) params.append("resultNote", resultNote);

      const res = await fetch(
        `http://localhost:8080/api/test-results/${testResultId}/result?${params.toString()}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Lỗi cập nhật kết quả");

      alert("Cập nhật thành công!");
      setUpdateData({ testResultId: "", resultValue: "", resultNote: "" });
      setShowUpdateForm(false);
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
          onClick={() => setShowUpdateForm(false)}
          className={`flex items-center gap-2 px-4 py-2 rounded font-semibold border transition 
            ${!showUpdateForm
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
        >
          <span className="text-lg"></span> Tạo Mới Xét Nghiệm
        </button>

        <button
          onClick={() => setShowUpdateForm(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded font-semibold border transition 
            ${showUpdateForm
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"}
          `}
        >
          <span className="text-lg"></span> Cập Nhật Kết Quả
        </button>
      </div>

      {!showUpdateForm && (
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
              onClick={() =>
                setCreateData({
                  patientId: "",
                  testCategoryId: "",
                  doctorId: "",
                  note: "",
                })
              }
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Huỷ
            </button>
          </div>
        </form>
      )}

      {showUpdateForm && (
        <form
          onSubmit={handleUpdateSubmit}
          className="space-y-4 bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Cập nhật kết quả xét nghiệm
          </h2>
          <select
            value={updateData.testResultId}
            onChange={(e) =>
              setUpdateData({ ...updateData, testResultId: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          >
            <option value="">-- Chọn xét nghiệm cần cập nhật --</option>
            {testResults.map((tr) => (
              <option key={tr.id} value={tr.id}>
                {`ID: ${tr.id}`}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Giá trị kết quả"
            value={updateData.resultValue}
            onChange={(e) =>
              setUpdateData({ ...updateData, resultValue: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            placeholder="Ghi chú kết quả (tuỳ chọn)"
            value={updateData.resultNote}
            onChange={(e) =>
              setUpdateData({ ...updateData, resultNote: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cập nhật kết quả
          </button>
        </form>
      )}
    </div>
  );
};

export default StaffTestResult;