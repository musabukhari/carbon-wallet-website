import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const linkBase = "text-slate-600 hover:text-leaf transition-colors";
  const active = ({ isActive }) => (isActive ? "text-forest-ink font-semibold" : "");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm" data-testid="navbar">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-forest-ink" data-testid="navbar-logo">
          <span className="text-leaf">◆</span> Carbon<span className="font-light">Wallet</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/solution" className={({isActive}) => `${linkBase} ${active({isActive})}`} data-testid="nav-solution">Solution</NavLink>
          <NavLink to="/how-it-works" className={({isActive}) => `${linkBase} ${active({isActive})}`} data-testid="nav-how">How It Works</NavLink>
          <NavLink to="/about" className={({isActive}) => `${linkBase} ${active({isActive})}`} data-testid="nav-about">About</NavLink>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <a href="#get-started" className="rounded-lg px-4 py-2 font-medium text-forest-ink hover:bg-slate-100" data-testid="nav-demo-btn">Book a Demo</a>
          <a href="#get-started" className="rounded-lg bg-action-green px-4 py-2 font-semibold text-white shadow hover:brightness-110" data-testid="nav-early-access-btn">Request Early Access</a>
        </div>
      </nav>
    </header>
  );
}
