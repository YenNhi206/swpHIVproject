import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Venus, Mars, Pill, Circle } from "lucide-react";

const statusColors = {
    ACTIVE: "text-green-600 bg-green-100",
    COMPLETED: "text-gray-600 bg-gray-200",
    DISCONTINUED: "text-red-600 bg-red-100",
    SUSPENDED: "text-yellow-600 bg-yellow-100",
    MODIFIED: "text-blue-600 bg-blue-100",
};

const mockPatients = [
    {
        patientId: 1,
        fullName: "Nguyễn Văn A",
        gender: "Nam",
        dateOfBirth: "1990-01-15",
        phone: "0909123456",
        address: "Hà Nội",
        regimenName: "Phác đồ 1",
        status: "ACTIVE",
    },
    {
        patientId: 2,
        fullName: "Trần Thị B",
        gender: "Nữ",
        dateOfBirth: "1985-06-20",
        phone: "0912345678",
        address: "Hồ Chí Minh",
        regimenName: "Phác đồ 2",
        status: "COMPLETED",
    },
    {
        patientId: 3,
        fullName: "Lê Văn C",
        gender: "Nam",
        dateOfBirth: "1995-12-05",
        phone: "0987654321",
        address: "Đà Nẵng",
        regimenName: "Phác đồ 3",
        status: "DISCONTINUED",
    },
];

export default function DoctorPatientList() {
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setPatients(mockPatients); // sau này đổi thành fetch API
        }, 500);
    }, []);

    return (
        <div className="p-6 bg-red-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
                Bệnh Nhân Đang Điều Trị
            </h1>

            {patients.length === 0 ? (
                <p className="text-center text-red-600">Không có bệnh nhân nào.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto bg-white border border-red-300 rounded shadow">
                        <thead className="bg-red-600 text-white">
                            <tr>
                                <th className="p-3">Họ tên</th>
                                <th className="p-3">Giới tính</th>
                                <th className="p-3">Ngày sinh</th>
                                <th className="p-3">Số điện thoại</th>
                                <th className="p-3">Địa chỉ</th>
                                <th className="p-3">Phác đồ</th>
                                <th className="p-3">Trạng thái đơn thuốc</th>
                                <th className="p-3">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p, index) => (
                                <tr
                                    key={index}
                                    className="border-t text-center hover:bg-red-50 cursor-pointer"
                                >
                                    <td className="p-3 flex items-center gap-2 justify-center">
                                        <User size={16} /> {p.fullName}
                                    </td>
                                    <td className="p-3">
                                        {p.gender === "Nam" ? (
                                            <span className="text-blue-500 flex items-center justify-center gap-1">
                                                <Mars size={14} /> Nam
                                            </span>
                                        ) : (
                                            <span className="text-pink-500 flex items-center justify-center gap-1">
                                                <Venus size={14} /> Nữ
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3">{p.dateOfBirth}</td>
                                    <td className="p-3">{p.phone}</td>
                                    <td className="p-3">{p.address}</td>
                                    <td className="p-3 text-sm text-red-600 font-medium">{p.regimenName}</td>
                                    <td className="p-3">
                                        <span
                                            className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${statusColors[p.status] || "text-gray-500"}`}
                                        >
                                            <Circle size={10} className="mr-1" />
                                            {p.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() =>
                                                navigate(`/doctor/prescriptions/create?patientId=${p.patientId}`)
                                            }
                                            className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded flex items-center gap-1 mx-auto"
                                        >
                                            <Pill size={14} /> Kê đơn
                                        </button>
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
