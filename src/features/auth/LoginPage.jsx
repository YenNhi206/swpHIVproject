import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { User, Lock, Mail, Key } from "lucide-react";


export default function LoginPage({ setUser }) {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState("email");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const validateLoginForm = () => {
    const newErrors = {};
    if (!credentials.identifier) newErrors.identifier = "Email";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.identifier) &&
      !credentials.identifier.match(/^[a-zA-ZÀ-ỹ\s]+$/i)
    )
      newErrors.identifier = "Email";
    if (!credentials.password) newErrors.password = "Mật khẩu là bắt buộc";
    else if (credentials.password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateLoginForm()) {
      const payload = {
        email: credentials.identifier,
        password: credentials.password,
      };
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });


        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Thông tin đăng nhập không hợp lệ"
          );
        }


        const data = await response.json();
        if (data.success) {
          // Lưu token vào localStorage
          localStorage.setItem("token", data.token);
          // Lưu patientId riêng biệt
          localStorage.setItem("patientId", data.patientId);
          // Lưu user object
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.username,
              role: data.role,
              token: data.token,
              fullName: data.fullName,
              patientId: data.patientId,
            })
          );


          setUser({
            username: data.username,
            role: data.role,
            token: data.token,
            fullName: data.fullName,
            patientId: data.patientId,
          });


          const pending = JSON.parse(
            sessionStorage.getItem("pendingAppointment")
          );
          if (pending && pending.doctor) {
            sessionStorage.removeItem("pendingAppointment");
            navigate("/appointments", { state: { doctor: pending.doctor } });
          } else {
            if (from) {
              navigate(from);
            } else {
              switch (data.role) {
                case "DOCTOR":
                  navigate("/patientlists");
                  break;
                case "ADMIN":
                  navigate("/admin");
                  break;
                case "STAFF":
                  navigate("/staff");
                  break;
                default:
                  navigate("/");
                  break;
              }
            }
          }
        } else {
          setErrors({ server: data.message || "Đăng nhập thất bại" });
        }
      } catch (error) {
        setErrors({ server: error.message || "Có lỗi xảy ra" });
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 pt-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 opacity-0 translate-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
            <User className="w-6 h-6" /> Đăng nhập
          </h2>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Mail className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="text"
                  name="identifier"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  placeholder="Nhập email"
                  value={credentials.identifier}
                  onChange={handleChange}
                />
              </div>
              {errors.identifier && (
                <p className="text-red-600 text-sm mt-1">{errors.identifier}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                <Lock className="w-5 h-5 text-gray-400 mx-3" />
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full p-3 border-none rounded-lg focus:outline-none"
                  placeholder="Nhập mật khẩu"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Đăng nhập
            </button>
            {errors.server && (
              <p className="text-red-600 text-center mt-2">{errors.server}</p>
            )}
            <p className="mt-4 text-center text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}



