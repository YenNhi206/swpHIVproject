
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Navbar />

            {/* Nội dung trang */}
            <main className="flex-1">
                <Outlet />
            </main>


        </div>
    );
}
