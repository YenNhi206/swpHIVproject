import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Plus, Eye } from 'lucide-react';

export default function TreatmentList() {
  const location = useLocation();
  const newTreatment = location.state?.newTreatment;

  const [treatments, setTreatments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        name: 'TDF + 3TC + DTG',
        description: 'Phác đồ chuẩn cho người lớn',
        category: 'Người lớn',
      },
      {
        id: 2,
        name: 'AZT + 3TC + EFV',
        description: 'Phác đồ thay thế cho người lớn',
        category: 'Người lớn',
      },
      {
        id: 3,
        name: 'ABC + 3TC + LPV/r',
        description: 'Phác đồ dành cho phụ nữ mang thai',
        category: 'Phụ nữ mang thai',
      },
      {
        id: 4,
        name: 'NVP + 3TC + AZT',
        description: 'Phác đồ cho trẻ em',
        category: 'Trẻ em',
      },
    ];

    if (newTreatment) {
      const processedTreatment = {
        ...newTreatment,
        description: newTreatment.description || newTreatment.moTa || newTreatment.category || '',
      };
      fakeData.push(processedTreatment);
    }

    setTimeout(() => {
      setTreatments(fakeData);
      setIsLoading(false);
    }, 500);
  }, [newTreatment]);

  const handleDelete = (id) => {
    const confirmed = window.confirm('Bạn có chắc muốn xóa phác đồ này không?');
    if (confirmed) {
      setTreatments((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const filteredTreatments = treatments.filter((treatment) =>
    [treatment.name, treatment.category]
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-red-600">Danh sách phác đồ điều trị HIV</h2>
          <Link
            to="/treatment/create"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <Plus className="w-5 h-5" />
            Tạo phác đồ mới
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm phác đồ hoặc đối tượng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Table/List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-2">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredTreatments.length > 0 ? (
            <>
              {/* Desktop Table */}
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
                    {filteredTreatments.map((t) => (
                      <tr key={t.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">{t.name}</td>
                        <td className="px-6 py-4 text-gray-600">{t.description}</td>
                        <td className="px-6 py-4 text-gray-600">{t.category}</td>
                        <td className="px-6 py-4 text-center space-x-2">
                          <Link
                            to={`/treatment/${t.id}`}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                          >
                            <Eye className="w-4 h-4" />
                            Chi tiết
                          </Link>
                          <Link
                            to={`/treatment/${t.id}/edit`}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                          >
                            ✏️ Sửa
                          </Link>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300 text-sm"
                          >
                            🗑️ Xóa
                          </button>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card */}
              <div className="block sm:hidden space-y-4">
                {filteredTreatments.map((t) => (
                  <div key={t.id} className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                    <p className="text-gray-600 mt-1"><strong>Mô tả:</strong> {t.description}</p>
                    <p className="text-gray-600 mt-1"><strong>Đối tượng:</strong> {t.category}</p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      <Link
                        to={`/treatment/${t.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Chi tiết
                      </Link>
                      <Link
                        to={`/treatment/edit/${t.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      >
                        ✏️ Sửa
                      </Link>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-200 text-red-700 rounded-lg hover:bg-red-300 text-sm"
                      >
                        🗑️ Xóa
                      </button>

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
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
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
