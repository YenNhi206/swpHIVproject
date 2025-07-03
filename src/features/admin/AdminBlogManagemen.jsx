import React, { useState } from 'react';
import { Table, Button, Modal, Input, Select, Tag, Space, Popconfirm } from 'antd';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const { Option } = Select;
const { TextArea } = Input;

export default function AdminBlogManagement() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: 'Cách phòng chống HIV hiệu quả',
            author: 'Admin',
            createdAt: '2025-06-20',
            status: 'published',
            summary: 'Bài viết hướng dẫn các biện pháp phòng chống HIV hiệu quả.',
            content: 'Nội dung chi tiết bài viết về phòng chống HIV...',
        },
        {
            id: 2,
            title: 'Hướng dẫn điều trị phác đồ mới',
            author: 'Bác sĩ Trần A',
            createdAt: '2025-06-25',
            status: 'draft',
            summary: 'Giới thiệu phác đồ điều trị mới cho bệnh nhân HIV.',
            content: 'Nội dung chi tiết phác đồ điều trị...',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [form, setForm] = useState({
        title: '',
        author: '',
        createdAt: '',
        status: 'draft',
        summary: '',
        content: '',
    });

    // Mở modal thêm bài mới
    const openAddModal = () => {
        setEditingPost(null);
        setForm({
            title: '',
            author: '',
            createdAt: new Date().toISOString().slice(0, 10), // ngày hiện tại YYYY-MM-DD
            status: 'draft',
            summary: '',
            content: '',
        });
        setIsModalOpen(true);
    };

    // Mở modal sửa bài viết
    const openEditModal = (post) => {
        setEditingPost(post);
        setForm({ ...post });
        setIsModalOpen(true);
    };

    // Xóa bài viết
    const handleDelete = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    // Lưu bài viết (thêm hoặc sửa)
    const handleSave = () => {
        if (!form.title || !form.author || !form.createdAt) {
            Modal.error({
                title: 'Lỗi',
                content: 'Vui lòng nhập đầy đủ tiêu đề, tác giả và ngày đăng.',
            });
            return;
        }

        if (editingPost) {
            setPosts(posts.map(post => (post.id === editingPost.id ? { ...form, id: editingPost.id } : post)));
        } else {
            setPosts([...posts, { ...form, id: Date.now() }]);
        }
        setIsModalOpen(false);
    };

    // Các cột bảng
    const columns = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <b>{text}</b>,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Ngày đăng',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => new Date(date).toLocaleDateString('vi-VN'),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'published' ? 'green' : 'orange'}>
                    {status === 'published' ? 'Đã đăng' : 'Bản nháp'}
                </Tag>
            ),
            filters: [
                { text: 'Đã đăng', value: 'published' },
                { text: 'Bản nháp', value: 'draft' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Hành động',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        size="small"
                        onClick={() => openEditModal(record)}
                        icon={<Pencil size={16} />}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa bài viết này?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button size="small" danger icon={<Trash2 size={16} />}>
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-red-700">Quản lý bài viết blog</h1>

            <Button
                type="primary"
                style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                icon={<Plus />}
                onClick={openAddModal}
            >
                Thêm bài viết mới
            </Button>

            <Table
                dataSource={posts}
                columns={columns}
                rowKey="id"
                bordered
                pagination={{ pageSize: 5 }}
                className="mt-4"
            />

            {/* Modal Thêm / Sửa */}
            <Modal
                title={editingPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{ style: { backgroundColor: '#dc2626', borderColor: '#dc2626' } }}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Tiêu đề</label>
                        <Input
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            placeholder="Nhập tiêu đề bài viết"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tác giả</label>
                        <Input
                            value={form.author}
                            onChange={(e) => setForm({ ...form, author: e.target.value })}
                            placeholder="Nhập tên tác giả"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Ngày đăng</label>
                        <Input
                            type="date"
                            value={form.createdAt}
                            onChange={(e) => setForm({ ...form, createdAt: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Trạng thái</label>
                        <Select
                            value={form.status}
                            onChange={(value) => setForm({ ...form, status: value })}
                            style={{ width: '100%' }}
                        >
                            <Option value="published">Đã đăng</Option>
                            <Option value="draft">Bản nháp</Option>
                        </Select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tóm tắt nội dung</label>
                        <TextArea
                            rows={3}
                            value={form.summary}
                            onChange={(e) => setForm({ ...form, summary: e.target.value })}
                            placeholder="Tóm tắt nội dung bài viết"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Nội dung chi tiết</label>
                        <TextArea
                            rows={6}
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            placeholder="Nhập nội dung chi tiết bài viết"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
