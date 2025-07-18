import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'antd';
import axios from 'axios';

const columns = [
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Số lịch hẹn', dataIndex: 'appointments', key: 'appointments' },
];

const appointmentTableData = [
    { key: 1, date: '2025-07-01', appointments: 12 },
    { key: 2, date: '2025-07-02', appointments: 15 },
    { key: 3, date: '2025-07-03', appointments: 10 },
    { key: 4, date: '2025-07-04', appointments: 8 },
    { key: 5, date: '2025-07-05', appointments: 20 },
];

export default function AdminStatisticsPage() {
    const [doctorCount, setDoctorCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    const [patientCount, setPatientCount] = useState(0);
    const [todayAppointments, setTodayAppointments] = useState(0);
    const [completedAppointments, setCompletedAppointments] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [
                    doctorRes,
                    staffRes,
                    patientRes,
                    todayAppRes,
                    completedAppRes
                ] = await Promise.all([
                    axios.get('http://localhost:8080/api/doctors'),
                    axios.get('http://localhost:8080/api/staff'),
                    axios.get('http://localhost:8080/api/patients'),
                    axios.get('http://localhost:8080/api/appointments/today'),
                    axios.get('http://localhost:8080/api/appointments/completed'),
                ]);

                setDoctorCount(doctorRes.data.totalElements || 0);
                setStaffCount(staffRes.data.totalElements || 0);
                setPatientCount(patientRes.data.totalElements || 0);
                setTodayAppointments(todayAppRes.data.length || 0);
                setCompletedAppointments(completedAppRes.data.length || 0);
            } catch (error) {
                console.error('Lỗi khi gọi API thống kê:', error);
            }
        };

        fetchStats();
    }, []);

    const summaryData = [
        { title: 'Tổng số bác sĩ', value: doctorCount },
        { title: 'Tổng số nhân viên', value: staffCount },
        { title: 'Tổng số bệnh nhân', value: patientCount },
        { title: 'Lịch hẹn hôm nay', value: todayAppointments },
        { title: 'Lịch hẹn đã hoàn tất', value: completedAppointments },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Báo cáo - Thống kê</h1>

            <Row gutter={[16, 16]}>
                {summaryData.map((item, idx) => (
                    <Col key={idx} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            bordered={false}
                            className="text-center"
                            style={{
                                backgroundColor: '#fee2e2',
                                color: '#b91c1c',
                                fontWeight: 'bold'
                            }}
                        >
                            <div className="text-lg">{item.title}</div>
                            <div className="text-3xl mt-2">{item.value}</div>
                        </Card>
                    </Col>
                ))}
            </Row>

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
