// File: src/features/treatments/TreatmentDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function TreatmentDetail() {
  const { id } = useParams();

  // Giả lập dữ liệu chi tiết, bạn có thể thay bằng fetch từ backend sau
  const treatmentData = {
    1: {
      name: "TDF + 3TC + DTG",
      content: (
        <>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">1. Thành phần thuốc</h2>
            <ul className="list-disc ml-6 mt-2">
              <li><strong>TDF:</strong> NRTI, ức chế sự sao chép của virus HIV.</li>
              <li><strong>3TC:</strong> NRTI, kết hợp với TDF tăng hiệu quả.</li>
              <li><strong>DTG:</strong> INSTI, ngăn virus tích hợp vào DNA tế bào.</li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">2. Liều dùng</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>TDF: 300 mg/ngày</li>
              <li>3TC: 300 mg/ngày</li>
              <li>DTG: 50 mg/ngày</li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">3. Chỉ định</h2>
            <p>Người ≥12 tuổi, ≥40kg, dùng cho điều trị ban đầu hoặc sau thất bại.</p>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">4. Tác dụng phụ</h2>
            <ul className="list-disc ml-6 mt-2">
              <li>Buồn nôn, tiêu chảy</li>
              <li>Mệt mỏi</li>
              <li>Ảnh hưởng chức năng thận (TDF)</li>
            </ul>
          </section>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">5. Theo dõi</h2>
            <p>Theo dõi chức năng thận, men gan và tải lượng virus.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold">6. Lưu ý</h2>
            <p>Không dùng nếu dị ứng thành phần thuốc. Tham khảo bác sĩ.</p>
          </section>
        </>
      )
    },

    2: {
      name: "AZT + 3TC + EFV",
      content: (
        <>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">1. Thành phần thuốc</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li><strong>AZT (Zidovudine):</strong> Là một NRTI, ức chế enzyme reverse transcriptase, ngăn virus HIV sao chép.</li>
              <li><strong>3TC (Lamivudine):</strong> Cũng là NRTI, kết hợp với AZT để tăng cường hiệu quả điều trị.</li>
              <li><strong>EFV (Efavirenz):</strong> Là một NNRTI, ức chế reverse transcriptase khác cơ chế với NRTI.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">2. Liều dùng</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>AZT: 300 mg/ngày</li>
              <li>3TC: 300 mg/ngày</li>
              <li>EFV: 600 mg/ngày (thường dùng vào buổi tối)</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">3. Chỉ định</h2>
            <p className="text-gray-700">Dành cho người ≥12 tuổi, ≥40kg. Thích hợp với người chưa từng điều trị hoặc thất bại điều trị trước đó.</p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">4. Tác dụng phụ</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Buồn nôn</li>
              <li>Mệt mỏi</li>
              <li>Đau đầu</li>
              <li>Thay đổi chức năng gan (EFV)</li>
              <li>Thiếu máu (AZT)</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">5. Theo dõi</h2>
            <p className="text-gray-700">Theo dõi chức năng gan, công thức máu và tải lượng virus thường xuyên để đánh giá hiệu quả và an toàn.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">6. Lưu ý</h2>
            <p className="text-gray-700">Không sử dụng nếu dị ứng với bất kỳ thành phần nào. Cần tham khảo ý kiến bác sĩ trước khi dùng.</p>
          </section>
        </>
      )
    },

    3: {
      name: "ABC + 3TC + LPV/r",
      content: (
        <>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">1. Thành phần thuốc</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li><strong>ABC (Abacavir):</strong> Là NRTI, ức chế enzyme reverse transcriptase, ngăn sao chép HIV.</li>
              <li><strong>3TC (Lamivudine):</strong> NRTI, tăng hiệu quả điều trị khi kết hợp với ABC.</li>
              <li><strong>LPV/r (Lopinavir/ritonavir):</strong> Là PI, Lopinavir ức chế enzyme protease, Ritonavir tăng cường tác dụng của Lopinavir.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">2. Liều dùng</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>ABC: 300 mg/ngày</li>
              <li>3TC: 300 mg/ngày</li>
              <li>LPV/r: 400 mg / 100 mg (Lopinavir/Ritonavir), dùng 2 lần/ngày</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">3. Chỉ định</h2>
            <p className="text-gray-700">
              Dùng cho phụ nữ mang thai để giảm nguy cơ lây truyền HIV từ mẹ sang con. Thích hợp cho cả bệnh nhân chưa điều trị hoặc thất bại điều trị.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">4. Tác dụng phụ</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Buồn nôn</li>
              <li>Tiêu chảy</li>
              <li>Mệt mỏi</li>
              <li>Phản ứng dị ứng (đặc biệt với ABC)</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">5. Theo dõi</h2>
            <p className="text-gray-700">
              Theo dõi chức năng gan, tải lượng virus và phản ứng phụ trong suốt quá trình điều trị. Cần kiểm tra định kỳ để đảm bảo hiệu quả.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">6. Lưu ý</h2>
            <p className="text-gray-700">
              Không dùng nếu có tiền sử dị ứng với bất kỳ thành phần nào (đặc biệt là ABC). Cần được bác sĩ chỉ định và theo dõi chặt chẽ.
            </p>
          </section>
        </>
      )
    },

    4: {
      name: "NVP + 3TC + AZT",
      content: (
        <>
          <section className="mb-4">
            <h2 className="text-xl font-semibold">1. Thành phần thuốc</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li><strong>NVP (Nevirapine):</strong> NNRTI, ức chế enzyme reverse transcriptase, ngăn sao chép HIV.</li>
              <li><strong>3TC (Lamivudine):</strong> NRTI, tăng hiệu quả điều trị khi kết hợp với NVP và AZT.</li>
              <li><strong>AZT (Zidovudine):</strong> NRTI, giúp ức chế HIV bằng cách ngăn enzyme reverse transcriptase.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">2. Liều dùng</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>NVP: 200 mg/ngày (trẻ &lt; 8 tuổi), tăng lên 400 mg/ngày nếu dung nạp tốt</li>
              <li>3TC: 4 mg/kg/ngày (tối đa 300 mg/ngày)</li>
              <li>AZT: 4 mg/kg/ngày (tối đa 300 mg/ngày)</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">3. Chỉ định</h2>
            <p className="text-gray-700">
              Dành cho trẻ em từ 2 tuổi trở lên, chưa điều trị hoặc thất bại điều trị trước đó.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">4. Tác dụng phụ</h2>
            <ul className="list-disc ml-6 mt-2 text-gray-700 space-y-1">
              <li>Phát ban da (NVP)</li>
              <li>Buồn nôn</li>
              <li>Mệt mỏi</li>
              <li>Thiếu máu (AZT)</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold">5. Theo dõi</h2>
            <p className="text-gray-700">
              Theo dõi chức năng gan, tải lượng virus và phản ứng phụ. Kiểm tra định kỳ để đảm bảo hiệu quả điều trị.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold">6. Lưu ý</h2>
            <p className="text-gray-700">
              Không dùng nếu trẻ có tiền sử dị ứng với bất kỳ thành phần nào. Cần được bác sĩ chỉ định và giám sát.
            </p>
          </section>
        </>
      )
    },





  };

  const treatment = treatmentData[id];

  if (!treatment) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Phác đồ không tồn tại</h2>
        <Link to="/treatment" className="text-blue-500 underline">Quay lại danh sách</Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-red-600 mb-6">{treatment.name}</h1>
      {treatment.content}
      <Link
        to="/treatment"
        className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        ← Quay lại danh sách
      </Link>
    </div>
  );
}
