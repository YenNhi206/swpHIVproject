import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Eye } from 'lucide-react';

export default function TreatmentList() {
  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeData = [
      { id: 1, name: 'TDF + 3TC + DTG', description: 'Phác đồ chuẩn cho người lớn', category: 'Người lớn' },
      { id: 2, name: 'AZT + 3TC + EFV', description: 'Phác đồ thay thế cho người lớn', category: 'Người lớn' },
      { id: 3, name: 'ABC + 3TC + LPV/r', description: 'Phác đồ dành cho phụ nữ mang thai', category: 'Phụ nữ mang thai' },
      { id: 4, name: 'NVP + 3TC + AZT', description: 'Phác đồ cho trẻ em', category: 'Trẻ em' },
    ];
    setTimeout(() => {
      setTreatments(fakeData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredTreatments = treatments.filter(
    (treatment) =>
      treatment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      treatment.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-red-600">Danh sách phác đồ điều trị HIV</h2>
          <Link
            to="/treatment/create"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            <Plus className="w-5 h-5" />
            Tạo phác đồ mới
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm phác đồ hoặc đối tượng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.2s]">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredTreatments.length > 0 ? (
            <>
              {/* Bảng trên desktop */}
              <div className="hidden sm:block">
                <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                  <thead className="bg-red-600 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Tên phác đồ</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Mô tả</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Đối tượng</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTreatments.map((treatment) => (
                      <tr
                        key={treatment.id}
                        className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-gray-800">{treatment.name}</td>
                        <td className="px-6 py-4 text-gray-600">{treatment.description}</td>
                        <td className="px-6 py-4 text-gray-600">{treatment.category}</td>
                        <td className="px-6 py-4 text-center">
                          <Link
                            to={`/treatment/${treatment.id}`}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                          >
                            <Eye className="w-4 h-4" />
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card trên mobile */}
              <div className="block sm:hidden space-y-4">
                {filteredTreatments.map((treatment) => (
                  <div
                    key={treatment.id}
                    className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">{treatment.name}</h3>
                    <p className="text-gray-600 mt-1"><strong>Mô tả:</strong> {treatment.description}</p>
                    <p className="text-gray-600 mt-1"><strong>Đối tượng:</strong> {treatment.category}</p>
                    <div className="mt-3">
                      <Link
                        to={`/treatment/${treatment.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                      >
                        <Eye className="w-4 h-4" />
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>Không tìm thấy phác đồ điều trị nào.</p>
              <Link
                to="/treatment/create"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                <Plus className="w-5 h-5" />
                Tạo phác đồ mới
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}