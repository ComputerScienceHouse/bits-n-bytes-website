import React, { useState } from 'react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            onLogin();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="text-lg text-white max-w-2xl mx-auto">
                <div className="mb-4">
                    <label className="block mb-2">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 rounded"
                        style={{ color: 'black' }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 rounded"
                        style={{ color: 'black' }}
                        required
                    />
                </div>
                <button type="submit" className="p-2 bg-blue-500 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;