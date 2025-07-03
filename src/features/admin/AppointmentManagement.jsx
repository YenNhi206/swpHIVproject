import React, { useState } from 'react';
import { Table, Button, Modal, Input, DatePicker, TimePicker, Select, message } from 'antd';
import dayjs from 'dayjs';
import { Plus } from 'lucide-react';

const { Option } = Select;

export default function AppointmentManagement() {
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            patientName: 'Nguyễn Văn A',
            doctorName: 'Bác sĩ Trần B',
            date: '2025-07-01',
            time: '09:00',
            purpose: 'Khám định kỳ',
        },
        {
            id: 2,
            patientName: 'Lê Thị C',
            doctorName: 'Bác sĩ Mai D',
            date: '2025-07-02',
            time: '14:30',
            purpose: 'Xét nghiệm',
        },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [form, setForm] = useState({
        patientName: '',
        doctorName: '',
        date: null,
        time: null,
        purpose: '',
    });

    // Mở modal thêm mới
    const openAddModal = () => {
        setEditingAppointment(null);
        setForm({ patientName: '', doctorName: '', date: null, time: null, purpose: '' });
        setModalVisible(true);
    };

    // Mở modal chỉnh sửa
    const openEditModal = (appt) => {
        setEditingAppointment(appt);
        setForm({
            patientName: appt.patientName,
            doctorName: appt.doctorName,
            date: dayjs(appt.date),
            time: dayjs(`1970-01-01T${appt.time}:00`),
            purpose: appt.purpose,
        });
        setModalVisible(true);
    };

    // Xóa lịch hẹn
    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc muốn xóa lịch hẹn này?',
            onOk: () => {
                setAppointments(appointments.filter(a => a.id !== id));
                message.success('Xóa lịch hẹn thành công');
            },
        });
    };

    // Lưu thông tin từ form
    const handleSave = () => {
        if (!form.patientName || !form.doctorName || !form.date || !form.time || !form.purpose) {
            message.error('Vui lòng điền đầy đủ thông tin');
            return;
        }

        if (editingAppointment) {
            setAppointments(appointments.map(a =>
                a.id === editingAppointment.id
                    ? {
                        ...a,
                        patientName: form.patientName,
                        doctorName: form.doctorName,
                        date: form.date.format('YYYY-MM-DD'),
                        time: form.time.format('HH:mm'),
                        purpose: form.purpose,
                    }
                    : a
            ));
            message.success('Cập nhật lịch hẹn thành công');
        } else {
            setAppointments([
                ...appointments,
                {
                    id: Date.now(),
                    patientName: form.patientName,
                    doctorName: form.doctorName,
                    date: form.date.format('YYYY-MM-DD'),
                    time: form.time.format('HH:mm'),
                    purpose: form.purpose,
                },
            ]);
            message.success('Thêm lịch hẹn thành công');
        }

        setModalVisible(false);
    };

    const columns = [
        { title: 'Bệnh nhân', dataIndex: 'patientName', key: 'patientName' },
        { title: 'Bác sĩ', dataIndex: 'doctorName', key: 'doctorName' },
        { title: 'Ngày', dataIndex: 'date', key: 'date' },
        { title: 'Giờ', dataIndex: 'time', key: 'time' },
        { title: 'Mục đích', dataIndex: 'purpose', key: 'purpose' },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button onClick={() => openEditModal(record)}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Quản lý lịch hẹn</h1>
            <Button
                style={{ backgroundColor: '#dc2626', color: 'white' }}
                icon={<Plus />}
                onClick={() => openAddModal(role)}
                className="mb-4"
            >
                Thêm tài khoản
            </Button>

            <Table
                dataSource={appointments}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />

            <Modal
                title={editingAppointment ? 'Chỉnh sửa lịch hẹn' : 'Thêm lịch hẹn'}
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Bệnh nhân</label>
                        <Input
                            value={form.patientName}
                            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                            placeholder="Tên bệnh nhân"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Bác sĩ</label>
                        <Input
                            value={form.doctorName}
                            onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
                            placeholder="Tên bác sĩ"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Ngày hẹn</label>
                        <DatePicker
                            value={form.date}
                            onChange={(date) => setForm({ ...form, date })}
                            style={{ width: '100%' }}
                            format="DD/MM/YYYY"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Giờ hẹn</label>
                        <TimePicker
                            value={form.time}
                            onChange={(time) => setForm({ ...form, time })}
                            format="HH:mm"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Mục đích</label>
                        <Input
                            value={form.purpose}
                            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                            placeholder="Ví dụ: Khám định kỳ"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
