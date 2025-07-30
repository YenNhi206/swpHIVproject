import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Input,
  Select,
  Tag,
  Space,
  Popconfirm,
  message,
} from 'antd';
import { Plus, Pencil, Trash2 } from 'lucide-react';

const { Option } = Select;
const { TextArea } = Input;

export default function AdminBlogManagement() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: '',
    author: '',
    createdAt: '',
    status: 'draft',
    summary: '',
    content: '',
    link: '',
  });

  const API = 'http://localhost:8080/api/blogs';
  const token = localStorage.getItem('token');

  const fetchPosts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      message.error('Lỗi khi tải danh sách bài viết');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openAddModal = () => {
    setEditingPost(null);
    setForm({
      title: '',
      author: '',
      createdAt: new Date().toISOString().slice(0, 10),
      status: 'draft',
      summary: '',
      content: '',
      link: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setForm({
      ...post,
      summary: post.description,
      link: post.link || '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Đã xoá bài viết');
      fetchPosts();
    } catch (err) {
      message.error('Xoá thất bại');
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.author || !form.createdAt) {
      Modal.error({
        title: 'Lỗi',
        content: 'Vui lòng nhập đầy đủ tiêu đề, tác giả và ngày đăng.',
      });
      return;
    }

    const payload = {
      title: form.title,
      author: form.author,
      createdAt: form.createdAt,
      status: form.status,
      description: form.summary,
      content: form.content,
      link: form.link,
    };

    try {
      const res = await fetch(
        editingPost ? `${API}/${editingPost.id}` : API,
        {
          method: editingPost ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) throw new Error();

      message.success(editingPost ? 'Cập nhật thành công' : 'Thêm bài viết thành công');
      setIsModalOpen(false);
      fetchPosts();
    } catch (err) {
      message.error('Lưu bài viết thất bại');
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <b>{text}</b>,
    },
    { title: 'Tác giả', dataIndex: 'author', key: 'author' },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (d) => new Date(d).toLocaleDateString('vi-VN'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (st) => (
        <Tag color={st === 'published' ? 'green' : 'orange'}>
          {st === 'published' ? 'Đã đăng' : 'Bản nháp'}
        </Tag>
      ),
      filters: [
        { text: 'Đã đăng', value: 'published' },
        { text: 'Bản nháp', value: 'draft' },
      ],
      onFilter: (v, r) => r.status === v,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => openEditModal(record)} icon={<Pencil size={16} />}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xoá bài viết này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button size="small" danger icon={<Trash2 size={16} />}>
              Xoá
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

      <Modal
        title={editingPost ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSave}
        okText="Lưu"
        cancelText="Huỷ"
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
              onChange={(v) => setForm({ ...form, status: v })}
              style={{ width: '100%' }}
            >
              <Option value="published">Đã đăng</Option>
              <Option value="draft">Bản nháp</Option>
            </Select>
          </div>

          <div>
            <label className="block font-medium mb-1">Đường dẫn (link)</label>
            <Input
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://example.com/bai-viet"
            />
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
