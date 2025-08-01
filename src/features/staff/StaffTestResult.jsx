import React, { useState, useEffect } from "react";

const StaffTestResult = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [testCategories, setTestCategories] = useState([]);
  const [searchPatient, setSearchPatient] = useState("");

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
      const params = new URLSearchParams();
      params.append("patientId", patientId);
      params.append("testCategoryId", testCategoryId);
      if (doctorId) params.append("doctorId", doctorId);
      if (note) params.append("note", note);

      const res = await fetch(
        `http://localhost:8080/api/test-results?${params.toString()}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Lỗi tạo xét nghiệm");

      alert("Tạo xét nghiệm thành công!");
      setCreateData({ patientId: "", testCategoryId: "", doctorId: "", note: "" });
      setSearchPatient("");
    } catch (err) {
      alert("Lỗi khi tạo xét nghiệm.");
      console.error(err);
    }
  };

  const inputClass =
    "w-full p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
        Thêm Xét Nghiệm Mới
      </h1>

      <form
        onSubmit={handleCreateSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-lg"
      >
        <div>
          <p className="text-lg font-semibold mb-2">Chọn bệnh nhân:</p>

          <input
            type="text"
            placeholder="Tìm theo tên bệnh nhân..."
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
            className={inputClass + " mb-3"}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {patients
              .filter((p) =>
                p.fullName.toLowerCase().includes(searchPatient.toLowerCase())
              )
              .map((p) => (
                <button
                  type="button"
                  key={p.id}
                  onClick={() => setCreateData({ ...createData, patientId: p.id })}
                  className={`w-full text-left px-4 py-2 rounded-xl border shadow-sm transition-all
                    ${createData.patientId === p.id
                      ? "bg-red-600 text-white"
                      : "bg-white hover:bg-red-100 border-gray-300 text-gray-800"
                    }`}
                >
                  {p.fullName}
                </button>
              ))}
          </div>
        </div>

        {createData.patientId && (
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4 mt-4">
            <p className="text-lg font-semibold text-gray-700">Thông tin xét nghiệm</p>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Loại xét nghiệm <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={createData.testCategoryId}
                onChange={(e) =>
                  setCreateData({ ...createData, testCategoryId: e.target.value })
                }
                className={inputClass}
              >
                <option value="">-- Chọn loại xét nghiệm --</option>
                {testCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Bác sĩ chỉ định (tuỳ chọn)
              </label>
              <select
                value={createData.doctorId}
                onChange={(e) =>
                  setCreateData({ ...createData, doctorId: e.target.value })
                }
                className={inputClass}
              >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-600">
                Ghi chú (nếu có)
              </label>
              <textarea
                placeholder="Ghi chú thêm"
                value={createData.note}
                onChange={(e) =>
                  setCreateData({ ...createData, note: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700"
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
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-xl hover:bg-gray-400"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffTestResult;
