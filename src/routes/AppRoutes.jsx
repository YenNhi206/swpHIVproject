// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import SignupPage from '../features/auth/SignupPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import AppointmentForm from '../features/appointment/AppointmentForm';
import DoctorAppointmentList from '../features/appointment/DoctorAppointments';
import UserAppointmentList from '../features/appointment/UserAppointments';
import PatientProfile from '../features/users/PatientProfile';
import AnonymousAppointmentForm from '../features/appointment/AnonymousAppointmentForm';
import PaymentPage from '../features/payment/PaymentPage';
import KnowledgePage from '../pages/KnowledgePage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/appointment" element={<AppointmentForm />} />
                <Route path="/appointment/anonymous" element={<AnonymousAppointmentForm />} />
                <Route path="/doctorappointments" element={<DoctorAppointmentList />} />
                <Route path="/userappointments" element={<UserAppointmentList />} />
                <Route path="/users" element={<PatientProfile />} />
                <Route path="/anonymous-appointment" element={<AnonymousAppointmentForm />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/knowledge" element={<KnowledgePage />} />


            </Routes>
        </BrowserRouter>
    );
}
