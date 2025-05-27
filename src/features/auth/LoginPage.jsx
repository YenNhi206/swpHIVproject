
import React, { useState } from "react";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { identifier, password } = credentials;

    if (!identifier || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    console.log("Đăng nhập với:", credentials);
    // Gọi API đăng nhập ở đây
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Đăng nhập</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Email hoặc Họ và Tên
            </label>
            <input
              type="text"
              name="identifier"
              required
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Email hoặc Họ tên"
              value={credentials.identifier}
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
              placeholder="Nhập mật khẩu"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
