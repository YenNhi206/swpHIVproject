import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'antd';

export default function AdminStatisticsPage() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [patientCount, setPatientCount] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [selectedType, setSelectedType] = useState("");

  const token = localStorage.getItem('token');

  // Fetch tổng số bác sĩ
  const fetchDoctorCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/total-doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy tổng số bác sĩ');
      const count = await response.json();
      setDoctorCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch tổng số bệnh nhân
  const fetchPatientCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/total-patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy tổng số bệnh nhân');
      const count = await response.json();
      setPatientCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch tổng số lịch hẹn
  const fetchTotalAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/total-appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy tổng số lịch hẹn');
      const count = await response.json();
      setTotalAppointments(count);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch tổng số lịch hẹn pending
  const fetchPendingCount = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/pending-appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy số lượng lịch hẹn pending');
      const count = await response.json();
      setPendingCount(count);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch danh sách bác sĩ
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/doctors?page=0&size=1000', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy bác sĩ');
      const data = await response.json();
      setDoctors(data.content || data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch danh sách bệnh nhân
  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patients?page=0&size=1000', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy bệnh nhân');
      const data = await response.json();
      setPatients(data.content || data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch danh sách lịch hẹn
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Lỗi khi lấy lịch hẹn');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDoctorCount();
    fetchPatientCount();
    fetchTotalAppointments();
    fetchPendingCount();
    fetchDoctors();
    fetchPatients();
    fetchAppointments();
  }, []);

  const summaryData = [
    { title: 'Tổng số bác sĩ', value: doctorCount, key: 'doctors' },
    { title: 'Tổng số bệnh nhân', value: patientCount, key: 'patients' },
    { title: 'Tổng số lịch hẹn', value: totalAppointments, key: 'appointments' },
    { title: 'Lịch hẹn chờ duyệt', value: pendingCount, key: 'pendingAppointments' },
  ];

  const handleCardClick = (type) => {
    // Chỉ cho phép xem chi tiết với 3 loại đầu, pending chỉ xem số lượng
    if (type !== 'pendingAppointments') {
      setSelectedType(prev => prev === type ? "" : type); // toggle
    }
  };

  const getTableProps = () => {
    switch (selectedType) {
      case 'doctors':
        return {
          columns: [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Tên', dataIndex: 'fullName', key: 'fullName' },
            { title: 'Chuyên khoa', dataIndex: 'specialization', key: 'specialization' },
          ],
          data: doctors
        };
      case 'patients':
        return {
          columns: [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Tên', dataIndex: 'fullName', key: 'fullName' },
            { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
            { title: 'SĐT', dataIndex: 'phone', key: 'phone' },
          ],
          data: patients
        };
      case 'appointments':
        return {
          columns: [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: 'Ngày', dataIndex: 'appointmentDate', key: 'appointmentDate' },
            { title: 'Loại', dataIndex: 'appointmentType', key: 'appointmentType' },
            { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
          ],
          data: appointments
        };
      default:
        return { columns: [], data: [] };
    }
  };

  const { columns, data } = getTableProps();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-red-700 mb-6">Báo cáo - Thống kê</h1>

      <Row gutter={[16, 16]}>
        {summaryData.map((item) => (
          <Col key={item.key} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable={item.key !== 'pendingAppointments'}
              onClick={() => handleCardClick(item.key)}
              bordered={false}
              className={`text-center cursor-pointer transition duration-300 hover:shadow-lg ${item.key === 'pendingAppointments' ? 'opacity-80 cursor-not-allowed' : ''}`}
              style={{
                backgroundColor: selectedType === item.key ? '#fecaca' : '#fee2e2',
                color: '#b91c1c',
                fontWeight: 'bold',
              }}
            >
              <div className="text-lg">{item.title}</div>
              <div className="text-3xl mt-2">{item.value}</div>
              {item.key === 'pendingAppointments' && (
                <div className="text-sm mt-1 italic"></div>
              )}
            </Card>
          </Col>
        ))}
      </Row>

      {selectedType && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-red-700">
            Danh sách {selectedType === 'doctors' ? 'bác sĩ' :
              selectedType === 'patients' ? 'bệnh nhân' :
                'lịch hẹn'}
          </h2>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        </div>
      )}
    </div>
  );
}