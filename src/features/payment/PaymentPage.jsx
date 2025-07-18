import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CreditCard, AlertCircle } from "lucide-react";

export default function PaymentPage() {
  const location = useLocation();
  const { appointmentData } = location.state || {};
  const [payUrl, setPayUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appointmentData || !appointmentData.price) {
      setError("Thiếu thông tin giá thanh toán");
      setLoading(false);
      return;
    }

    const fetchMoMoUrl = async () => {
      try {
        const orderId = `ORDER-${Date.now()}-${Math.floor(
          Math.random() * 100000
        )}`;
        const amount = appointmentData.price.toString();
        const orderInfo = `Thanh toán lịch hẹn với ${
          appointmentData.doctorName || "bác sĩ"
        }`;

        const redirectUrl = "http://localhost:5173/payment/result";
        const ipnUrl = "http://localhost:8080/api/payment/momo-ipn";

        const res = await fetch("/api/payment/momo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            amount,
            orderInfo,
            redirectUrl,
            ipnUrl,
          }),
        });

        const data = await res.json();
        if (res.ok && data.payUrl) {
          setPayUrl(data.payUrl);
        } else {
          throw new Error(data.error || "Không thể tạo yêu cầu thanh toán");
        }
      } catch (err) {
        console.error("Lỗi thanh toán:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoMoUrl();
  }, [appointmentData]);

  if (!appointmentData) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-red-50 p-6">
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700">
            Không có dữ liệu thanh toán
          </h2>
          <p className="text-gray-600 mt-2">Vui lòng quay lại và thử lại.</p>
        </div>
      </div>
    );
  }

  const displayPrice = appointmentData.price
    ? parseInt(appointmentData.price).toLocaleString()
    : "---";

  const price = Math.floor(Number(appointmentData.price));
  if (!Number.isInteger(price) || price <= 0) {
    alert("Giá trị thanh toán không hợp lệ!");
    return;
  }

  const body = {
    ...appointmentData,
    price: price.toString(), // nếu BE yêu cầu chuỗi số
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full border-t-4 border-red-600">
        <h1 className="text-2xl font-bold text-red-700 mb-6 flex items-center justify-center gap-2">
          <CreditCard className="w-6 h-6" />
          Thanh toán MoMo
        </h1>

        <div className="space-y-6 text-gray-700">
          <div className="border border-gray-200 p-4 rounded-lg">
            <p>
              <span className="font-semibold">Bác sĩ:</span>{" "}
              {appointmentData.doctorName || "---"}
            </p>
            <p>
              <span className="font-semibold">Ngày:</span>{" "}
              {appointmentData.appointmentDate?.split("T")[0] || "---"}
            </p>
            <p>
              <span className="font-semibold">Giờ:</span>{" "}
              {appointmentData.appointmentDate?.split("T")[1] || "---"}
            </p>
            <p>
              <span className="font-semibold">Giá:</span> {displayPrice} VND
            </p>
            {appointmentData.anonymous && (
              <p className="text-red-600 font-semibold mt-2">
                Lịch hẹn ẩn danh
              </p>
            )}
          </div>

          <div className="text-center mt-6">
            {loading ? (
              <p>Đang tạo yêu cầu thanh toán...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : payUrl ? (
              <>
                <p className="font-semibold mb-2">Bấm để thanh toán qua MoMo</p>
                <a
                  href={payUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
                >
                  Thanh toán MoMo
                </a>
              </>
            ) : (
              <p className="text-red-500">Không thể tạo yêu cầu thanh toán.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
