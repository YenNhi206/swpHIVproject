import React, { useEffect, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";

function decodeToken(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch {
        return null;
    }
}

export default function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [doctorId, setDoctorId] = useState(null);
    const [doctorName, setDoctorName] = useState("");

    // Lấy doctorId từ token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            message.error("Bạn chưa đăng nhập");
            return;
        }

        const payload = decodeToken(token);
        if (!payload) {
            message.error("Token không hợp lệ");
            return;
        }

        if (payload.role !== "DOCTOR") {
            message.error("Bạn không có quyền xem lịch hẹn bác sĩ");
            return;
        }

        setDoctorId(payload.userId);
    }, []);

    // Fetch info bác sĩ (tên) khi có doctorId
    useEffect(() => {
        if (!doctorId) return;

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/api/doctors/${doctorId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.message || "Lỗi lấy thông tin bác sĩ");
                }
                return res.json();
            })
            .then((data) => {
                setDoctorName(data.fullName || data.name || "");
            })
            .catch((error) => {
                message.error(error.message);
            });
    }, [doctorId]);

    // Fetch lịch hẹn khi có doctorId
    useEffect(() => {
        if (!doctorId) return;

        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`http://localhost:8080/api/appointments/doctor/${doctorId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Lỗi khi tải lịch hẹn");
                }

                const data = await res.json();
                setAppointments(data);
            } catch (err) {
                console.error("Fetch failed:", err);
                message.error(err.message || "Lỗi khi tải lịch hẹn");
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [doctorId]);

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">

            {loading ? (
                <p>Đang tải...</p>
            ) : appointments.length === 0 ? (
                <p className="text-gray-500 italic">Không có lịch hẹn</p>
            ) : (
                <ul className="space-y-2">
                    {appointments.map((a) => (
                        <li key={a.id} className="border border-gray-200 rounded p-2 shadow-sm hover:bg-gray-50">
                            <strong>{dayjs(a.date).format("DD/MM/YYYY")}</strong> - {a.time} - Bệnh nhân: {a.patient || a.patientName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
