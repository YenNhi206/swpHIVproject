// src/features/payment/components/PaymentSummary.jsx
export default function PaymentSummary({ data }) {
    return (
        <div className="mb-4">
            <p><strong>Bác sĩ:</strong> {data.doctor}</p>
            <p><strong>Ngày:</strong> {data.date}</p>
            <p><strong>Giờ:</strong> {data.time}</p>
            <p><strong>Vấn đề:</strong> {data.reason}</p>
        </div>
    );
}
