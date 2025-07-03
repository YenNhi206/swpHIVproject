import React, { useState } from "react";
import { PlusCircle, User, Phone, MapPin, Venus, Mars } from "lucide-react";
import { Col, Input, Row, Form, Select } from "antd";

const { Option } = Select;

export default function StaffPatientPage() {
    const [patients, setPatients] = useState([]);

    return (
        <div className="p-6 bg-red-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
                Thêm Bệnh Nhân Mới
            </h1>

            <div className="max-w-4xl mx-auto bg-gradient-to-br from-red-50 to-white p-10 rounded-lg shadow-lg border-2 border-red-200 opacity-0 translate-y-4 animate-fade-in [animation-delay:0.5s]">
                <h2 className="text-xl font-semibold text-red-700 mb-6 flex items-center gap-2">
                    <PlusCircle className="w-6 h-6" />
                    Thông Tin Bệnh Nhân
                </h2>

                <Form
                    layout="vertical"
                    onFinish={(values) => {
                        const newId =
                            patients.length > 0 ? Math.max(...patients.map((p) => p.id)) + 1 : 1;
                        const newPatient = {
                            id: newId,
                            ...values,
                        };
                        setPatients((prev) => [...prev, newPatient]);
                        console.log("Đã thêm:", newPatient);
                    }}
                    className="space-y-4"
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Họ tên bệnh nhân"
                                name="fullName"
                                rules={[{ required: true, message: "Họ tên là bắt buộc" }]}
                            >
                                <Input
                                    prefix={<User className="w-5 h-5 text-gray-400" />}
                                    placeholder="Nhập họ tên"
                                    className="border border-gray-300 rounded-lg"
                                    style={{ height: "42px", padding: "0 12px", lineHeight: "42px" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                            >
                                <Select
                                    placeholder="Chọn giới tính"
                                    className="w-full border border-gray-300 rounded-lg"
                                    style={{ height: "42px" }}
                                >
                                    <Option value="Nam">
                                        <div className="flex items-center gap-2">
                                            <Mars className="w-4 h-4 text-blue-500" />
                                            Nam
                                        </div>
                                    </Option>
                                    <Option value="Nữ">
                                        <div className="flex items-center gap-2">
                                            <Venus className="w-4 h-4 text-pink-500" />
                                            Nữ
                                        </div>
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Ngày sinh"
                                name="dateOfBirth"
                                rules={[{ required: true, message: "Ngày sinh là bắt buộc" }]}
                            >
                                <Input
                                    type="date"
                                    className="border border-gray-300 rounded-lg"
                                    style={{ height: "42px", padding: "0 12px", lineHeight: "42px" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Số điện thoại"
                                name="phone"
                                rules={[{ required: true, message: "Số điện thoại là bắt buộc" }]}
                            >
                                <Input
                                    prefix={<Phone className="w-5 h-5 text-gray-400" />}
                                    placeholder="Nhập số điện thoại"
                                    className="border border-gray-300 rounded-lg"
                                    style={{ height: "42px", padding: "0 12px", lineHeight: "42px" }}
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
                            prefix={<MapPin className="w-5 h-5 text-gray-400" />}
                            placeholder="Nhập địa chỉ"
                            className="border border-gray-300 rounded-lg"
                            style={{ height: "42px", padding: "0 12px", lineHeight: "42px" }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white hover:bg-red-700 rounded-md transition-all duration-300"
                            style={{ height: "42px", lineHeight: "42px", padding: "0 16px" }}
                        >
                            Thêm bệnh nhân
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
