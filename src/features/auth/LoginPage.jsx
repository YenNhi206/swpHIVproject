import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Đăng nhập với:', { email, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 border border-gray-200">
                <h2 className="text-4xl font-bold text-center mb-6 text-red-600 mb-1">
                    Welcome Back
                </h2>
                <p className="text-center mb-8 text-gray-600">Đăng nhập vào hệ thống HIV Treatment</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-red-600 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@mail.com"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-red-600 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-md font-semibold transition"
                    >
                        Đăng nhập
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500">
                    Bạn chưa có tài khoản?{' '}
                    <a href="/signup" className="text-red-600 hover:underline font-semibold">
                        Đăng ký ngay
                    </a>
                </p>
            </div>
        </div>
    );
}
