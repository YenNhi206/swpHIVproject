import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    console.log("Dữ liệu đăng ký:", formData);
    // Gửi API đăng ký ở đây
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Thanh điều hướng */}
      <div className="w-full bg-gray-200 py-4 px-6 text-lg mt-[-15px]">
        <Link to="/" className="text-black hover:text-red-600 font-normal">Trang chủ</Link>
        <span className="text-gray-500 px-1">{">>"}</span>
        <span className="font-bold">Tạo tài khoản</span>
      </div>

      <div className="flex items-center justify-center flex-grow bg-gray-100 px-4">
        <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Đăng ký tài khoản</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Họ tên</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Ngày sinh</label>
                <input
                  type="date"
                  name="dob"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Giới tính</label>
                <div className="flex space-x-4 mt-1">
                  {["Nam", "Nữ", "Khác"].map((gender) => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      {gender}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  className="w-full mt-1 p-2 border rounded-md"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700">
              Đăng ký
            </button>

            <p className="mt-4 text-center text-gray-600">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
                Đăng nhập
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
