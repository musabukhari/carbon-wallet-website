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
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div className="rounded-lg bg-forest-ink/95 text-white shadow-xl ring-1 ring-white/10">
          <div className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
            <p className="truncate">
              We use cookies to personalize content and analyze traffic. Read our
              <a href="#" className="underline hover:text-leaf ml-1" data-testid="bottom-bar-privacy-link">Privacy Policy</a>.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <a href="#get-started" className="rounded-md bg-white/10 px-3 py-1 hover:bg-white/20" data-testid="bottom-bar-cta">Get started</a>
              <button
                onClick={() => { localStorage.setItem(STORAGE_KEY, "true"); setVisible(false); }}
                className="rounded-md bg-leaf px-3 py-1 font-semibold text-forest-ink hover:brightness-110"
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
