import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();

  // Định nghĩa ánh xạ đường dẫn sang tên trang
  const pathMap = {
    '/': 'Trang chủ',
    '/about': 'Giới thiệu',
    '/appointments': 'Đặt hẹn',
    '/treatment-results': 'Kết quả',
    '/login': 'Đăng nhập',
    '/signup': 'Đăng ký',
    '/doctor': 'Bác sĩ',
    '/payment': 'Thanh toán',
    '/users': 'Hồ sơ bệnh nhân',
    '/treatment': 'Danh sách phác đồ',
    '/treatment/:id': 'Chi tiết phác đồ',
    '/patient': 'Bảng điều khiển bệnh nhân',
    '/support': 'Hỗ trợ',
    '/reminder': 'Nhắc nhở',
    '/history': 'Lịch sử',
    '/admin': 'Bảng điều khiển admin',
    '/doctorappointments': 'Lịch hẹn bác sĩ',
    '/userappointments': 'Lịch hẹn người dùng',
    '/anonymous-appointment': 'Đặt lịch ẩn danh',
    '/knowledge': 'Kiến thức',
    '/listdoctor': 'Chuyên gia - Bác sĩ',
    '*': 'Không tìm thấy',
  };

  // Tách đường dẫn thành mảng và xử lý dynamic route (ví dụ: /treatment/:id)
  const pathSegments = location.pathname.split('/').filter((segment) => segment);
  const breadcrumbItems = pathSegments.reduce((acc, segment, index) => {
    const pathSoFar = `/${pathSegments.slice(0, index + 1).join('/')}`;
    // Xử lý dynamic route (ví dụ: /treatment/:id thành "Chi tiết phác đồ")
    const dynamicPath = pathSegments.length > 1 && index === pathSegments.length - 1 ? `/${pathSegments[0]}/:id` : pathSoFar;
    const label = pathMap[dynamicPath] || pathMap[pathSoFar] || segment.charAt(0).toUpperCase() + segment.slice(1);
    acc.push({ path: pathSoFar, label });
    return acc;
  }, [{ path: '/', label: 'Trang chủ' }]);

  return (
    <div className="w-full bg-gradient-to-b from-gray-100 to-white py-2 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-lg">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <Link
              to={item.path}
              className={`hover:text-red-600 transition-colors duration-200 ${index === breadcrumbItems.length - 1 ? 'text-red-700 font-semibold' : 'text-gray-700'
                }`}
            >
              {item.label}
            </Link>
            {index < breadcrumbItems.length - 1 && <ChevronRight className="w-5 h-5 text-gray-500" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}