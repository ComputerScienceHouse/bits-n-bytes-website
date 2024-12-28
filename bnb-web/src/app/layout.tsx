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
                <Link href="/funding" className="text-black hover:text-blue-500">Funding</Link>
              </div>
          </nav>
        </header>
        <main className="container mx-auto py-6">{children}</main>      
      </body>
    </html>
  );
}
