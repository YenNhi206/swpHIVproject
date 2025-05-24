import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import SignupPage from '../features/auth/SignupPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Các route khác */}
        </Routes>
    );
}
