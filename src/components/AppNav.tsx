import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile";
import BnBLogo from "../assets/BnBLogo.svg";
import { SSOEnabled } from "@/configuration";
import { getUseOidcAccessToken, NoSSOUserInfo } from "@/SSODisabledDefaults";
import UserInfo from "@/UserInfo";

export default function AppNav() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "text-accent" : "text-primary-foreground hover:text-accent"
    }`;
  const { accessTokenPayload } = getUseOidcAccessToken()();
  const userInfo = SSOEnabled ? (accessTokenPayload as UserInfo) : NoSSOUserInfo;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <img src={BnBLogo} alt="BnB Logo SVG" className="h-10 w-10"></img>
          {!isOpen && <h1 className="my-auto drop-shadow-lg">
            Bits <span className="text-orange -ml-1.5 -mr-1 tracking-tighter">‘n</span> Bytes
          </h1>}
        </Link>
    <nav className="px-4 flex md:items-center md:justify-between">
      {/* Nav links */}
      <div
        className={`md:flex md:items-center gap-1 text-primary-foreground ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        {/* <NavLink to="/contact" className={linkClass}>Contact</NavLink> */}
        <NavLink to="/admin" className={linkClass}>
          Admin
        </NavLink>

        {userInfo && (
          <>
            <div className="w-0.5 h-[1em] bg-muted hidden md:block" />
            <Profile />
          </>
        )}
      </div>

      {/* Logo / Brand */}
      <div className="flex items-center justify-between">
        {/* Hamburger button for mobile */}
        <button
          className="md:hidden text-primary-foreground focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span>&#10005;</span> // X icon
          ) : (
            <span>&#9776;</span> // Hamburger icon
          )}
        </button>
      </div>
    </nav>
        </div>
    </header>
  );
}
