
// File: src/App.jsx
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

import TreatmentDetail from "./features/treatments/TreatmentDetail";
import TreatmentList from "./features/treatments/TreatmentList";
import ResultPage from "./features/treatments/ResultPage";

import UserDetail from "./features/users/UserDetail";
import UserList from "./features/users/UserList";

export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* Các route sử dụng MainLayout */}
        <Route path="/users"
          element={
            <MainLayout>
               <UserList/>
            </MainLayout>
            }
            />


        <Route path="/users/:id"
          element={
            <MainLayout>
               <UserDetail/>
            </MainLayout>
            }
            />

         <Route path="/treatment-results"
          element={
            <MainLayout>
               <ResultPage/>
            </MainLayout>
            }
            />

         <Route path="/treatment"
          element={
            <MainLayout>
               <TreatmentList/>
            </MainLayout>
            }
            />

         <Route path="/treatment/:id"
          element={
            <MainLayout>
               <TreatmentDetail/>
            </MainLayout>
            }
            />


         <Route path="/patient"
          element={
            <MainLayout>
               <PatientDashboard />
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
          <Route path="/doctor" element={
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
          path="/login"element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout>
              <SignupPage />
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
    </Router>
  );
}
