// File: src/layouts/MainLayout.jsx
import React from "react";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}