import React, { useEffect, useState } from "react";
import { message, Button } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function decodeToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export async function saveDoctorIdAfterLogin(data) {
  const accountId = data.accountId || data.userId;

  fetch(`http://localhost:8080/api/doctors/account/${accountId}`)
    .then((res) => res.json())
    .then((doctorData) => {
      if (doctorData && doctorData.id) {
        localStorage.setItem("doctorId", doctorData.id);
      }
    });
}

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let localDoctorId = localStorage.getItem("doctorId");
    if (localDoctorId && !isNaN(Number(localDoctorId))) {
      setDoctorId(Number(localDoctorId));
      return;
    }

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

    if (payload.userId) {
      setDoctorId(payload.userId);
    } else {
      message.error("Không tìm thấy doctorId");
    }
  }, []);

  useEffect(() => {
    if (!doctorId) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/doctors/${Number(doctorId)}`, {
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

  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:8080/api/appointments/doctor/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

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

  const handleCreatePrescription = (appointmentId, patientId) => {
    if (!patientId) {
      message.error("Không tìm thấy bệnh nhân để kê đơn");
      return;
    }
    navigate("/prescriptions", {
      state: {
        appointmentId,
        patientId,
      },
    });
  };

  const renderAppointment = (a, color) => (
    <li
      key={a.id}
      className={`border ${color} rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition-all`}
    >
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div>
          <strong>Ngày:</strong>{" "}
          {dayjs.utc(a.appointmentDate).local().format("DD/MM/YYYY")}
        </div>
        <div>
          <strong>Giờ:</strong>{" "}
          {dayjs.utc(a.appointmentDate).local().format("HH:mm")}
        </div>
        <div>
          <strong>Loại khám:</strong>{" "}
          {a.appointmentType || a.appointment_type || "-"}
        </div>
        <div>
          <strong>Trạng thái:</strong> {a.status}
        </div>
        <div>
          <strong>Bệnh nhân:</strong>{" "}
          {a.full_name || a.fullName || a.patientName || "Ẩn danh"}
        </div>
        <div>
          <strong>Booking mode:</strong>{" "}
          {a.bookingMode || a.booking_mode || "-"}
        </div>
        <div>
          <strong>Phone:</strong> {a.phone || "-"}
        </div>
        <div>
          <strong>Gender:</strong> {a.gender || "-"}
        </div>
        <div className="col-span-2">
          <strong>Mô tả:</strong> {a.description || "-"}
        </div>
        <div className="col-span-2">
          <strong>Google Meet:</strong>{" "}
          {a.googleMeetLink ? (
            <a
              href={a.googleMeetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {a.googleMeetLink}
            </a>
          ) : (
            <span className="italic text-gray-400">Không có</span>
          )}
        </div>
        <div className="col-span-2 text-right mt-2">
          <Button
            type="primary"
            onClick={() =>
              handleCreatePrescription(a.id, a.patientId || a.patient_id)
            }
          >
            Kê đơn
          </Button>
        </div>
      </div>
    </li>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-md shadow-md min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">
        Lịch hẹn của bác sĩ {doctorName}
      </h1>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500 italic">Không có lịch hẹn</p>
      ) : (
        (() => {
          const validAppointments = appointments.filter(
            (a) => a.status !== "CANCELLED"
          );
          const today = dayjs().format("YYYY-MM-DD");
          const getDate = (a) =>
            dayjs.utc(a.appointmentDate).local().format("YYYY-MM-DD");
          const todayList = validAppointments.filter(
            (a) => getDate(a) === today
          );
          const futureList = validAppointments.filter(
            (a) => getDate(a) > today
          );

          return (
            <>
              <h2 className="text-lg font-semibold mb-2 text-red-600">
                Lịch hôm nay
              </h2>
              <ul className="space-y-3 mb-6">
                {todayList.length === 0 ? (
                  <li className="text-gray-400 italic">
                    Không có lịch hôm nay
                  </li>
                ) : (
                  todayList.map((a) => renderAppointment(a, "border-gray-200"))
                )}
              </ul>
              <h2 className="text-lg font-semibold mb-2 text-blue-600">
                Lịch các ngày sau
              </h2>
              <ul className="space-y-3">
                {futureList.length === 0 ? (
                  <li className="text-gray-400 italic">
                    Không có lịch trong tương lai
                  </li>
                ) : (
                  futureList.map((a) => renderAppointment(a, "border-blue-100"))
                )}
              </ul>
            </>
          );
        })()
      )}
    </div>
  );
}
