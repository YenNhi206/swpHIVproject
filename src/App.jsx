import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";

import AdminDashboard from "./features/dashboard/AdminDashboard";
import DoctorDashboard from "./features/dashboard/DoctorDashboard";
import PatientDashboard from "./features/dashboard/PatientDashboard";

import Support from "./features/patientdashboard/Support";
import Reminder from "./features/patientdashboard/Reminder";
import History from "./features/patientdashboard/History";



import TreatmentDetail from "./features/treatments/TreatmentDetail";
import TreatmentList from "./features/treatments/TreatmentList";
import ResultPage from "./features/treatments/ResultPage";
import CreateTreatment from "./features/treatments/CreateTreatment";
import EditTreatment from "./features/treatments/EditTreatment";

import AppointmentForm from "./features/appointment/AppointmentForm";
import DoctorAppointmentList from "./features/appointment/DoctorAppointments";
import UserAppointmentList from "./features/appointment/UserAppointments";
import PatientProfile from "./features/users/PatientProfile";
import AnonymousAppointmentForm from "./features/appointment/AnonymousAppointmentForm";
import PaymentPage from "./features/payment/PaymentPage";


// 👉 Thêm ChatWidget ở đây:
import ChatWidget from "./components/ChatWidget";
import StaffDasshboard from "./features/dashboard/StaffDashboard";
import KnowledgePage from "./pages/KnowledgePage";




export default function App() {
  return (
    <Router>
      <Routes>
        {/* Các route sử dụng MainLayout */}

        <Route path="/users"
          element={
            <MainLayout>
              <PatientProfile />
            </MainLayout>
          }
        />
        <Route
          path="/treatment-results"
          element={
            <MainLayout>
              <ResultPage />
            </MainLayout>
          }
        />
        <Route
          path="/treatment"
          element={
            <MainLayout>
              <TreatmentList />
            </MainLayout>
          }
        />
         <Route
          path="/knowledge"
          element={
            <MainLayout>
              <KnowledgePage />
            </MainLayout>
          }
        />
        <Route
          path="/treatment/:id"
          element={
            <MainLayout>
              <TreatmentDetail />
            </MainLayout>
          }
        />
        <Route
          path="/treatment/create"
          element={
            <MainLayout>
              <CreateTreatment />
            </MainLayout>
          }
        />

        <Route
          path="/treatment/:id/edit"
          element={
            <MainLayout>
              <EditTreatment />
            </MainLayout>
          }
        />

        <Route
          path="/patient"
          element={
            <MainLayout>
              <PatientDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/support"
          element={
            <MainLayout>
              <Support />
            </MainLayout>
          }
        />
        <Route
          path="/reminder"
          element={
            <MainLayout>
              <Reminder />
            </MainLayout>
          }
        />

        <Route path="/history"
          element={
            <MainLayout>
              <History />
            </MainLayout>
          }
        />

        <Route path="/admin"
          element={
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          }
        />
        <Route path="/staff"
          element={
            <MainLayout>
              <StaffDasshboard/>
            </MainLayout>
          }
        />

        <Route path="/doctor"
          element={
            <MainLayout>
              <DoctorDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />

        {/* Các route sử dụng AuthLayout */}
        <Route
          path="/login" element={
            <MainLayout>


              <LoginPage />
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayout>
              <SignupPage />
            </MainLayout>
          }
        />
        <Route
          path="/appointments"
          element={
            <MainLayout>
              <AppointmentForm />
            </MainLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <AuthLayout>
              <PaymentPage />
            </AuthLayout>
          }
        />
        <Route
          path="/anonymous-appointment"
          element={
            <MainLayout>
              <AnonymousAppointmentForm />
            </MainLayout>
          }
        />
        <Route
          path="/doctorappointments"
          element={
            <AuthLayout>
              <DoctorAppointmentList />
            </AuthLayout>
          }
        />
        <Route
          path="/userappointments"
          element={
            <AuthLayout>
              <UserAppointmentList />
            </AuthLayout>
          }
        />

        {/* Trang không tìm thấy */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>

      {/* 👉 ChatWidget nằm ngoài Routes để luôn hiển thị */}
      <ChatWidget />
    </Router>
  );
}
