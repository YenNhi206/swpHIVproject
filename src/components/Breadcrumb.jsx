import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    '/treatment/:create': 'Tạo phác đồ',
    '/treatment/:id/edit': 'Sửa phác đồ',
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
    '/services': 'Dịch vụ - Giá tiền',
    '*': 'Không tìm thấy',
  };

  // Tách đường dẫn thành mảng
  const pathSegments = location.pathname.split('/').filter((segment) => segment);

  // Xây dựng breadcrumb items
  const breadcrumbItems = pathSegments.reduce((acc, segment, index) => {
    const pathSoFar = `/${pathSegments.slice(0, index + 1).join('/')}`;

    // Xử lý dynamic routes và các route đặc biệt
    let dynamicPath = pathSoFar;
    if (pathSegments[0] === 'treatment') {
      if (index === 1 && segment === 'create') {
        dynamicPath = '/treatment/:create'; // Tạo mới phác đồ
      } else if (index === 2 && pathSegments[2] === 'edit') {
        dynamicPath = '/treatment/:id/edit'; // Sửa phác đồ
      } else if (index === 1 && segment !== 'new') {
        dynamicPath = '/treatment/:id'; // Chi tiết phác đồ
      }
    }

    const label = pathMap[dynamicPath] || pathMap[pathSoFar] || segment.charAt(0).toUpperCase() + segment.slice(1);
    acc.push({ path: pathSoFar, label });
    return acc;
  }, [{ path: '/', label: 'Trang chủ' }]);

  return (
    <motion.div
      className="w-full bg-gradient-to-b from-gray-50 to-white py-3 px-6 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex items-center space-x-2 text-lg">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
              <Link
                to={item.path}
                className={`hover:text-red-600 transition-colors duration-200 ${
                  index === breadcrumbItems.length - 1 ? 'text-red-700 font-semibold' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            </motion.div>
            {index < breadcrumbItems.length - 1 && <ChevronRight className="w-5 h-5 text-gray-400" />}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}