import React, { useMemo } from "react";
import useReveal from "@/hooks/useReveal";

function StepIcon({ type }) {
  if (type === 1) {
    return (<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden><rect x="4" y="8" width="24" height="16" rx="4" fill="#1E7A4F"/><rect x="8" y="12" width="16" height="8" rx="2" fill="#2FBF71"/></svg>);
  }
  if (type === 2) {
    return (<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden><circle cx="16" cy="16" r="12" fill="#1E7A4F"/><path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="3" fill="none"/></svg>);
  }
  if (type === 3) {
    return (<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden><circle cx="16" cy="12" r="6" fill="#2FBF71"/><rect x="8" y="18" width="16" height="8" rx="3" fill="#1E7A4F"/></svg>);
  }
  return (<svg width="32" height="32" viewBox="0 0 32 32" aria-hidden><rect x="6" y="8" width="20" height="12" rx="3" fill="#2FBF71"/><circle cx="16" cy="24" r="4" fill="#1E7A4F"/></svg>);
}

function VerificationGraphic() {
  return (
    <svg viewBox="0 0 540 160" className="w-full h-40" aria-hidden>
      <rect x="20" y="20" width="160" height="120" rx="12" fill="#F4F7F6" stroke="#1E7A4F" />
      <text x="100" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B3B2E">Cross-source Checks</text>
      <circle cx="60" cy="90" r="10" fill="#2FBF71" />
      <circle cx="100" cy="90" r="10" fill="#2FBF71" />
      <circle cx="140" cy="90" r="10" fill="#2FBF71" />
      <path d="M60 90 L100 90 L140 90" stroke="#0E7480" strokeWidth="3"/>

      <rect x="200" y="20" width="160" height="120" rx="12" fill="#F4F7F6" stroke="#1E7A4F" />
      <text x="280" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B3B2E">Methodologies</text>
      <text x="280" y="90" textAnchor="middle" fontSize="11" fill="#1F2937">ISO 14064-2 · GHG Protocol</text>

      <rect x="380" y="20" width="140" height="120" rx="12" fill="#F4F7F6" stroke="#1E7A4F" />
      <text x="450" y="50" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0B3B2E">Rewards</text>
      <text x="450" y="90" textAnchor="middle" fontSize="11" fill="#1F2937">Carbon Points</text>
    </svg>
  );
}

export default function HowItWorks() {
  useReveal();
  const steps = useMemo(() => ([
    { title: "1. Connect Data Sources", body: "Employees securely link transit accounts, EVs, utilities, and building systems via read-only connectors.", type: 1 },
    { title: "2. Verify & Quantify", body: "MRV engine validates events, applies ISO 14064-2 factors, and cross-checks across multiple APIs.", type: 2 },
    { title: "3. Earn Carbon Points", body: "Every verified kg CO₂e avoided is converted to Carbon Points with dynamic parameters.", type: 3 },
    { title: "4. Redeem Rewards", body: "Users spend points on curated sustainable brands or impact actions.", type: 4 },
  ]), []);

  const details = [
    { label: "Emission Factors", value: "BEIS (UK), EPA (US), region-based grid intensity" },
    { label: "Data Frequency", value: "15-min smart meter data; real-time transport events" },
    { label: "Anomaly Detection", value: "Statistical checks; cross-source deltas; GPS sanity checks" },
    { label: "Privacy", value: "Encryption at rest and in transit, anonymized analytics" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 reveal" data-testid="how-page">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-ink">How It Works</h1>
        <p className="mt-3 text-slate-700">Four steps, continuously verified. Built to be standards-aligned and scalable across industries.</p>
      </header>

      <ol className="mt-8 grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-lg border-t-4 border-leaf bg-white p-6 shadow transition hover:shadow-lg" data-testid={`how-step-item-${i+1}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-action-green text-white flex items-center justify-center font-bold">{i+1}</div>
            <div className="mt-6 flex items-center gap-3"><StepIcon type={s.type} /><h3 className="font-semibold text-forest-ink">{s.title}</h3></div>
            <p className="mt-2 text-slate-600 text-sm">{s.body}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Verification & Rewards Graphic</h2>
        <div className="mt-3 rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">
          <VerificationGraphic />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">System Details</h2>
        <dl className="mt-4 grid gap-4 md:grid-cols-2">
          {details.map((d) => (
            <div key={d.label} className="rounded-lg bg-white p-4 shadow ring-1 ring-slate-200" data-testid={`detail-${d.label}`}>
              <dt className="text-sm font-semibold text-forest-ink">{d.label}</dt>
              <dd className="text-sm text-slate-700">{d.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Interactive Demos</h2>
        <div className="mt-3 grid gap-6 md:grid-cols-3">
          {["Trip detection", "Grid-aware scheduling", "Reward simulation"].map((p) => (
            <button key={p} className="h-28 rounded-lg bg-white shadow ring-1 ring-slate-200 hover:shadow-lg transition grid place-items-center text-slate-700 text-sm" data-testid={`demo-${p}`}>
              {p} — demo (coming soon)
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
