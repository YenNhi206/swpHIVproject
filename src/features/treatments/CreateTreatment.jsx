import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTreatment() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        category: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Thay bằng gọi API thực tế để lưu dữ liệu
        console.log("Phác đồ mới:", form);

        // Sau khi lưu xong, chuyển về danh sách
        navigate("/treatment");
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-6">
            <h2 className="text-2xl font-bold text-red-600 mb-6">Tạo phác đồ điều trị mới</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-semibold">Tên phác đồ</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Mô tả</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Đối tượng</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="">Chọn đối tượng</option>
                        <option value="Người lớn">Người lớn</option>
                        <option value="Phụ nữ mang thai">Phụ nữ mang thai</option>
                        <option value="Trẻ em">Trẻ em</option>
                    </select>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
                    >
                        ← Trở lại
                    </button>

                    <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Lưu phác đồ
                    </button>
                </div>
            </form>
        </div>
    );
}
