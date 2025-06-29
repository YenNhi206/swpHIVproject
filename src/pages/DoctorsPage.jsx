import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [setSchedule] = useState([]);
  const [page] = useState(0);
  const [size] = useState(10);
  const [setTotalPages] = useState(1);
  const [setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/doctors?page=${page}&size=${size}&search=${encodeURIComponent(
            searchTerm
          )}&searchBy=name`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Không thể tải danh sách bác sĩ");
        const data = await response.json();
        setDoctors(data.content || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Lỗi khi gọi API danh sách bác sĩ:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [page, size, searchTerm]);

  const fetchDoctorDetailsAndSchedule = async (doctorId) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      if (!token) {
        setSelectedDoctor(null);
        navigate("/login", { state: { from: `/doctors/${doctorId}` } });
        return;
      }

      const doctorResponse = await fetch(
        `http://localhost:8080/api/doctors/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!doctorResponse.ok) {
        if (doctorResponse.status === 401) {
          navigate("/login", { state: { from: `/doctors/${doctorId}` } });
        }
        throw new Error("Không thể tải chi tiết bác sĩ");
      }

      const doctorData = await doctorResponse.json();
      const currentDate = new Date().toISOString().split("T")[0];

      const scheduleResponse = await fetch(
        `http://localhost:8080/api/doctors/${doctorId}/schedule?date=${currentDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!scheduleResponse.ok) {
        if (scheduleResponse.status === 401) {
          navigate("/login", { state: { from: `/doctors/${doctorId}` } });
        }
        throw new Error("Không thể tải lịch trình");
      }

      const scheduleData = await scheduleResponse.json();
      setSelectedDoctor({ ...doctorData, schedule: scheduleData });
      setSchedule(scheduleData);
    } catch (error) {
      console.error("Lỗi khi gọi API chi tiết hoặc lịch trình:", error);
    }
  };

  useEffect(() => {
    if (selectedDoctor && selectedDoctor.id) {
      fetchDoctorDetailsAndSchedule(selectedDoctor.id);
    }
  }, [selectedDoctor?.id]);

  useEffect(() => {
    const pending = JSON.parse(sessionStorage.getItem("pendingAppointment"));
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (pending && token) {
      sessionStorage.removeItem("pendingAppointment");
      navigate("/appointments", { state: { doctor: pending.doctor } });
    }
  }, [location, navigate]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (doctor) => {
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    if (!token) {
      sessionStorage.setItem(
        "pendingAppointment",
        JSON.stringify({ doctor, from: "/doctors" })
      );
      navigate("/login");
    } else {
      navigate("/appointments", { state: { doctor } });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-3xl font-extrabold text-red-700 text-center"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        Chuyên gia - Bác sĩ
      </motion.h1>
    </motion.div>
  );
}
