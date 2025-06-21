import React from 'react';

const firstVisitServices = [
    {
        id: 1,
        name: 'Khám HIV cơ bản',
        description: 'Kiểm tra tình trạng nhiễm HIV, xét nghiệm nhanh và tư vấn.',
        price: 200000,
    },
    {
        id: 2,
        name: 'Xét nghiệm tải lượng virus HIV',
        description: 'Đo lượng virus HIV trong máu để đánh giá hiệu quả điều trị.',
        price: 500000,
    },
    {
        id: 3,
        name: 'Xét nghiệm CD4',
        description: 'Đánh giá tình trạng hệ miễn dịch của bệnh nhân HIV.',
        price: 300000,
    },
    {
        id: 4,
        name: 'Tư vấn và điều trị dự phòng',
        description: 'Hỗ trợ tư vấn và cung cấp các biện pháp dự phòng HIV.',
        price: 150000,
    },
];

const followUpServices = [
    {
        id: 5,
        name: 'Khám tái khám HIV',
        description: 'Kiểm tra sức khỏe định kỳ và theo dõi tình trạng điều trị HIV.',
        price: 180000,
    },
    {
        id: 6,
        name: 'Lấy thuốc ARV',
        description: 'Lấy thuốc theo phác đồ ARV đang điều trị',
        price: '*tùy vào phác đồ đang điều trị',
    },
];

function formatPrice(price) {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">Dịch vụ - Giá tiền</h1>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
                    Dịch vụ khám lần đầu
                </h2>
                <div className="space-y-6">
                    {firstVisitServices.map(service => (
                        <div
                            key={service.id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                            <p className="text-gray-600 mt-2">{service.description}</p>
                            <p className="mt-4 text-red-600 font-bold text-lg">{formatPrice(service.price)}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-red-600 pb-2">
                    Dịch vụ tái khám
                </h2>
                <div className="space-y-6">
                    {followUpServices.map(service => (
                        <div
                            key={service.id}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                            <p className="text-gray-600 mt-2">{service.description}</p>
                            <p className="mt-4 text-red-600 font-bold text-lg">{formatPrice(service.price)}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
