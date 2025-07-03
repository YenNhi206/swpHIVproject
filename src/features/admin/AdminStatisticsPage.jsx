import React from 'react';
import { Card, Row, Col, Table } from 'antd';

const summaryData = [
    { title: 'Tổng số bác sĩ', value: 15 },
    { title: 'Tổng số nhân viên', value: 10 },
    { title: 'Tổng số bệnh nhân', value: 120 },
    { title: 'Lịch hẹn hôm nay', value: 25 },
    { title: 'Lịch hẹn đã hoàn tất', value: 180 },
];

const appointmentTableData = [
    { key: 1, date: '2025-07-01', appointments: 12 },
    { key: 2, date: '2025-07-02', appointments: 15 },
    { key: 3, date: '2025-07-03', appointments: 10 },
    { key: 4, date: '2025-07-04', appointments: 8 },
    { key: 5, date: '2025-07-05', appointments: 20 },
];

const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Số lịch hẹn', dataIndex: 'appointments', key: 'appointments' },
];

export default function AdminStatisticsPage() {
    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Báo cáo - Thống kê</h1>

            {/* Card số liệu tổng quan */}
            <Row gutter={[16, 16]}>
                {summaryData.map((item, idx) => (
                    <Col key={idx} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            bordered={false}
                            className="text-center"
                            style={{ backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 'bold' }}
                        >
                            <div className="text-lg">{item.title}</div>
                            <div className="text-3xl mt-2">{item.value}</div>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Bảng lịch hẹn */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-red-700">Lịch hẹn trong tuần</h2>
                <Table
                    dataSource={appointmentTableData}
                    columns={columns}
                    pagination={false}
                    bordered
                    rowKey="key"
                />
            </div>
        </div>
    );
}
