import React, { useState, useEffect } from "react";
import { PlusCircle, User, Phone, MapPin, Venus, Mars } from "lucide-react";
import { Col, Input, Row, Form, Select, message, Modal, Button } from "antd";

const { Option } = Select;

const genderValueMap = {
    Nam: "MALE",
    Nữ: "FEMALE",
    Khác: "OTHER",
};

export default function StaffPatientListPage() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8080/api/patients", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
            });
            if (!res.ok) throw new Error("Không thể tải danh sách bệnh nhân");

            const data = await res.json();
            setPatients(data);
        } catch (err) {
            console.error(err);
            message.error("Lỗi khi tải danh sách bệnh nhân");
        } finally {
            setLoading(false);
        }
    };

    const handleAddPatient = async (values) => {
        try {
            const payload = {
                fullName: values.fullName,
                gender: genderValueMap[values.gender] || "OTHER",
                phone: values.phone,
                address: values.address,
                birthDate: values.birthDate, // định dạng 'YYYY-MM-DD'
                hivStatus: values.hivStatus || "", // Có thể không bắt buộc
                treatmentStartDate: values.treatmentStartDate || "", // Có thể không bắt buộc
            };

            const res = await fetch("http://localhost:8080/api/patients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error("Lỗi khi thêm bệnh nhân");
            }

            message.success("Đã thêm bệnh nhân mới!");
            setModalVisible(false);
            fetchPatients();
        } catch (error) {
            console.error(error);
            message.error("Không thể thêm bệnh nhân");
        }
    };

    return (
        <div className="p-6 bg-red-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
                Danh Sách Bệnh Nhân
            </h1>

            <div className="mb-6 flex justify-end">
                <Button
                    type="text"
                    icon={<PlusCircle className="text-white" />}
                    onClick={() => setModalVisible(true)}
                    className="bg-red-600 text-white hover:bg-red-700 rounded-md shadow-sm transition duration-300"
                >
                    Thêm bệnh nhân
                </Button>
            </div>


            <Modal
                title="Thêm Bệnh Nhân Mới"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
                width={650}
            >
                <Form
                    layout="vertical"
                    onFinish={handleAddPatient}
                    preserve={false}
                    size="large"
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Họ tên bệnh nhân"
                                name="fullName"
                                rules={[{ required: true, message: "Họ tên là bắt buộc" }]}
                            >
                                <Input
                                    prefix={<User className="text-gray-400" />}
                                    placeholder="Nhập họ tên"
                                    className="rounded-md"
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                            >
                                <Select placeholder="Chọn giới tính" className="rounded-md">
                                    <Option value="Nam">
                                        <div className="flex items-center gap-2">
                                            <Mars className="text-blue-500" />
                                            Nam
                                        </div>
                                    </Option>
                                    <Option value="Nữ">
                                        <div className="flex items-center gap-2">
                                            <Venus className="text-pink-500" />
                                            Nữ
                                        </div>
                                    </Option>
                                    <Option value="Khác">Khác</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Ngày sinh"
                                name="birthDate"
                                rules={[{ required: true, message: "Ngày sinh là bắt buộc" }]}
                            >
                                <Input type="date" className="rounded-md" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Số điện thoại là bắt buộc" }]}
                            >
                                <Input
                                    prefix={<Phone className="text-gray-400" />}
                                    placeholder="Nhập số điện thoại"
                                    className="rounded-md"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[{ required: true, message: "Địa chỉ là bắt buộc" }]}
                    >
                        <Input
                            prefix={<MapPin className="text-gray-400" />}
                            placeholder="Nhập địa chỉ"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item label="Tình trạng HIV" name="hivStatus">
                                <Input placeholder="VD: Đang điều trị, Chưa điều trị..." className="rounded-md" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Ngày bắt đầu điều trị" name="treatmentStartDate">
                                <Input type="date" className="rounded-md" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="text"
                            htmlType="submit"
                            className="w-full bg-red-700 hover:bg-red-800 transition duration-300 rounded-md"
                            size="large"
                        >
                            Thêm bệnh nhân
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {loading ? (
                <p className="text-center text-red-600">Đang tải dữ liệu...</p>
            ) : patients.length === 0 ? (
                <p className="text-center text-red-600">Chưa có bệnh nhân nào.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-white border border-red-300 rounded shadow">
                        <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="p-3">Họ tên</th>
                                <th className="p-3">Giới tính</th>
                                <th className="p-3">Ngày sinh</th>
                                <th className="p-3">SĐT</th>
                                <th className="p-3">Địa chỉ</th>
                                <th className="p-3">Tình trạng HIV</th>
                                <th className="p-3">Ngày bắt đầu điều trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p, index) => (
                                <tr
                                    key={index}
                                    className="border-t text-center hover:bg-red-50"
                                >
                                    <td className="p-3 flex items-center gap-2 justify-center">
                                        {p.fullName || "N/A"}
                                    </td>
                                    <td className="p-3">
                                        {p.gender === "Nam" ? (
                                            <span className="text-blue-500 flex items-center justify-center gap-1">
                                                <Mars size={14} /> Nam
                                            </span>
                                        ) : p.gender === "Nữ" ? (
                                            <span className="text-pink-500 flex items-center justify-center gap-1">
                                                <Venus size={14} /> Nữ
                                            </span>
                                        ) : (
                                            <span>Không xác định</span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {p.birthDate
                                            ? new Date(p.birthDate).toLocaleDateString("vi-VN")
                                            : "N/A"}
                                    </td>
                                    <td className="p-3">{p.phone || "N/A"}</td>
                                    <td className="p-3 flex items-center justify-center gap-2">
                                        {p.address || "N/A"}
                                    </td>
                                    <td className="p-3">{p.hivStatus || "Chưa cập nhật"}</td>
                                    <td className="p-3">
                                        {p.treatmentStartDate
                                            ? new Date(p.treatmentStartDate).toLocaleDateString("vi-VN")
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
