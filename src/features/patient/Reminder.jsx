import React, { useState } from "react";

export default function Reminder() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    medicineTime: "",
    appointmentDate: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nhắc nhở:", formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Nhắc nhở uống thuốc & tái khám HIV
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
              type="time"
              name="medicineTime"
              required
              value={formData.medicineTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Giờ uống thuốc"
            />
            <input
              type="date"
              name="appointmentDate"
              required
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Ngày tái khám"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition"
          >
            Nhận nhắc nhở
          </button>
        </form>
      ) : (
        <div className="text-center text-green-700 bg-green-100 p-4 rounded-lg">
          <p className="font-semibold text-lg">
            Cảm ơn bạn! Hệ thống sẽ nhắc bạn đúng giờ uống thuốc và tái khám.
          </p>
        </div>
      )}
    </div>
  );
}
