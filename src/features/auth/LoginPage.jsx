
import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Thanh điều hướng */}
        <div className="w-full bg-gray-200 py-4 px-6 text-lg mt-[-15px]">
          <Link to="/" className="text-black hover:text-red-600 font-normal">Trang chủ</Link>
          <span className="text-gray-500 px-1">{">>"}</span>
          <span className="font-bold">Tài khoản</span>
        </div>
        <div />
        <div>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-4xl p-8 bg-white shadow-xl rounded-xl grid grid-cols-2 gap-25">
              {/* Đăng nhập */}
              <div>
                <h2 className="text-xl font-bold text-red-600 mb-4">Đăng nhập</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Email hoặc Họ và Tên</label>
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
                  <button type="submit" className="w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700">
                    Đăng nhập
                  </button>
                  <p className="mt-4 text-center text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link to="/signup" className="text-red-600 hover:text-red-700 font-medium">
                      Đăng ký ngay
                    </Link>
                  </p>
                </form>
              </div>

              {/* Quên mật khẩu */}
              <div>
                <p className="text-sm text-gray-600">Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.</p>
                <label className="block text-sm font-medium">Email:</label>
                <input type="email" className="w-full mt-2 p-2 border rounded-md" placeholder="Nhập email" />
                <button className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700">
                  Lấy lại mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


}
