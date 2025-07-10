import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Input, Tabs, message } from "antd";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminAccountsPage() {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        role: "DOCTOR",
    });
    const [activeRole, setActiveRole] = useState("DOCTOR");

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) {
                message.error("Vui lòng đăng nhập để tiếp tục.");
                return;
            }
            setLoading(true);
            const response = await fetch(
                `http://localhost:8080/api/doctors?page=0&size=100`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Không thể tải danh sách bác sĩ");
            const data = await response.json();

            const doctorAccounts = data.content.map((doctor) => ({
                id: doctor.id,
                fullName: doctor.fullName,
                email: doctor.email,
                phone: doctor.phoneNumber || "",
                role: "DOCTOR",
            }));
            setAccounts(doctorAccounts);
        } catch (error) {
            console.error("Lỗi khi tải danh sách bác sĩ:", error);
            message.error("Lỗi khi tải danh sách: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const openAddModal = (role) => {
        setEditingAccount(null);
        setForm({ fullName: "", email: "", phone: "", role });
        setIsModalOpen(true);
    };

    const openEditModal = (account) => {
        setEditingAccount(account);
        setForm(account);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận",
            content: "Bạn có chắc muốn xóa tài khoản này?",
            okText: "Xóa",
            okButtonProps: { danger: true },
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    const token = JSON.parse(localStorage.getItem("user"))?.token;
                    if (!token) throw new Error("Vui lòng đăng nhập");
                    const response = await fetch(
                        `http://localhost:8080/api/doctors/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (!response.ok) throw new Error("Xóa thất bại");
                    setAccounts(accounts.filter((acc) => acc.id !== id));
                    message.success("Xóa tài khoản thành công");
                } catch (error) {
                    console.error("Lỗi khi xóa tài khoản:", error);
                    message.error("Lỗi khi xóa: " + error.message);
                }
            },
        });
    };

    const handleSave = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("user"))?.token;
            if (!token) throw new Error("Vui lòng đăng nhập");

            const payload = {
                fullName: form.fullName,
                email: form.email,
                phoneNumber: form.phone,
            };

            if (editingAccount) {
                const response = await fetch(
                    `http://localhost:8080/api/doctors/${editingAccount.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(payload),
                    }
                );
                if (!response.ok) throw new Error("Cập nhật thất bại");
                const updatedDoctor = await response.json();
                setAccounts(
                    accounts.map((acc) =>
                        acc.id === editingAccount.id
                            ? {
                                ...acc,
                                ...updatedDoctor,
                                phone: updatedDoctor.phoneNumber,
                            }
                            : acc
                    )
                );
                message.success("Cập nhật tài khoản thành công");
            } else {
                const response = await fetch(`http://localhost:8080/api/doctors`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });
                if (!response.ok) throw new Error("Thêm thất bại");
                const newDoctor = await response.json();
                setAccounts([
                    ...accounts,
                    {
                        ...newDoctor,
                        phone: newDoctor.phoneNumber,
                        role: "DOCTOR",
                    },
                ]);
                message.success("Thêm tài khoản thành công");
            }

            setIsModalOpen(false);
        } catch (error) {
            console.error("Lỗi khi lưu tài khoản:", error);
            message.error("Lỗi khi lưu: " + error.message);
        }
    };

    const renderTable = (role) => {
        const filteredAccounts = accounts.filter((acc) => acc.role === role);

        return (
            <Table
                loading={loading}
                columns={[
                    { title: "Họ tên", dataIndex: "fullName", key: "fullName" },
                    { title: "Email", dataIndex: "email", key: "email" },
                    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
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
                ]}
                dataSource={filteredAccounts}
                rowKey="id"
                bordered
            />
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-6">
            <h1 className="text-3xl font-bold text-red-700 mb-4">Quản lý tài khoản</h1>
            <Button
                style={{ backgroundColor: "#dc2626", color: "white" }}
                icon={<Plus />}
                onClick={() => openAddModal(activeRole)}
            >
                Thêm tài khoản
            </Button>

            <Tabs
                defaultActiveKey="DOCTOR"
                onChange={(key) => setActiveRole(key)}
                items={[
                    {
                        label: "Bác sĩ",
                        key: "DOCTOR",
                        children: renderTable("DOCTOR"),
                    },
                    {
                        label: "Nhân viên",
                        key: "STAFF",
                        children: renderTable("STAFF"),
                    },
                    {
                        label: "Bệnh nhân",
                        key: "PATIENT",
                        children: renderTable("PATIENT"),
                    },
                ]}
            />

            <Modal
                open={isModalOpen}
                title={editingAccount ? "Chỉnh sửa tài khoản" : "Thêm tài khoản"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSave}
                okText="Lưu"
                cancelText="Hủy"
                okButtonProps={{
                    style: { backgroundColor: "#dc2626", borderColor: "#dc2626" },
                }}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Họ tên</label>
                        <Input
                            value={form.fullName}
                            onChange={(e) =>
                                setForm({ ...form, fullName: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <Input
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Số điện thoại</label>
                        <Input
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}
