import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, message } from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";

const emptyForm = {
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    qualification: "",
    specialization: "",
    phoneNumber: "",
    imageUrl: "",
    workingSchedule: "",
};

export default function AdminAccountsPage() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [form, setForm] = useState(emptyForm);

    // Fetch doctors from your backend
    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) {
                message.error("Vui lòng đăng nhập để tiếp tục.");
                setLoading(false);
                return;
            }
            const res = await fetch(
                "http://localhost:8080/api/doctors?page=0&size=100",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!res.ok) throw new Error("Không thể tải danh sách bác sĩ");
            const data = await res.json();
            setDoctors(data.content);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const openAddModal = () => {
        setEditingDoctor(null);
        setForm(emptyForm);
        setIsModalOpen(true);
    };

    const openEditModal = (doctor) => {
        setEditingDoctor(doctor);
        setForm({
            email: doctor.email || "",
            password: "",
            confirmPassword: "",
            fullName: doctor.fullName || "",
            qualification: doctor.qualification || "",
            specialization: doctor.specialization || "",
            phoneNumber: doctor.phoneNumber || "",
            imageUrl: doctor.imageUrl || "",
            workingSchedule: doctor.workingSchedule || "",
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc muốn xóa bác sĩ này?",
            okText: "Xóa",
            okButtonProps: { danger: true },
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const token = JSON.parse(localStorage.getItem("user"))?.token;
                    if (!token) throw new Error("Vui lòng đăng nhập");
                    const res = await fetch(`http://localhost:8080/api/doctors/${id}`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (!res.ok) throw new Error("Xóa thất bại");
                    message.success("Xóa bác sĩ thành công");
                    fetchDoctors();
                } catch (error) {
                    message.error(error.message);
                }
            },
        });
    };

    const handleSave = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) throw new Error("Vui lòng đăng nhập");

            let payload;
            if (editingDoctor) {
                // Khi sửa, KHÔNG gửi password, confirmPassword
                payload = {
                    email: form.email,
                    fullName: form.fullName,
                    qualification: form.qualification,
                    specialization: form.specialization,
                    phoneNumber: form.phoneNumber,
                    imageUrl: form.imageUrl,
                    workingSchedule: form.workingSchedule,
                };
            } else {
                // Khi thêm mới, gửi đủ các trường
                if (form.password !== form.confirmPassword) {
                    message.error("Mật khẩu và xác nhận mật khẩu không khớp");
                    return;
                }
                payload = {
                    email: form.email,
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                    fullName: form.fullName,
                    qualification: form.qualification,
                    specialization: form.specialization,
                    phoneNumber: form.phoneNumber,
                    imageUrl: form.imageUrl,
                    workingSchedule: form.workingSchedule,
                };
            }

            let res;
            if (editingDoctor) {
                res = await fetch(`http://localhost:8080/api/doctors/${editingDoctor.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error("Cập nhật thất bại");
                message.success("Cập nhật bác sĩ thành công");
            } else {
                res = await fetch(`http://localhost:8080/api/admin/register-doctor`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error("Thêm mới thất bại");
                message.success("Thêm bác sĩ thành công");
            }
            setIsModalOpen(false);
            fetchDoctors();
        } catch (error) {
            message.error(error.message);
        }
    };

    const columns = [
        { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Số điện thoại", dataIndex: "phoneNumber", key: "phoneNumber" },
        { title: "Chuyên môn", dataIndex: "specialization", key: "specialization" },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        size="small"
                        style={{ borderColor: "#dc2626", color: "#dc2626" }}
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
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Quản lý bác sĩ</h1>
            <Button
                style={{ backgroundColor: "#dc2626", color: "white" }}
                icon={<Plus />}
                onClick={openAddModal}
            >
                Thêm bác sĩ
            </Button>

            <Table
                loading={loading}
                columns={columns}
                dataSource={doctors}
                rowKey="id"
                bordered
                pagination={{ pageSize: 10 }}
                className="mt-4"
            />

            <Modal
                open={isModalOpen}
                title={editingDoctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{ style: { backgroundColor: "#dc2626", borderColor: "#dc2626" } }}
            >
                <div className="space-y-3">
                    <label>Email</label>
                    <Input
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        disabled={!!editingDoctor} // Email không sửa khi edit
                    />
                    {!editingDoctor && (
                        <>
                            <label>Mật khẩu</label>
                            <Input.Password
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <label>Xác nhận mật khẩu</label>
                            <Input.Password
                                value={form.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </>
                    )}
                    <label>Họ tên</label>
                    <Input
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                    <label>Trình độ chuyên môn</label>
                    <Input
                        value={form.qualification}
                        onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    />
                    <label>Chuyên ngành</label>
                    <Input
                        value={form.specialization}
                        onChange={(e) => setForm({ ...form, specialization: e.target.value })}
                    />
                    <label>Số điện thoại</label>
                    <Input
                        value={form.phoneNumber}
                        onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                    />
                    <label>URL hình ảnh</label>
                    <Input
                        value={form.imageUrl}
                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    />
                    <label>Lịch làm việc</label>
                    <Input
                        value={form.workingSchedule}
                        onChange={(e) => setForm({ ...form, workingSchedule: e.target.value })}
                    />
                </div>
            </Modal>
        </div>
    );
}