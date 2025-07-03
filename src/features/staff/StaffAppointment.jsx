import React, { useState, useEffect } from "react";
import {
    CheckCircle,
    XCircle,
    PlusCircle,
    User,
    Phone,
    MapPin,
    Venus,
    Mars,
} from "lucide-react";
import { Row, Col, Form, Input, Select } from "antd";

const { Option } = Select;

const TABS = ["Tất cả", "Chưa đến", "Đã đến", "Đang khám", "Hoàn tất", "Vắng"];
const STATUS_FLOW = ["Chưa đến", "Đã đến", "Đang khám", "Hoàn tất"];

const mockPatients = [
    {
        id: 1,
        fullName: "Nguyễn Văn A",
        gender: "Nam",
        phone: "0123456789",
        address: "Hà Nội",
        status: "Chưa đến",
    },
    {
        id: 2,
        fullName: "Trần Thị B",
        gender: "Nữ",
        phone: "0987654321",
        address: "TP.HCM",
        status: "Đã đến",
    },
];

export default function StaffAppointment() {
    const [patients, setPatients] = useState([]);
    const [selectedTab, setSelectedTab] = useState("Tất cả");

    useEffect(() => {
        setPatients(mockPatients);
    }, []);

    const handleUpdateStatus = (id) => {
        setPatients((prev) =>
            prev.map((p) => {
                if (p.id !== id) return p;
                const currentIndex = STATUS_FLOW.indexOf(p.status);
                if (currentIndex < STATUS_FLOW.length - 1) {
                    return { ...p, status: STATUS_FLOW[currentIndex + 1] };
                }
                return p;
            })
        );
    };

    const handleSetAbsent = (id) => {
        setPatients((prev) =>
            prev.map((p) => (p.id === id ? { ...p, status: "Vắng" } : p))
        );
    };

    const filteredPatients = patients.filter(
        (p) => selectedTab === "Tất cả" || p.status === selectedTab
    );

    return (
        <div className="p-6 bg-red-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
                Quản Lý Bệnh Nhân
            </h1>

            {/* Tabs */}
            <div className="flex justify-center flex-wrap gap-2 mb-4">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-4 py-2 rounded-full font-medium border ${selectedTab === tab
                            ? "bg-red-600 text-white"
                            : "bg-white text-red-700 border-red-500"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Danh sách bệnh nhân */}
            <div className="overflow-x-auto">
                {filteredPatients.length === 0 ? (
                    <p className="text-center text-red-600 font-medium mt-4">
                        Không có bệnh nhân.
                    </p>
                ) : (
                    <table className="w-full table-auto bg-white border border-red-300 rounded shadow">
                        <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="p-3">Họ tên</th>
                                <th className="p-3">Giới tính</th>
                                <th className="p-3">SĐT</th>
                                <th className="p-3">Địa chỉ</th>
                                <th className="p-3">Trạng thái</th>
                                <th className="p-3">Cập nhật</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((p) => (
                                <tr key={p.id} className="border-t text-center hover:bg-red-50">
                                    <td className="p-3">{p.fullName}</td>
                                    <td className="p-3">{p.gender}</td>
                                    <td className="p-3">{p.phone}</td>
                                    <td className="p-3">{p.address}</td>
                                    <td
                                        className={`p-3 font-semibold ${p.status === "Vắng"
                                            ? "text-red-600"
                                            : p.status === "Hoàn tất"
                                                ? "text-green-600"
                                                : "text-gray-600"
                                            }`}
                                    >
                                        {p.status}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex gap-2 justify-center">
                                            {p.status !== "Hoàn tất" && p.status !== "Vắng" && (
                                                <button
                                                    onClick={() => handleUpdateStatus(p.id)}
                                                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    <CheckCircle size={16} />
                                                    Tiếp theo
                                                </button>
                                            )}
                                            {p.status !== "Vắng" && p.status !== "Hoàn tất" && (
                                                <button
                                                    onClick={() => handleSetAbsent(p.id)}
                                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    <XCircle size={16} />
                                                    Vắng
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    );
}
