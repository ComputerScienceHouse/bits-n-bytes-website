import './globals.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <header className="sticky top-0 bg-white shadow-md p-4 z-50">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-black">
              <Link href="/home" className="text-black hover:text-blue-500">
                Bits n' Bytes
              </Link>
            </h1>
              <div className="space-x-4">
                <Link href="/about" className="text-black hover:text-blue-500">About</Link>
                <Link href="/contact" className="text-black hover:text-blue-500">Contact</Link>
              </div>
          </nav>
        </header>
        <main className="container mx-auto py-6">{children}</main>
        <footer className="bg-gray-900 text-white py-6">
          <div className="container mx-auto text-center space-y-4">
            <div className="flex justify-center space-x-6">
              <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
            <div className="text-sm space-x-4">
              <a href="#" className="hover:underline">Info</a>
              <a href="#" className="hover:underline">Support</a>
              <a href="#" className="hover:underline">Marketing</a>
            </div>
            <div className="text-xs text-gray-400">
              <a href="#" className="hover:underline">Terms of Use</a> · <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
