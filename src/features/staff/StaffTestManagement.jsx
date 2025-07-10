import React, { useEffect, useState } from 'react';
import { Table, Input, Typography, Select, Button, Space, message } from 'antd';

const { Title } = Typography;
const { Option } = Select;

export default function TestManagementPage() {
    const [tests, setTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(null); // ID đang cập nhật kết quả

    // Gọi API lấy danh sách xét nghiệm
    const fetchTestResults = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/test-results');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setTests(data);
        } catch (error) {
            message.error('Không thể tải danh sách xét nghiệm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestResults();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Gọi API cập nhật trạng thái
    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/test-results/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error('Update failed');
            message.success('Đã cập nhật trạng thái');
            fetchTestResults();
        } catch {
            message.error('Cập nhật trạng thái thất bại');
        }
    };

    // Gọi API cập nhật kết quả
    const handleResultChange = async (id, result) => {
        setUpdating(id);
        try {
            const response = await fetch(`/api/test-results/${id}/result`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ result }),
            });
            if (!response.ok) throw new Error('Update failed');
            message.success('Đã lưu kết quả');
            fetchTestResults();
        } catch {
            message.error('Lưu kết quả thất bại');
        } finally {
            setUpdating(null);
        }
    };

    // Lọc danh sách theo tìm kiếm
    const filteredTests = tests.filter(
        (test) =>
            test.patientName?.toLowerCase().includes(searchTerm) ||
            test.status?.toLowerCase().includes(searchTerm)
    );

    const columns = [
        {
            title: 'Bệnh nhân',
            dataIndex: 'patientName',
            key: 'patientName',
        },
        {
            title: 'Xét nghiệm',
            dataIndex: 'testName',
            key: 'testName',
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctorName',
            key: 'doctorName',
        },
        {
            title: 'Trạng thái',
            key: 'status',
            render: (text, record) => (
                <Select
                    value={record.status}
                    onChange={(value) => handleStatusChange(record.id, value)}
                    style={{ width: 150 }}
                >
                    <Option value="PENDING">PENDING</Option>
                    <Option value="IN_PROGRESS">IN_PROGRESS</Option>
                    <Option value="COMPLETED">COMPLETED</Option>
                </Select>
            ),
        },
        {
            title: 'Kết quả',
            key: 'result',
            render: (text, record) => {
                const [inputValue, setInputValue] = useState(record.result || '');

                return (
                    <Space>
                        <Input
                            defaultValue={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onBlur={(e) => handleResultChange(record.id, e.target.value)}
                            placeholder="Nhập kết quả"
                            disabled={updating === record.id}
                            style={{ width: 200 }}
                        />
                        {updating === record.id && <span>Đang lưu...</span>}
                    </Space>
                );
            },
        },
    ];

    return (
        <div className="p-6">
            <Title level={3}>Quản lý xét nghiệm</Title>

            <Input.Search
                placeholder="Tìm kiếm theo tên bệnh nhân hoặc trạng thái"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4"
                allowClear
            />

            <Table
                loading={loading}
                dataSource={filteredTests}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 8 }}
                bordered
            />
        </div>
    );
}
