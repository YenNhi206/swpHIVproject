import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function CreateTreatment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    ingredients: '',
    dosage: '',
    indication: '',
    sideEffects: '',
    monitoring: '',
    precautions: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTreatment = {
      id: Date.now(),
      ...form,
      moTa: form.category, // sử dụng 'category' làm mô tả
    };

    navigate('/treatment', { state: { newTreatment } });
  };

  const handleBack = () => {
    navigate('/treatment');
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Tạo phác đồ mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tên phác đồ</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Đối tượng</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">-- Chọn đối tượng áp dụng --</option>
              <option value="Người lớn">Người lớn</option>
              <option value="Trẻ em">Trẻ em</option>
              <option value="Phụ nữ mang thai">Phụ nữ mang thai</option>
              <option value="Người điều trị lần đầu">Người điều trị lần đầu</option>
              <option value="Người kháng thuốc">Người kháng thuốc</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Thành phần thuốc</label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Liều dùng</label>
            <textarea
              name="dosage"
              value={form.dosage}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Chỉ định</label>
            <textarea
              name="indication"
              value={form.indication}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tác dụng phụ</label>
            <textarea
              name="sideEffects"
              value={form.sideEffects}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Theo dõi hiệu quả</label>
            <textarea
              name="monitoring"
              value={form.monitoring}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lưu ý</label>
            <textarea
              name="precautions"
              value={form.precautions}
              onChange={handleChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center border border-red-600 text-red-600 hover:bg-red-50 px-4 py-1.5 rounded-md transition"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Quay lại danh sách
            </button>
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-1.5 rounded-md hover:bg-red-700 transition"
            >
              Lưu phác đồ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
