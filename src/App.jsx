import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DoctorTestResults from "./features/doctor/DoctorTestResults";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";

import AdminDashboard from "./features/admin/AdminDashboard";
import PatientDashboard from "./features/patient/PatientDashboard";

import Support from "./features/patient/Support";
import History from "./features/patient/History";

import TreatmentDetail from "./features/treatments/TreatmentDetail";
import TreatmentList from "./features/treatments/TreatmentList";
import ResultPage from "./features/treatments/ResultPage";
import CreateTreatment from "./features/treatments/CreateTreatment";
import EditTreatment from "./features/treatments/EditTreatment";

import AppointmentForm from "./features/appointment/AppointmentForm";

import PatientProfile from "./features/users/PatientProfile";
import AnonymousAppointmentForm from "./features/appointment/AnonymousAppointmentForm";
import PaymentPage from "./features/payment/PaymentPage";
import PaymentResultPage from "./features/payment/PaymentResultPage";

import Footer from "./components/Footer";

import KnowledgePage from "./pages/KnowledgePage";
import DoctorsPage from "./pages/DoctorsPage";
import ServicesPage from "./pages/ServicesPage";

import PatientAppointments from "./features/doctor/PatientAppointments";


import CreatePrescription from "./features/doctor/CreatePrescription";

import AdminAccountsPage from "./features/admin/AdminAccountsPage";
import AdminStatisticsPage from "./features/admin/AdminStatisticsPage";
import AdminBlogManagement from "./features/admin/AdminBlogManagemen";

import StaffDashboard from "./features/staff/StaffDashboard";
import StaffAppointment from "./features/staff/StaffAppointment";
import StaffPatientListPage from "./features/staff/StaffPatientListPage";
import StaffTestManagement from "./features/staff/StaffTestManagement";
import StaffTestResult from "./features/staff/StaffTestResult";

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
  path="/test-results"
  element={
    <MainLayout user={user} setUser={setUser}>
      <DoctorTestResults />
    </MainLayout>
  }
/>

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
          path="/patientappointments"
          element={
            <MainLayout user={user} setUser={setUser}>
              <PatientAppointments />
            </MainLayout>
          }
        />
        <Route
          path="/prescriptions"
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
            <AuthLayout user={user} setUser={setUser}>
              <PaymentPage />
            </AuthLayout>
          }
        />
        <Route
          path="/payment/result"
          element={
            <MainLayout user={user} setUser={setUser}>
              <PaymentResultPage />
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
          path="/admin/statistics"
          element={
            <MainLayout user={user} setUser={setUser}>
              <AdminStatisticsPage />
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
          path="/staff/testsresult"
          element={
            <MainLayout user={user} setUser={setUser}>
              <StaffTestResult />
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

    </Router>
  );
}
