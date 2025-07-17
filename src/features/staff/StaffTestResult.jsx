import React, { useState } from "react";
import { PlusCircle, Edit3 } from "lucide-react";

const StaffTestResult = () => {
    const [mode, setMode] = useState("create");

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

    // MOCK DATA
    const patients = [{ id: 1, name: "Nguyễn Văn A" }, { id: 2, name: "Trần Thị B" }];
    const testCategories = [{ id: 1, name: "HIV" }, { id: 2, name: "Viêm gan" }];
    const doctors = [{ id: 10, name: "BS. Hoàng" }, { id: 11, name: "BS. Mai" }];
    const appointments = [{ id: 100, label: "Lịch 1" }, { id: 101, label: "Lịch 2" }];

    // Tạo mới xét nghiệm - sử dụng fetch
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/test-results", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createData),
            });

            if (!response.ok) throw new Error("Tạo xét nghiệm thất bại");
            alert("Tạo xét nghiệm thành công!");
        } catch (error) {
            console.error("Lỗi khi tạo xét nghiệm:", error);
            alert("Lỗi khi tạo xét nghiệm.");
        }
    };

    // Cập nhật kết quả xét nghiệm - sử dụng fetch
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cập nhật kết quả
            const resultRes = await fetch(`/api/test-results/${updateData.id}/result`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    resultValue: updateData.resultValue,
                    resultNote: updateData.resultNote,
                }),
            });

            // Cập nhật trạng thái nếu cần
            const statusRes = await fetch(`/api/test-results/${updateData.id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: updateData.status,
                }),
            });

            if (!resultRes.ok || !statusRes.ok) throw new Error("Cập nhật thất bại");

            alert("Cập nhật kết quả thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
            alert("Lỗi khi cập nhật kết quả.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center text-red-600">Thêm/ Cập Nhật Xét Nghiệm</h1>

            {/* Nút chức năng */}
            <div className="flex justify-center gap-4 mb-8">
                <button
                    onClick={() => setMode("create")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${mode === "create" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    <PlusCircle className="w-5 h-5" /> Tạo Mới Xét Nghiệm
                </button>
                <button
                    onClick={() => setMode("update")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${mode === "update" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"}`}
                >
                    <Edit3 className="w-5 h-5" /> Cập Nhật Kết Quả
                </button>
            </div>

            {/* Form tạo mới */}
            {mode === "create" && (
                <form onSubmit={handleCreateSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
                    <div>
                        <label className="block font-medium mb-1">Bệnh nhân</label>
                        <select
                            value={createData.patientId}
                            onChange={(e) => setCreateData({ ...createData, patientId: e.target.value })}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Chọn bệnh nhân --</option>
                            {patients.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Loại xét nghiệm</label>
                        <select
                            value={createData.testCategoryId}
                            onChange={(e) => setCreateData({ ...createData, testCategoryId: e.target.value })}
                            required
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Chọn loại xét nghiệm --</option>
                            {testCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Bác sĩ (tuỳ chọn)</label>
                        <select
                            value={createData.doctorId}
                            onChange={(e) => setCreateData({ ...createData, doctorId: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Chọn bác sĩ --</option>
                            {doctors.map((d) => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Lịch hẹn (tuỳ chọn)</label>
                        <select
                            value={createData.appointmentId}
                            onChange={(e) => setCreateData({ ...createData, appointmentId: e.target.value })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">-- Chọn lịch hẹn --</option>
                            {appointments.map((a) => (
                                <option key={a.id} value={a.id}>{a.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Ghi chú</label>
                        <textarea
                            value={createData.note}
                            onChange={(e) => setCreateData({ ...createData, note: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="Ghi chú thêm (nếu có)"
                        ></textarea>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Tạo mới
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("")}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Huỷ
                        </button>
                    </div>
                </form>
            )}

            {/* Form cập nhật kết quả */}
            {mode === "update" && (
                <form onSubmit={handleUpdateSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg">
                    <div>
                        <label className="block font-medium mb-1">ID xét nghiệm</label>
                        <input
                            type="number"
                            value={updateData.id}
                            onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                            placeholder="Nhập ID xét nghiệm cần cập nhật"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Trạng thái xét nghiệm</label>
                        <select
                            value={updateData.status}
                            onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">-- Chọn trạng thái --</option>
                            <option value="PENDING">Chờ xử lý</option>
                            <option value="IN_PROGRESS">Đang thực hiện</option>
                            <option value="COMPLETED">Hoàn thành</option>
                            <option value="CANCELLED">Đã huỷ</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Kết quả</label>
                        <input
                            type="text"
                            value={updateData.resultValue}
                            onChange={(e) => setUpdateData({ ...updateData, resultValue: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                            placeholder="Nhập kết quả xét nghiệm"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Ghi chú (nếu có)</label>
                        <textarea
                            value={updateData.resultNote}
                            onChange={(e) => setUpdateData({ ...updateData, resultNote: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="Ghi chú thêm về kết quả"
                        ></textarea>
                    </div>

                    <div className="flex gap-4">
                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Cập nhật
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("")}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Huỷ
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default StaffTestResult;
