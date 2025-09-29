import React from "react";

export default function Solution() {
  const pillars = [
    {
      title: "Automated Data Ingestion",
      desc: "Secure, read-only integrations to utilities, transport, HVAC, fleet telematics, and POS systems.",
      placeholder: "Logos: Utility APIs, Smart Meters, Fleet, HVAC (placeholder)"
    },
    {
      title: "Real-time MRV Engine",
      desc: "Continuous verification with cross-source validation, anomaly detection, and ISO 14064-2 alignment.",
      placeholder: "Diagram: MRV pipeline (placeholder)"
    },
    {
      title: "Compliance & Auditability",
      desc: "Automated audit trails, standards mapping (GHG Protocol), and verification partner integrations.",
      placeholder: "Badges: ISO, GHG Protocol (placeholder)"
    },
    {
      title: "Reward Orchestration",
      desc: "Translate verified savings into Carbon Points with dynamic pricing signals and marketplace redemption.",
      placeholder: "Card: Rewards marketplace (placeholder)"
    },
  ];

  const verification = [
    "Third-party verification via API (e.g., SustainCERT, Bureau Veritas)",
    "Multi-source cross-checks: smart meter vs utility bill vs POS",
    "Statistical anomaly detection and fraud prevention",
    "Automated compliance rule engine",
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16" data-testid="solution-page">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-ink">The Rewards Platform for Climate Action</h1>
        <p className="mt-3 text-slate-700">Built on a production-ready MRV architecture to measure real behavior, verify real carbon, and reward real value—without self-reporting.</p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-lg bg-white p-6 shadow ring-1 ring-slate-200" data-testid={`pillar-${p.title}`}>
            <h3 className="font-semibold text-forest-ink">{p.title}</h3>
            <p className="mt-2 text-slate-600 text-sm">{p.desc}</p>
            <div className="mt-4 h-28 w-full rounded-lg border border-dashed border-slate-300 grid place-items-center text-xs text-slate-500">{p.placeholder}</div>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Verification Workflows</h2>
        <ul className="mt-3 list-disc pl-6 text-slate-700 text-sm">
          {verification.map((v) => (<li key={v}>{v}</li>))}
        </ul>
      </section>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {["Zero Self-Reporting","Compliance-Ready","Privacy by Design"].map((f) => (
          <div key={f} className="rounded-lg bg-white p-6 shadow ring-1 ring-slate-200" data-testid={`feature-${f}`}>
            <h3 className="font-semibold text-forest-ink">{f}</h3>
            <p className="mt-2 text-slate-600 text-sm">
              {f === "Zero Self-Reporting" && "Proprietary API integrations to trusted sources; anomaly detection and multi-source validation ensure integrity."}
              {f === "Compliance-Ready" && "ISO 14064-2 and GHG Protocol mapping; automated compliance reporting and audit trails."}
              {f === "Privacy by Design" && "Encryption at rest and in transit, data minimization, and user control over integrations."}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Roadmap</h2>
        <ol className="mt-3 list-decimal pl-6 text-slate-700 text-sm">
          <li>Phase 1: Retail chain integration; POS + smart meter pilots.</li>
          <li>Phase 2: Energy industry expansion; HVAC and fleet integrations.</li>
          <li>Phase 3: End-to-end MRV platform with verification automation and marketplace connections.</li>
        </ol>
      </section>
    </main>
  );
}
