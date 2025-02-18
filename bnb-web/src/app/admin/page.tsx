"use client";


import React, { useState } from 'react';
import Link from 'next/link';
import Login from '../login';

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
                <div className="text-4xl font-bold text-white mb-4">
                    <Link href="/tare">Tare</Link>
                </div>
                <div className="text-4xl font-bold text-white mb-4">
                    <Link href="/registration">Registration</Link>
                </div>
            </h1>
        </div>
    );
}