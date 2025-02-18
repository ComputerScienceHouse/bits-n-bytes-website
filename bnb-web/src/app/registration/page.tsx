"use client";

import React, { useState } from 'react';

const RegistrationPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nfcToken, setNfcToken] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, nfcToken }),
        });

        if (response.ok) {
            console.log('User registered successfully');
        } else {
            console.error('Failed to register user');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
                Register Your NFC Token
            </h1>
            <form onSubmit={handleSubmit} className="text-lg text-white max-w-2xl mx-auto">
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded"
                        style={{ color: 'black' }}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded"
                        style={{ color: 'black' }} 
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">NFC Token:</label>
                    <input
                        type="text"
                        value={nfcToken}
                        onChange={(e) => setNfcToken(e.target.value)}
                        className="p-2 rounded"
                        style={{ color: 'black' }} 
                        required
                    />
                </div>
                <button type="submit" className="p-2 bg-blue-500 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationPage;