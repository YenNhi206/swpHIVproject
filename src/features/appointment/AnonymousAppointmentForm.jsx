import React, { useState } from 'react';

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
    };

    const doctors = ['Dr. Nguyễn Văn A', 'Dr. Trần Thị B', 'Dr. Phạm Văn C'];

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded mt-20">
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
                    <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full border p-2 rounded" required />
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

                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Gửi yêu cầu</button>
            </form>
        </div>
    );
}
