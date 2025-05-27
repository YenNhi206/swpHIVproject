
import React, { useState } from "react";

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

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    console.log("Dữ liệu đăng ký:", formData);
    // Gửi dữ liệu đến server tại đây
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white p-8 shadow-xl rounded-xl">
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
              <label className="block text-sm font-medium">EMAIL</label>
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
                required
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
                required
                className="w-full mt-1 p-2 border rounded-md"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Giới tính</label>
              <div className="flex space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formData.gender === "Nam"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.gender === "Nữ"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Nữ
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Khác"
                    checked={formData.gender === "Khác"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Khác
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Địa chỉ</label>
              <input
                type="text"
                name="address"
                required
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

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
