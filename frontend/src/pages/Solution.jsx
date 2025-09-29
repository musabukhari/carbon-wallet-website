import React from "react";

export default function Solution() {
  const features = [
    {
      title: "Zero Self-Reporting",
      desc: "Proprietary APIs connect to trusted data sources with anomaly detection for integrity.",
    },
    {
      title: "Compliance-Ready",
      desc: "Pre-approved emissions factors and ISO 14064-2 aligned methodologies.",
    },
    {
      title: "Privacy by Design",
      desc: "End-to-end encryption with GDPR and CCPA compliance.",
    },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16" data-testid="solution-page">
      <h1 className="text-3xl font-bold text-forest-ink">The Rewards Platform for Climate Action</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-lg bg-white p-6 shadow ring-1 ring-slate-200" data-testid={`feature-${f.title}`}>
            <h3 className="font-semibold text-forest-ink">{f.title}</h3>
            <p className="mt-2 text-slate-600 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
