import React from "react";

export default function Button({ label, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center px-6 py-2 bg-red-600 text-white font-semibold rounded-2xl shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      {label}
    </button>
  );
}