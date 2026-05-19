import { useState } from "react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
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
    <nav className="px-4 md:flex md:items-center md:justify-between">
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

      {/* Nav links */}
      <div
        className={`mt-2 md:mt-0 md:flex md:items-center gap-1 text-primary-foreground ${
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
    </nav>
  );
}
