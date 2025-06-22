import React, { useState, useEffect } from "react";
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

import ChatWidget from "./components/ChatWidget";
import StaffDashboard from "./features/dashboard/StaffDashboard";
import KnowledgePage from "./pages/KnowledgePage";
import DoctorsPage from "./pages/DoctorsPage";
import ServicesPage from "./pages/ServicesPage";

export default function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout user={user} setUser={setUser}>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/listdoctor"
          element={
            <MainLayout user={user} setUser={setUser}>
              <DoctorsPage />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout user={user} setUser={setUser}>
              <ServicesPage />
            </MainLayout>
          }
        />
        <Route
          path="/knowledge"
          element={
            <MainLayout user={user} setUser={setUser}>
              <KnowledgePage />
            </MainLayout>
          }
        />
        <Route
          path="/treatment"
          element={
            <MainLayout user={user} setUser={setUser}>
              <TreatmentList />
            </MainLayout>
          }
        />
        <Route
          path="/treatment/:id"
          element={
            <MainLayout user={user} setUser={setUser}>
              <TreatmentDetail />
            </MainLayout>
          }
        />
        <Route
          path="/treatment/create"
          element={
            <MainLayout user={user} setUser={setUser}>
              <CreateTreatment />
            </MainLayout>
          }
        />
        <Route
          path="/treatment/:id/edit"
          element={
            <MainLayout user={user} setUser={setUser}>
              <EditTreatment />
            </MainLayout>
          }
        />
        <Route
          path="/treatment-results"
          element={
            <MainLayout user={user} setUser={setUser}>
              <ResultPage />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout user={user} setUser={setUser}>
              <PatientProfile />
            </MainLayout>
          }
        />
        <Route
          path="/appointments"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AppointmentForm />
            </MainLayout>
          }
        />
        <Route
          path="/anonymous-appointment"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AnonymousAppointmentForm />
            </MainLayout>
          }
        />
        <Route
          path="/support"
          element={
            <MainLayout user={user} setUser={setUser}>
              <Support />
            </MainLayout>
          }
        />
        <Route
          path="/reminder"
          element={
            <MainLayout user={user} setUser={setUser}>
              <Reminder />
            </MainLayout>
          }
        />
        <Route
          path="/history"
          element={
            <MainLayout user={user} setUser={setUser}>
              <History />
            </MainLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/doctor"
          element={
            <MainLayout user={user} setUser={setUser}>
              <DoctorDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/staff"
          element={
            <MainLayout user={user} setUser={setUser}>
              <StaffDashboard />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout user={user} setUser={setUser}>
              <LoginPage setUser={setUser} />
            </MainLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayout user={user} setUser={setUser}>
              <SignupPage />
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
        <Route
          path="*"
          element={
            <MainLayout user={user} setUser={setUser}>
              <NotFoundPage />
            </MainLayout>
          }
        />
      </Routes>
      <ChatWidget />
    </Router>
  );
}
