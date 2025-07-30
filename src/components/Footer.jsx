import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      className="bg-white border-t border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center justify-center gap-2">
          Đối tác hỗ trợ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "BV Nhiệt Đới TP.HCM",
              image: "https://benhnhietdoi.vn/wp-content/themes/yootheme/cache/e1/logo-header-1-e142e9a4.webp",
              description: "Trung tâm điều trị bệnh truyền nhiễm hàng đầu tại Việt Nam.",
              link: "https://benhnhietdoi.vn",
              linkLabel: "benhnhietdoi.vn",
            },
            {
              name: "Viện Pasteur TP.HCM",
              image: "http://tiemchung.pasteurhcm.gov.vn/Contents/Themes/client/images/logo-pastuer.png",
              description: "Trung tâm nghiên cứu và phòng chống dịch bệnh lớn tại miền Nam.",
              link: "http://www.pasteurhcm.gov.vn/",
              linkLabel: "pasteurhcm.gov.vn",
            },
            {
              name: "UNAIDS Việt Nam",
              image: "https://www.liblogo.com/img-logo/un5310u65c-unaids-logo-unaids-ungis.png",
              description: "Tổ chức quốc tế hỗ trợ phòng chống HIV/AIDS tại Việt Nam.",
              link: "https://www.unaids.org/en",
              linkLabel: "unaids.org",
            },
            {
              name: "Trung tâm HIV/AIDS TP HCM",
              image: "https://keangnamkorea.com/wp-content/uploads/2025/02/Logo-So-Y-Te-TPHCM-Department-of-Healt-of-HCM-City.webp",
              description: "Đơn vị trực thuộc Sở Y tế địa phương, cung cấp dịch vụ tư vấn & điều trị.",
              link: "#",
              linkLabel: "medinet.hochiminhcity.gov.vn"

            },
          ].map((partner, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col justify-between items-center text-center h-full min-h-[240px]"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-20 h-20 object-contain mb-3"
                />
                <h3 className="font-semibold text-lg text-red-700 mb-1">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {partner.description}
                </p>
              </div>
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:underline text-sm font-medium mt-auto"
              >
                {partner.linkLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-red-600 text-white py-5 mt-6 shadow-inner text-sm">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
          <p>
            <strong>© 2025 Hệ thống Dịch vụ Y tế và Điều trị HIV - Bộ Y Tế</strong>
          </p>
          <p>
            Trụ sở: 123 Đường Sức Khoẻ, Quận 3, TP. Hồ Chí Minh, Việt Nam <br />
            Tel: (028) 1234 5678 · E-mail:{" "}
            <a
              href="mailto:contact@hivtreatment.vn"
              className="underline hover:text-gray-200"
            >
              contact@hivtreatment.vn
            </a>
          </p>
          <p>Giám đốc hệ thống: TS.BS. Nguyễn Văn A</p>
          <p className="text-gray-300 text-sm">
            Giấy phép số 123/GP-BC ngày 01/01/2025 của Cục Báo chí, Bộ Văn hoá, Thông tin
          </p>
        </div>
      </div>
    </motion.footer>
  );
}