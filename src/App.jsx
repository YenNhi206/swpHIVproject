import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";

import AdminDashboard from "./features/admin/AdminDashboard";
import DoctorDashboard from "./features/doctor/DoctorDashboard";
import PatientDashboard from "./features/patient/PatientDashboard";

import Support from "./features/patient/Support";
import History from "./features/patient/History";

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
import StaffDashboard from "./features/staff/StaffDashboard";
import KnowledgePage from "./pages/KnowledgePage";
import DoctorsPage from "./pages/DoctorsPage";
import ServicesPage from "./pages/ServicesPage";
import PatientAppointments from "./features/doctor/PatientAppointments";
import Footer from "./components/Footer";
import DoctorAlertsPage from "./features/doctor/DoctorAlertsPage";
import PatientDetailForDoctor from "./features/doctor/PatientDetailForDoctor";
import AdminAccountsPage from "./features/admin/AdminAccountsPage";
import AdminStatisticsPage from "./features/admin/AdminStatisticsPage";
import AdminFinancePage from "./features/admin/AdminFinancePage";
import AdminBlogManagement from "./features/admin/AdminBlogManagemen";
import StaffAppointment from "./features/staff/StaffAppointment";
import StaffPatientListPage from "./features/staff/StaffPatientListPage";
import StaffTestManagement from "./features/staff/StaffTestManagement";
import DoctorPatientList from "./features/doctor/DoctorPatientList";
import CreatePrescription from "./features/doctor/CreatePrescription";

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
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AboutPage />
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="/listdoctor"
          element={
            <MainLayout user={user} setUser={setUser}>
              <DoctorsPage />
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout user={user} setUser={setUser}>
              <ServicesPage />
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="/knowledge"
          element={
            <MainLayout user={user} setUser={setUser}>
              <KnowledgePage />
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="doctor/treatment"
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
          path="/treatment/edit/:id"
          element={
            <MainLayout user={user} setUser={setUser}>
              <EditTreatment />
            </MainLayout>
          }
        />
        <Route
          path="/patient/result/:patientId"
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
              <Footer />
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
          path="/doctor/patientappointments"
          element={
            <MainLayout user={user} setUser={setUser}>
              <PatientAppointments />
            </MainLayout>
          }
        />

        <Route
          path="/doctor/prescriptions/create"
          element={
            <MainLayout user={user} setUser={setUser}>
              <CreatePrescription />
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
          path="/history/:patientId"
          element={
            <MainLayout user={user} setUser={setUser}>
              <History />
              <Footer />
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
          path="/patient"
          element={
            <MainLayout user={user} setUser={setUser}>
              <PatientDashboard />
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
              <Footer />
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
          path="/doctor/alerts"
          element={
            <MainLayout user={user} setUser={setUser}>
              <DoctorAlertsPage />
            </MainLayout>
          }
        />

        <Route
          path="/doctor/patientlists"
          element={
            <MainLayout user={user} setUser={setUser}>
              <DoctorPatientList />
            </MainLayout>
          }
        />

        <Route
          path="/admin/accounts"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminAccountsPage />
            </MainLayout>
          }
        />

        <Route
          path="/admin/blogs"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminBlogManagement />
            </MainLayout>
          }
        />

        <Route
          path="/doctor/patientappointments/:patientId"
          element={
            <MainLayout user={user} setUser={setUser}>
              <PatientDetailForDoctor />
            </MainLayout>
          }
        />

        <Route
          path="/admin/statistics"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminStatisticsPage />
            </MainLayout>
          }
        />

        <Route
          path="/admin/finance"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminFinancePage />
            </MainLayout>
          }
        />
        <Route
          path="/admin/blog"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminBlogManagement />
            </MainLayout>
          }
        />

        <Route
          path="/staff/appointments"
          element={
            <MainLayout user={user} setUser={setUser}>
              <StaffAppointment />
            </MainLayout>
          }
        />
        <Route
          path="/staff/listpatients"
          element={
            <MainLayout user={user} setUser={setUser}>
              <StaffPatientListPage />
            </MainLayout>
          }
        />
        <Route
          path="/staff/testsmanagement"
          element={
            <MainLayout user={user} setUser={setUser}>
              <StaffTestManagement />
            </MainLayout>
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
