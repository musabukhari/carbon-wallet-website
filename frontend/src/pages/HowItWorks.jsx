import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Connect Data Sources",
      body: "Employees securely link transit accounts, EVs, utilities, and building systems via read-only connectors.",
      placeholder: "Logos: TfL, Smartcar, Utility (placeholder)",
    },
    {
      title: "2. Verify & Quantify",
      body: "MRV engine validates events, applies ISO 14064-2 factors, and cross-checks across multiple APIs.",
      placeholder: "Diagram: Verification checks (placeholder)",
    },
    {
      title: "3. Earn Carbon Points",
      body: "Every verified kg CO₂e avoided is converted to Carbon Points with dynamic parameters.",
      placeholder: "Token/points graphic (placeholder)",
    },
    {
      title: "4. Redeem Rewards",
      body: "Users spend points on curated sustainable brands or impact actions.",
      placeholder: "Marketplace carousel (placeholder)",
    },
  ];

  const details = [
    { label: "Emission Factors", value: "BEIS (UK), EPA (US), region-based grid intensity" },
    { label: "Data Frequency", value: "15-min smart meter data; real-time transport events" },
    { label: "Anomaly Detection", value: "Statistical checks; cross-source deltas; GPS sanity checks" },
    { label: "Privacy", value: "Encryption at rest and in transit, anonymized analytics" },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16" data-testid="how-page">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-ink">How It Works</h1>
        <p className="mt-3 text-slate-700">Four steps, continuously verified. Built to be standards-aligned and scalable across industries.</p>
      </header>

      <ol className="mt-8 grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-lg border-t-4 border-leaf bg-white p-6 shadow" data-testid={`how-step-item-${i+1}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-action-green text-white flex items-center justify-center font-bold">{i+1}</div>
            <h3 className="mt-6 font-semibold text-forest-ink">{s.title}</h3>
            <p className="mt-2 text-slate-600 text-sm">{s.body}</p>
            <div className="mt-4 h-24 w-full rounded-lg border border-dashed border-slate-300 grid place-items-center text-xs text-slate-500">{s.placeholder}</div>
          </li>
        ))}
      </ol>

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
        <h2 className="text-xl font-semibold text-forest-ink">Use Cases</h2>
        <ul className="mt-3 list-disc pl-6 text-slate-700 text-sm">
          <li>Retail chains optimizing store energy spend with live grid intensity signals</li>
          <li>Corporate commuters earning points for public transit and EV charging</li>
          <li>Facilities tuning HVAC schedules to reduce peak-time emissions</li>
          <li>Fleet managers tracking EV energy vs ICE fuel baselines</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Placeholders</h2>
        <div className="mt-3 grid gap-6 md:grid-cols-3">
          {["Customer logos","Case studies","Partner integrations"].map((p) => (
            <div key={p} className="h-28 rounded-lg bg-white shadow ring-1 ring-dashed ring-slate-300 grid place-items-center text-slate-500 text-xs">{p} — placeholder</div>
          ))}
        </div>
      </section>
    </main>
  );
}
