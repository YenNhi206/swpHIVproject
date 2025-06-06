// File: src/features/support/Support.jsx
import React, { useState } from "react";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tư vấn:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Đặt lịch tư vấn trực tuyến về HIV
      </h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition"
          >
            Đặt lịch tư vấn
          </button>
        </form>
      ) : (
        <div className="text-center text-green-700 bg-green-100 p-4 rounded-lg">
          <p className="font-semibold text-lg">Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm nhất.</p>
        </div>
      )}
    </div>
  );
}
