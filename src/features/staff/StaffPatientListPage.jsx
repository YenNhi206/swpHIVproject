import React, { useEffect, useState } from "react";
import { User, Phone, MapPin, Venus, Mars } from "lucide-react";

export default function StaffPatientListPage() {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("patients")) || [];
        setPatients(stored);
    }, []);

    return (
        <div className="p-6 bg-red-50 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-red-700 mb-6">
                Danh Sách Bệnh Nhân
            </h1>

            {patients.length === 0 ? (
                <p className="text-center text-red-600">Chưa có bệnh nhân nào.</p>
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
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p, index) => (
                                <tr key={index} className="border-t text-center hover:bg-red-50">
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
