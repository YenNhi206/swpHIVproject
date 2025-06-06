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
        console.log('Dữ liệu:', formData);
        navigate('/payment', { state: { appointmentData: formData } });
    };

    const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];
    const genderOptions = ['Nam', 'Nữ', 'Khác'];
    // Giờ hẹn theo khoảng thời gian 1 tiếng, bỏ 12:00 - 13:00
    const timeSlots = [
        { label: '08:00 - 09:00', value: '08:00' },
        { label: '09:00 - 10:00', value: '09:00' },
        { label: '10:00 - 11:00', value: '10:00' },
        { label: '11:00 - 12:00', value: '11:00' },
        { label: '13:00 - 14:00', value: '13:00' },
        { label: '14:00 - 15:00', value: '14:00' },
        { label: '15:00 - 16:00', value: '15:00' },
        { label: '16:00 - 17:00', value: '16:00' },
    ];


    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-white shadow-md rounded-xl mt-5">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-red-600 hover:text-red-800 mb-4"
            >
                ← Trở lại
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-600">Đặt lịch hẹn</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <InputField label="Họ tên" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <InputField label="Ngày sinh" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} required />

                {/* Giới tính */}
                <div>
                    <label className="block mb-1">Giới tính</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Chọn giới tính</option>
                        {genderOptions.map((option, idx) => (
                            <option key={idx} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <InputField label="Ngày hẹn" name="date" type="date" value={formData.date} onChange={handleChange} required />

                {/* Giờ hẹn */}
                <div>
                    <label className="block mb-1">Giờ hẹn</label>
                    <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Chọn giờ</option>
                        {timeSlots.map((slot, idx) => (
                            <option key={idx} value={slot.value}>{slot.label}</option>
                        ))}
                    </select>
                </div>


                {/* Lý do khám */}
                <div>
                    <label className="block mb-1">Vấn đề cần khám</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                {/* Chọn bác sĩ */}
                <div>
                    <label className="block mb-1">Chọn bác sĩ</label>
                    <select
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                        required
                    >
                        <option value="">Chọn bác sĩ</option>
                        {doctors.map((doctor, index) => (
                            <option key={index} value={doctor}>{doctor}</option>
                        ))}
                    </select>
                </div>

                {/* Submit */}
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Đặt lịch</button>

                <div className="text-sm text-center mt-4">
                    <span>Bạn muốn đặt lịch ẩn danh? </span>
                    <a href="/anonymous-appointment" className="text-red-600 hover:underline">Đặt lịch ẩn danh tại đây</a>
                </div>
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
