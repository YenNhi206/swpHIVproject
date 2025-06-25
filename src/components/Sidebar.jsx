import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Appointments', path: '/appointments' },
    { label: 'Treatments', path: '/treatment' },
  ];

  return (
    <motion.aside
      className="w-64 bg-gray-50 h-full p-4 shadow-md"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ul className="space-y-2">
        {navItems.map((item) => (
          <motion.li
            key={item.path}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to={item.path}
              className="block text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {item.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.aside>
  );
}