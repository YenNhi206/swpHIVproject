import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AppointmentForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: '',
        doctor: '',
        gender: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/payment', { state: { appointmentData: formData } });
    };

    const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-20">
            <h2 className="text-xl font-bold mb-4 text-red-600">Đặt lịch hẹn</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField label="Họ tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <InputField label="Ngày sinh" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} required />
                <InputField label="Giới tính" name="gender" value={formData.gender} onChange={handleChange} required />

                <InputField label="Ngày hẹn" name="date" type="date" value={formData.date} onChange={handleChange} required />
                <InputField label="Giờ hẹn" name="time" type="time" value={formData.time} onChange={handleChange} required />

                <div>
                    <label className="block mb-1">Vấn đề cần khám</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>

                <div>
                    <label className="block mb-1">Chọn bác sĩ</label>
                    <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Chọn bác sĩ</option>
                        {doctors.map((doctor, index) => (
                            <option key={index} value={doctor}>{doctor}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Đặt lịch</button>
            </form>

        </div>
    );
}

function InputField({ label, name, value, onChange, type = "text", required = false }) {
    return (
        <div>
            <label className="block mb-1">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full border p-2 rounded"
            />
        </div>
    );
}
