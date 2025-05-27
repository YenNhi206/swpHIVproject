import React from "react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
      <ul className="space-y-4">
        <li>Dashboard</li>
        <li>Appointments</li>
        <li>Treatments</li>
      </ul>
    </aside>
  );
}