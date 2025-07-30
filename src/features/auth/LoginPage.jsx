import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Lock, Mail, Key } from "lucide-react";


export default function LoginPage({ setUser }) {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState(""); // Nhập mật khẩu mới ở bước 1
  const [otp, setOtp] = useState("");
  const [resetStep, setResetStep] = useState("email"); // "email" hoặc "otp"
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isForgotPassword) {
      if (name === "forgotEmail") setForgotEmail(value);
      if (name === "newPassword") setNewPassword(value);
      if (name === "otp") setOtp(value);
    } else {
      setCredentials((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const validateLoginForm = () => {
    const newErrors = {};
    if (!credentials.identifier)
      newErrors.identifier = "Email hoặc tên người dùng là bắt buộc";
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.identifier) &&
      !credentials.identifier.match(/^[a-zA-ZÀ-ỹ\s]+$/i)
    )
      newErrors.identifier = "Email hoặc tên người dùng không hợp lệ";
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
          localStorage.setItem("token", data.token);


          if (data.role === "DOCTOR") {
            localStorage.setItem("doctorId", data.doctorId);
          } else if (data.role === "PATIENT") {
            localStorage.setItem("patientId", data.patientId);
          } else if (data.role === "ADMIN") {
            localStorage.setItem("adminId", data.adminId);
          }


          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.username,
              role: data.role,
              token: data.token,
              fullName: data.fullName,
              doctorId: data.doctorId,
              patientId: data.patientId,
              adminId: data.adminId,
            })
          );


          setUser({
            username: data.username,
            role: data.role,
            token: data.token,
            fullName: data.fullName,
            doctorId: data.doctorId,
            patientId: data.patientId,
            adminId: data.adminId,
          });


          const pending = JSON.parse(sessionStorage.getItem("pendingAppointment"));
          if (pending && pending.doctor) {
            sessionStorage.removeItem("pendingAppointment");
            navigate("/appointments", { state: { doctor: pending.doctor } });
          } else {
            if (from) {
              navigate(from);
            } else {
              switch (data.role) {
                case "DOCTOR":
                  navigate("/patientappointments");
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


  const handleForgotPassword = async () => {
    setMessage("");
    if (!forgotEmail || !newPassword) {
      setMessage("Vui lòng nhập email và mật khẩu mới!");
      return;
    }
    const payload = { email: forgotEmail, newPassword };
    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Mã OTP đã được gửi về email. Vui lòng kiểm tra!");
        setResetStep("otp");
      } else {
        setMessage(data.message || "Gửi OTP thất bại");
      }
    } catch (error) {
      setMessage(error.message || "Có lỗi xảy ra");
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!otp) {
      setMessage("Vui lòng nhập mã OTP!");
      return;
    }
    const payload = { email: forgotEmail, otp };
    try {
      const response = await fetch("http://localhost:8080/api/auth/reset-password-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
        setIsForgotPassword(false);
        setResetStep("email");
        setForgotEmail("");
        setNewPassword("");
        setOtp("");
      } else {
        setMessage(data.message || "Xác thực OTP thất bại");
      }
    } catch (error) {
      setMessage(error.message || "Có lỗi xảy ra");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="flex-1 flex items-start justify-center px-4 pt-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 opacity-0 translate-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-2">
            <User className="w-6 h-6" /> {isForgotPassword ? "Quên mật khẩu" : "Đăng nhập"}
          </h2>
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center">
              {successMessage}
            </div>
          )}
          <form onSubmit={isForgotPassword ? handleResetPassword : handleLogin} className="space-y-6">
            {!isForgotPassword ? (
              <>
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
              </>
            ) : (
              <>
                {resetStep === "email" && (
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                        <Mail className="w-5 h-5 text-gray-400 mx-3" />
                        <input
                          type="email"
                          name="forgotEmail"
                          value={forgotEmail}
                          onChange={handleChange}
                          className="w-full p-3 border-none rounded-lg focus:outline-none"
                          placeholder="Nhập email của bạn"
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mật khẩu mới
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                        <Lock className="w-5 h-5 text-gray-400 mx-3" />
                        <input
                          type="password"
                          name="newPassword"
                          value={newPassword}
                          onChange={handleChange}
                          className="w-full p-3 border-none rounded-lg focus:outline-none"
                          placeholder="Nhập mật khẩu mới"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="w-full bg-red-600 text-white py-2 mt-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Gửi mã OTP
                    </button>
                  </div>
                )}
                {resetStep === "otp" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mã OTP
                      </label>
                      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-red-500">
                        <Key className="w-5 h-5 text-gray-400 mx-3" />
                        <input
                          type="text"
                          name="otp"
                          value={otp}
                          onChange={handleChange}
                          className="w-full p-3 border-none rounded-lg focus:outline-none"
                          placeholder="Nhập mã OTP"
                          required
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Xác nhận và đặt lại mật khẩu
                    </button>
                  </div>
                )}
                {message && (
                  <p className="text-red-600 text-center mt-2 text-sm">{message}</p>
                )}
              </>
            )}
          </form>
          {!isForgotPassword ? (
            <p className="mt-4 text-center text-gray-600">
              Chưa có tài khoản?{" "}
              <Link
                to="/signup"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Đăng ký ngay
              </Link>{" "}
              |{" "}
              <button
                onClick={() => {
                  setIsForgotPassword(true);
                  setMessage("");
                  setSuccessMessage("");
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Quên mật khẩu?
              </button>
            </p>
          ) : (
            <p className="mt-4 text-center text-gray-600">
              Quay lại{" "}
              <button
                onClick={() => {
                  setIsForgotPassword(false);
                  setResetStep("email");
                  setForgotEmail("");
                  setNewPassword("");
                  setOtp("");
                  setMessage("");
                  setSuccessMessage("");
                }}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Đăng nhập
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

