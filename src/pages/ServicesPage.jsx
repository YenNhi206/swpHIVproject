import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { CheckCircle, FileText, Stethoscope, UserPlus } from 'lucide-react';

const { Title, Text, Paragraph } = Typography;

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
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-8">
            <div className="max-w-6xl mx-auto space-y-12">
                <h1 className="text-3xl font-extrabold text-red-700 text-center">Dịch vụ - Giá tiền </h1>


                {/* Dịch vụ khám lần đầu */}
                <section>
                    <Title level={3} className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-300 pb-2 animate-fade-in [animation-delay:0.2s]">
                        <FileText className="w-6 h-6 inline mr-2" />
                        Dịch vụ khám lần đầu
                    </Title>
                    <Row gutter={[24, 24]}>
                        {firstVisitServices.map((service) => (
                            <Col xs={24} sm={12} key={service.id}>
                                <Card
                                    hoverable
                                    className="bg-white shadow-xl border-2 border-red-100 hover:border-red-300 transition-all duration-300 h-full animate-scale-fade-in"
                                >
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                            <UserPlus className="w-5 h-5 text-red-500" />
                                            {service.name}
                                        </h3>
                                        <Paragraph className="text-gray-600 mb-4 leading-relaxed">
                                            {service.description}
                                        </Paragraph>
                                        <span className="text-2xl font-extrabold text-red-600 hover:text-red-700 transition-colors duration-300 border-b-2 border-red-200 pb-1 block">
                                            {formatPrice(service.price)}
                                        </span>

                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* Dịch vụ tái khám */}
                <section>
                    <Title level={3} className="text-2xl font-bold text-red-600 mb-6 border-b-2 border-red-300 pb-2 animate-fade-in [animation-delay:0.3s]">
                        <Stethoscope className="w-6 h-6 inline mr-2" />
                        Dịch vụ tái khám
                    </Title>
                    <Row gutter={[24, 24]}>
                        {followUpServices.map((service) => (
                            <Col xs={24} sm={12} key={service.id}>
                                <Card
                                    hoverable
                                    className="bg-white shadow-xl border-2 border-red-100 hover:border-red-300 transition-all duration-300 h-full animate-scale-fade-in"
                                >
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-red-500" />
                                            {service.name}
                                        </h3>
                                        <Paragraph className="text-gray-600 mb-4 leading-relaxed">
                                            {service.description}
                                        </Paragraph>
                                        <span className="text-2xl font-extrabold text-red-600 hover:text-red-700 transition-colors duration-300 border-b-2 border-red-200 pb-1 block">
                                            {formatPrice(service.price)}
                                        </span>

                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>

            </div>
        </div>
    );
}