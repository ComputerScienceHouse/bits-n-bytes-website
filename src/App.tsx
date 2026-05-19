import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admin from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import BnBLogo from "./assets/BnBLogo.svg";
import AppNav from "./components/AppNav";
import InventoryPage from "./pages/admin/Inventory";
import RegistrationPage from "./pages/admin/Registration";
import { OidcSecure } from "@axa-fr/react-oidc";

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium transition-colors hover:text-accent ${
      isActive ? "text-accent" : "text-primary-foreground/90"
    }`;
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <img src={BnBLogo} alt="BnB Logo SVG" className="h-10 w-10"></img>
          <h1 className="my-auto drop-shadow-lg">
            Bits <span className="text-orange -ml-1.5 -mr-1 tracking-tighter">‘n</span> Bytes
          </h1>
        </Link>
        <AppNav />
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground/80">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm flex flex-wrap items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} Bits 'n Bytes — The Future of Vending, Powered by AI.</p>
        <p className="font-display text-xs uppercase tracking-widest text-accent">
          made with curiosity
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        {/* <TopBanner /> */}
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/admin"
              element={
                <OidcSecure>
                  <Admin />
                </OidcSecure>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                <OidcSecure>
                  <InventoryPage />
                </OidcSecure>
              }
            />
            <Route
              path="/admin/registration"
              element={
                <OidcSecure>
                  <RegistrationPage />
                </OidcSecure>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
