import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';

export default function EditTreatment() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate(); // Dùng để điều hướng khi nhấn "Hủy"

  const handleCancel = () => {
    navigate(`/treatment/${id}`);
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-6">Chỉnh sửa phác đồ</h2>

        <form className="space-y-4">
          {/* Các trường nhập liệu */}
          {[
            ['Tên phác đồ', 'name'],
            ['Thành phần thuốc', 'ingredients'],
            ['Liều dùng', 'dosage'],
            ['Chỉ định', 'indication'],
            ['Tác dụng phụ', 'sideEffects'],
            ['Theo dõi hiệu quả', 'monitoring'],
            ['Lưu ý', 'precautions'],
          ].map(([label, name]) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <textarea
                name={name}
                rows={2}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Đối tượng</label>
            <select
              name="category"
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

          {/* Các nút hành động */}
          <div className="flex flex-wrap justify-between items-center pt-6 border-t mt-6 gap-3">
            <Link
              to="/treatment"
              className="px-4 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 text-sm font-medium"
            >
              ← Quay lại danh sách
            </Link>

            <div className="flex gap-2 ml-auto">
              {/* Quay lại chi tiết */}
              <Link
                to={`/treatment/${id}`}
                className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-md hover:bg-red-200"
              >
                Quay lại chi tiết
              </Link>

              {/* Hủy */}
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-400 text-sm font-medium rounded-md hover:bg-red-100"
              >
                Hủy
              </button>

              {/* Lưu */}
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
