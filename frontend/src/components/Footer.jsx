import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-forest-ink text-white" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-2xl font-bold"><span className="text-leaf">◆</span> Carbon<span className="font-light">Wallet</span></div>
            <p className="mt-2 text-sm text-white/70">Rewarding climate action, automatically.</p>
          </div>
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link to="/solution" className="hover:text-leaf" data-testid="footer-solution">Solution</Link></li>
              <li><Link to="/how-it-works" className="hover:text-leaf" data-testid="footer-how">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><Link to="/who-we-are" className="hover:text-leaf" data-testid="footer-about">Who We Are</Link></li>
              <li><a href="#get-started" className="hover:text-leaf" data-testid="footer-contact">Contact</a></li>
              <li><a href="#get-started" className="hover:text-leaf" data-testid="footer-careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-leaf" data-testid="footer-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-leaf" data-testid="footer-terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/70 flex items-center justify-between">
          <p>© 2025 Carbon Wallet. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white" data-testid="footer-social-linkedin">LinkedIn</a>
            <a href="#" className="hover:text-white" data-testid="footer-social-x">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
