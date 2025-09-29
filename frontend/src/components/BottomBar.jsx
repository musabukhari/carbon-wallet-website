import React, { useEffect, useState } from "react";

const STORAGE_KEY = "cw_cookies_accepted";

export default function BottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50" data-testid="bottom-bar">
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <div className="rounded-xl bg-forest-ink/95 text-white shadow-xl ring-1 ring-white/10">
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/90">
              We use cookies to personalize content and to analyze our traffic. Read our
              <a href="#" className="underline hover:text-leaf ml-1" data-testid="bottom-bar-privacy-link">Privacy Policy</a>.
              <span className="ml-3 hidden sm:inline text-white/70">Contact: <a href="mailto:hello@carbonwallet.app" className="underline hover:text-leaf">hello@carbonwallet.app</a></span>
            </p>
            <div className="flex items-center gap-3">
              <a href="#get-started" className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20" data-testid="bottom-bar-cta">Get started</a>
              <button
                onClick={() => { localStorage.setItem(STORAGE_KEY, "true"); setVisible(false); }}
                className="rounded-lg bg-leaf px-4 py-2 text-sm font-semibold text-forest-ink hover:brightness-110"
                data-testid="bottom-bar-accept-button"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
