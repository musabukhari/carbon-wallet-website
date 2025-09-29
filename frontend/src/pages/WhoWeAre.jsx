import React from "react";
import { motion } from "framer-motion";

function InitialAvatar({ initial, hue = 150 }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="rounded-full shadow" aria-hidden>
      <defs>
        <linearGradient id={`g-${initial}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue},60%,40%)`} />
          <stop offset="100%" stopColor={`hsl(${hue},70%,30%)`} />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="32" fill={`url(#g-${initial})`} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="28" fontWeight="700" fill="#fff">{initial}</text>
    </svg>
  );
}

const fade = { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } };

export default function WhoWeAre() {
  return (
    <motion.main {...fade} className="mx-auto max-w-7xl px-6 py-16" data-testid="who-page">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-ink">Who We Are</h1>
        <p className="mt-3 text-slate-700">We are building the infrastructure for personal climate action—making low-carbon choices measurable, verified, and rewarded globally. No offsets or speculation: real behavior, real carbon, real value.</p>
      </header>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <motion.article whileHover={{ y: -2 }} className="rounded-xl bg-white p-6 shadow ring-1 ring-slate-200" data-testid="bio-umer">
          <div className="flex items-center gap-4">
            <InitialAvatar initial="U" hue={150} />
            <div>
              <h3 className="text-lg font-semibold text-forest-ink">Umer</h3>
              <p className="text-sm text-leaf font-semibold">CEO — Strategy, Sustainability & Partnerships</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">Umer leads our mission and partnerships, bringing deep experience across sustainability strategy and deployment with enterprises and cities. He focuses on unlocking measurable behavior change through incentives and trusted data.</p>
        </motion.article>

        <motion.article whileHover={{ y: -2 }} className="rounded-xl bg-white p-6 shadow ring-1 ring-slate-200" data-testid="bio-musa">
          <div className="flex items-center gap-4">
            <InitialAvatar initial="M" hue={190} />
            <div>
              <h3 className="text-lg font-semibold text-forest-ink">Musa</h3>
              <p className="text-sm text-leaf font-semibold">CTO — Engineering & Infrastructure</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-700">Musa architects our MRV platform and integrations. He ensures our system is secure, standards-aligned, and scalable—from real-time data ingestion to automated verification and rewards.</p>
        </motion.article>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {[{t:"Integrity",d:"We favor verifiable impact over optics."},{t:"Privacy",d:"Data minimization, encryption, and user control by default."},{t:"Impact",d:"Prioritize actions that drive real carbon outcomes."}].map((v) => (
          <motion.div key={v.t} whileHover={{ y: -2 }} className="rounded-lg bg-white p-6 shadow ring-1 ring-slate-200" data-testid={`value-${v.t}`}>
            <h3 className="font-semibold text-forest-ink">{v.t}</h3>
            <p className="mt-2 text-sm text-slate-700">{v.d}</p>
          </motion.div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Vision</h2>
        <ul className="mt-3 list-disc pl-6 text-slate-700 text-sm">
          <li>Zero self-reporting through trusted data integrations</li>
          <li>ISO 14064-2 and GHG Protocol alignment for audit-ready programs</li>
          <li>Delightful experiences that turn climate goals into everyday habits</li>
        </ul>
      </section>
    </motion.main>
  );
}
