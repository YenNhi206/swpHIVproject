import React, { useState, useMemo } from 'react';
import { Table, Card, Row, Col, Tag, Button, Modal, Input, Select, DatePicker } from 'antd';
import { Plus, Edit, Delete } from 'lucide-react';
import dayjs from 'dayjs';

const { Option } = Select;

export default function AdminFinancePage() {
    const [transactions, setTransactions] = useState([
        { id: 1, date: '2025-07-01', type: 'income', description: 'Tiền khám bệnh', amount: 5000000 },
        { id: 2, date: '2025-07-02', type: 'expense', description: 'Mua thuốc', amount: 1500000 },
        { id: 3, date: '2025-06-30', type: 'income', description: 'Thanh toán BHYT', amount: 3000000 },
        { id: 4, date: '2025-07-15', type: 'expense', description: 'Chi phí điện nước', amount: 800000 },
    ]);

    // Lọc theo tháng chọn (YYYY-MM)
    const [filterMonth, setFilterMonth] = useState(dayjs().format('YYYY-MM'));

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => dayjs(t.date).format('YYYY-MM') === filterMonth);
    }, [transactions, filterMonth]);

    const totalIncome = useMemo(() =>
        filteredTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [filteredTransactions]);

    const totalExpense = useMemo(() =>
        filteredTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [filteredTransactions]);

    const balance = totalIncome - totalExpense;

    // Modal và form xử lý thêm sửa y như trước
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [form, setForm] = useState({
        date: dayjs().format('YYYY-MM-DD'),
        type: 'income',
        description: '',
        amount: '',
    });

    const openAddModal = () => {
        setEditingTransaction(null);
        setForm({ date: dayjs().format('YYYY-MM-DD'), type: 'income', description: '', amount: '' });
        setModalVisible(true);
    };

    const openEditModal = (transaction) => {
        setEditingTransaction(transaction);
        setForm({ ...transaction });
        setModalVisible(true);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc muốn xóa giao dịch này?',
            okText: 'Xóa',
            okButtonProps: { danger: true },
            cancelText: 'Hủy',
            onOk: () => setTransactions(transactions.filter(t => t.id !== id)),
        });
    };

    const handleSave = () => {
        if (!form.description || !form.amount || isNaN(Number(form.amount))) {
            Modal.error({ title: 'Lỗi', content: 'Vui lòng nhập đầy đủ và đúng định dạng số tiền.' });
            return;
        }
        if (editingTransaction) {
            setTransactions(transactions.map(t => t.id === editingTransaction.id ? { ...form, amount: Number(form.amount) } : t));
        } else {
            setTransactions([...transactions, { ...form, id: Date.now(), amount: Number(form.amount) }]);
        }
        setModalVisible(false);
    };

    const columns = [
        { title: 'Ngày', dataIndex: 'date', key: 'date', render: d => dayjs(d).format('DD/MM/YYYY') },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: type => (
                <Tag color={type === 'income' ? 'green' : 'red'}>
                    {type === 'income' ? 'Thu' : 'Chi'}
                </Tag>
            ),
            filters: [
                { text: 'Thu', value: 'income' },
                { text: 'Chi', value: 'expense' },
            ],
            onFilter: (value, record) => record.type === value,
        },
        { title: 'Mô tả', dataIndex: 'description', key: 'description' },
        { title: 'Số tiền (VNĐ)', dataIndex: 'amount', key: 'amount', render: a => a.toLocaleString() },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button size="small" onClick={() => openEditModal(record)} icon={<Edit size={16} />} />
                    <Button size="small" danger onClick={() => handleDelete(record.id)} icon={<Delete size={16} />} />
                </div>
            )
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-red-700 mb-6">Quản lý Tài chính </h1>

            <Row gutter={16} className="mb-6">
                <Col span={8}>
                    <Card style={{ backgroundColor: '#fee2e2', color: '#b91c1c', textAlign: 'center' }}>
                        <div className="text-lg">Tổng thu</div>
                        <div className="text-3xl font-bold">{totalIncome.toLocaleString()} VNĐ</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#fee2e2', color: '#b91c1c', textAlign: 'center' }}>
                        <div className="text-lg">Tổng chi</div>
                        <div className="text-3xl font-bold">{totalExpense.toLocaleString()} VNĐ</div>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#fee2e2', color: '#b91c1c', textAlign: 'center' }}>
                        <div className="text-lg">Số dư</div>
                        <div className="text-3xl font-bold">{balance.toLocaleString()} VNĐ</div>
                    </Card>
                </Col>
            </Row>

            <div className="mb-4 flex items-center gap-4">
                <DatePicker
                    picker="month"
                    onChange={(date) => setFilterMonth(date ? date.format('YYYY-MM') : '')}
                    value={dayjs(filterMonth, 'YYYY-MM')}
                    className="max-w-xs"
                    allowClear={false}
                />
                <Button
                    type="primary"
                    style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                    icon={<Plus />}
                    onClick={openAddModal}
                >
                    Thêm giao dịch
                </Button>
            </div>

            <Table
                dataSource={filteredTransactions}
                columns={columns}
                rowKey="id"
                bordered
            />

            {/* Modal thêm/sửa */}
            <Modal
                title={editingTransaction ? 'Chỉnh sửa giao dịch' : 'Thêm giao dịch'}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{ style: { backgroundColor: '#dc2626', borderColor: '#dc2626' } }}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Ngày</label>
                        <DatePicker
                            value={dayjs(form.date)}
                            onChange={(date) => setForm({ ...form, date: date ? date.format('YYYY-MM-DD') : '' })}
                            format="DD/MM/YYYY"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Loại</label>
                        <Select
                            value={form.type}
                            onChange={(value) => setForm({ ...form, type: value })}
                            className="w-full"
                        >
                            <Option value="income">Thu</Option>
                            <Option value="expense">Chi</Option>
                        </Select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Mô tả</label>
                        <Input
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            placeholder="Mô tả giao dịch"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Số tiền (VNĐ)</label>
                        <Input
                            value={form.amount}
                            onChange={(e) => setForm({ ...form, amount: e.target.value })}
                            placeholder="Nhập số tiền"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
