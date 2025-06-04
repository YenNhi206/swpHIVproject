import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnonymousAppointmentForm() {
    const [formData, setFormData] = useState({
        gender: '',
        reason: '',
        date: '',
        time: '',
        doctor: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            anonymous: true,
        };
        console.log('Đặt lịch ẩn danh:', dataToSubmit);
        // appointmentService.createAppointment(dataToSubmit)
        navigate('/payment', { state: { appointmentData: formData } });
    };
    const navigate = useNavigate();

    const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];
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
        <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl mt-30">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="text-red-600 hover:text-red-800 mb-4"
            >
                ← Trở lại
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-600">Đặt lịch ẩn danh</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Giới tính</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded" required>
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1">Vấn đề cần khám</label>
                    <textarea name="reason" value={formData.reason} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>

                <div>
                    <label className="block mb-1">Ngày hẹn</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border p-2 rounded" required />
                </div>

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
