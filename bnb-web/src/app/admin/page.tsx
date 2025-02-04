import Link from "next/link";

export default function AdminPage() { 
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