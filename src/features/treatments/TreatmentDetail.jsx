import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import Button from '../../components/Button';

export default function TreatmentDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const treatmentData = {
    1: {
      name: 'TDF + 3TC + DTG',
      content: (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Thành phần thuốc
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li><strong>TDF:</strong> NRTI, ức chế sự sao chép của virus HIV.</li>
              <li><strong>3TC:</strong> NRTI, kết hợp với TDF tăng hiệu quả.</li>
              <li><strong>DTG:</strong> INSTI, ngăn virus tích hợp vào DNA tế bào.</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Liều dùng
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>TDF: 300 mg/ngày</li>
              <li>3TC: 300 mg/ngày</li>
              <li>DTG: 50 mg/ngày</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              Chỉ định
            </h2>
            <p className="mt-2 text-gray-600">Người ≥12 tuổi, ≥40kg, dùng cho điều trị ban đầu hoặc sau thất bại.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              Tác dụng phụ
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>Buồn nôn, tiêu chảy</li>
              <li>Mệt mỏi</li>
              <li>Ảnh hưởng chức năng thận (TDF)</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              Theo dõi hiệu quả
            </h2>
            <p className="mt-2 text-gray-600">Theo dõi chức năng thận, men gan và tải lượng virus.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
              Lưu ý
            </h2>
            <p className="mt-2 text-gray-600">Không dùng nếu dị ứng thành phần thuốc. Tham khảo bác sĩ.</p>
          </section>
        </>
      ),
    },
    2: {
      name: 'AZT + 3TC + EFV',
      content: (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Thành phần thuốc
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li><strong>AZT (Zidov):</strong> NRTI, ức chế enzyme reverse transcriptase, ngăn virus HIV sao chép.</li>
              <li><strong>3TC (Lamiv):</strong> NRTI, kết hợp với AZT để tăng cường hiệu quả điều trị.</li>
              <li><strong>EFV (Efavir):</strong> NNRTI, ức chế reverse transcriptase khác cơ chế với NRTI.</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Liều dùng
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>AZT: 300 mg/ngày</li>
              <li>3TC: 300 mg/ngày</li>
              <li>EFV: 600 mg/ngày (thường dùng vào buổi tối)</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              Chỉ định
            </h2>
            <p className="mt-2 text-gray-600">Dành cho người ≥12 tuổi, ≥40kg. Thích hợp với người chưa từng điều trị hoặc thất bại điều trị trước đó.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              Tác dụng phụ
            </h2>
            <ul className="list-disc ml-8 mt-6 mt-2 text-gray-600 space-y-2">
              <li>Buồn nôn</li>
              <li>Mệt mỏi</li>
              <li>Đau đầu</li>
              <li>Thay đổi chức năng gan (EFV)</li>
              <li>Thiếu máu (AZT)</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              Theo dõi
            </h2>
            <p className="mt-2 text-gray-600">Theo dõi chức năng gan, công thức máu và tải lượng virus thường xuyên để đánh giá hiệu quả và an toàn.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
              Lưu ý
            </h2>
            <p className="mt-2 text-gray-600">Không sử dụng nếu dị ứng với bất kỳ thành phần nào. Cần cần tham khảo ý kiến bác sĩ trước khi dùng.</p>
          </section>
        </>
      ),
    },
    3: {
      name: 'ABC + 3TC + LPV/r',
      content: (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Thành phần thuốc
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li><strong>ABC (Abacavir):</strong> NRTI, ức chế enzyme reverse transcriptase, ngăn sao chép HIV.</li>
              <li><strong>3TC (Lamivudine):</strong> NRTI, tăng hiệu quả khi kết hợp với ABC.</li>
              <li><strong>LPV/r (Lopinavir/ritonavir):</strong> PI, Lopinavir ức chế enzyme protease, Ritonavir tăng cường tác dụng của Lopinavir.</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Liều dùng
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>ABC: 300 mg/ngày</li>
              <li>3TC: 300 mg/ngày</li>
              <li>LPV/r: 400 mg / 100 mg (Lopinavir/Ritonavir), dùng 2 lần/ngày</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              Chỉ định
            </h2>
            <p className="mt-2 text-gray-600">Dùng cho phụ nữ mang thai để giảm nguy cơ lây truyền HIV từ mẹ sang con. Thích hợp cho cả bệnh nhân chưa điều trị hoặc thất bại điều trị.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              Tác dụng phụ
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>Buôn nôn</li>
              <li>Tiêu chảy</li>
              <li>Mệt mỏi</li>
              <li>Phản ứng dị ứng (đặc biệt với ABC)</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              Theo dõi
            </h2>
            <p className="mt-2 text-gray-600">Theo dõi chức năng gan, tải lượng virus và phản ứng phụ trong suốt quá trình điều trị. Cần kiểm tra định kỳ để đảm bảo hiệu quả.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
              Lưu ý
            </h2>
            <p className="mt-2 text-gray-600">Không dùng nếu có tiền sử dị ứng với bất kỳ thành phần nào (đặc biệt là ABC). Cần được bác sĩ chỉ định và theo dõi chặt chẽ.</p>
          </section>
        </>
      ),
    },
    4: {
      name: 'NVP + 3TC + AZT',
      content: (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
              Thành phần thuốc
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li><strong>NVP (Nevirapine):</strong> NNRTI, ức chế enzyme reverse transcriptase, ngăn sao chép HIV.</li>
              <li><strong>3TC (Lamivudine):</strong> NRTI, tăng hiệu quả điều trị khi kết hợp với NVP và AZT.</li>
              <li><strong>AZT (Zidovudine):</strong> NRTI, giúp ức chế HIV bằng cách ngăn enzyme reverse transcriptase.</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
              Liều dùng
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>NVP: 200 mg/ngày (trẻ nhỏ 8 tuổi), tăng lên 400 mg/ngày nếu dung nạp tốt</li>
              <li>3TC: 4 mg/kg/ngày (tối đa 300 mg/ngày)</li>
              <li>AZT: 4 mg/kg/ngày (tối đa 300 mg/ngày)</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
              Chỉ định
            </h2>
            <p className="mt-2 text-gray-600">Dành cho trẻ em từ 2 tuổi trở lên, chưa điều trị hoặc thất bại điều trị trước đó.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
              Tác dụng phụ
            </h2>
            <ul className="list-disc ml-8 mt-2 text-gray-600 space-y-2">
              <li>Phát ban da (NVP)</li>
              <li>Buồn nôn</li>
              <li>Mệt mỏi</li>
              <li>Thiếu máu (AZT)</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
              Theo dõi
            </h2>
            <p className="mt-2 text-gray-600">Theo dõi chức năng gan, tải lượng virus và phản ứng phụ. Kiểm tra định kỳ để đảm bảo hiệu quả điều trị.</p>
          </section>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
              Lưu ý
            </h2>
            <p className="mt-2 text-gray-600">Không dùng nếu trẻ có tiền sử dị ứng với bất kỳ thành phần nào. Cần được bác sĩ chỉ định và giám sát.</p>
          </section>
        </>
      ),
    },
  };

  const treatment = treatmentData[id];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!treatment) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-10 font-sans"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl font-bold text-red-600 mb-4"
            variants={itemVariants}
          >
            Phác đồ không tồn tại
          </motion.h2>
          <Link
            to="/treatment"
            className="inline-flex items-center gap-2 text-red-600 hover:underline"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại danh sách
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
          <>
            <motion.h1
              className="text-3xl sm:text-4xl font-bold text-red-600 mb-6"
              variants={itemVariants}
            >
              {treatment.name}
            </motion.h1>
            {treatment.content}
            <motion.div
              className="flex flex-wrap gap-4 mt-8"
              variants={containerVariants}
            >
              <Button
                label="Quay lại danh sách"
                onClick={() => navigate('/treatment')}
                icon={<ArrowLeft className="w-5 h-5" />}
              />
              <Button
                label="Chia sẻ phác đồ"
                onClick={() => alert('Chức năng chia sẻ đang phát triển!')}
                icon={<Share2 className="w-5 h-5" />}
              />
              <Button
                label="Tải PDF"
                onClick={() => alert('Chức năng tải PDF đang phát triển!')}
                icon={<Download className="w-5 h-5" />}
              />
            </motion.div>
          </>
       
  );
}