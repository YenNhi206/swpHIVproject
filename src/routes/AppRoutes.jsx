// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import SignupPage from '../features/auth/SignupPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import AppointmentForm from '../features/appointment/AppointmentForm';
import DoctorAppointmentList from '../features/appointment/DoctorAppointments';
import UserAppointmentList from '../features/appointment/UserAppointments';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/appointments" element={<AppointmentForm />} />
                <Route path="/doctorappointments" element={<DoctorAppointmentList />} />
                <Route path="/userappointments" element={<UserAppointmentList />} />

            </Routes>
        </BrowserRouter>
    );
}
