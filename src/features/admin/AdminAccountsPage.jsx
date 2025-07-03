import React, { useState } from 'react';
import { Table, Button, Modal, Input, Tabs } from 'antd';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminAccountsPage() {
    const [accounts, setAccounts] = useState([
        { id: 1, fullName: 'Bác sĩ Trần A', email: 'tran.a@hivclinic.vn', phone: '0912345678', role: 'DOCTOR' },
        { id: 2, fullName: 'Nhân viên Lê B', email: 'le.b@hivclinic.vn', phone: '0987654321', role: 'STAFF' },
        { id: 3, fullName: 'Bệnh nhân Nguyễn D', email: 'nguyen.d@gmail.com', phone: '0933445566', role: 'PATIENT' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        role: 'DOCTOR',
    });

    const openAddModal = (role) => {
        setEditingAccount(null);
        setForm({ fullName: '', email: '', phone: '', role });
        setIsModalOpen(true);
    };

    const openEditModal = (account) => {
        setEditingAccount(account);
        setForm(account);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa tài khoản này?',
            okText: 'Xóa',
            okButtonProps: { danger: true },
            cancelText: 'Hủy',
            onOk: () => setAccounts(accounts.filter(acc => acc.id !== id)),
        });
    };

    const handleSave = () => {
        if (editingAccount) {
            setAccounts(accounts.map(acc => acc.id === editingAccount.id ? { ...form, id: acc.id } : acc));
        } else {
            setAccounts([...accounts, { ...form, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    const renderTable = (role) => {
        const filteredAccounts = accounts.filter(acc => acc.role === role);

        return (
            <div className="space-y-4">

                <Table
                    columns={[
                        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
                        { title: 'Email', dataIndex: 'email', key: 'email' },
                        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
                        {
                            title: 'Hành động',
                            key: 'actions',
                            render: (_, record) => (
                                <div className="flex gap-2">
                                    <Button
                                        size="small"
                                        style={{ borderColor: '#dc2626', color: '#dc2626' }}
                                        icon={<Pencil size={16} />}
                                        onClick={() => openEditModal(record)}
                                    />
                                    <Button
                                        size="small"
                                        danger
                                        icon={<Trash2 size={16} />}
                                        onClick={() => handleDelete(record.id)}
                                    />
                                </div>
                            )
                        }
                    ]}
                    dataSource={filteredAccounts}
                    rowKey="id"
                    bordered
                />
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Quản lý tài khoản</h1>
            <Button
                style={{ backgroundColor: '#dc2626', color: 'white' }}
                icon={<Plus />}
                onClick={() => openAddModal(role)}

            >
                Thêm tài khoản
            </Button>

            <Tabs defaultActiveKey="DOCTOR">
                <Tabs.TabPane tab="Bác sĩ" key="DOCTOR">
                    {renderTable('DOCTOR')}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Nhân viên" key="STAFF">
                    {renderTable('STAFF')}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Bệnh nhân" key="PATIENT">
                    {renderTable('PATIENT')}
                </Tabs.TabPane>
            </Tabs>

            {/* Modal thêm/sửa */}
            <Modal
                open={isModalOpen}
                title={editingAccount ? 'Chỉnh sửa tài khoản' : 'Thêm tài khoản'}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{ style: { backgroundColor: '#dc2626', borderColor: '#dc2626' } }}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Họ tên</label>
                        <Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Số điện thoại</label>
                        <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
