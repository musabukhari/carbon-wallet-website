import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Securely Connect Data",
      body: "Employees link data sources like transit cards, utility meters, or EV chargers via secure, read-only integrations.",
    },
    { title: "Automatically Verify CO₂", body: "AI-powered MRV engine calculates CO₂ savings using ISO-compliant methodologies." },
    { title: "Instantly Earn Points", body: "Earn Carbon Points for every verified kg of CO₂ saved." },
    { title: "Redeem Exclusive Rewards", body: "Spend points in our curated marketplace on sustainable brands and services." },
  ];

  return (
    <main className="mx-auto max-w-7xl px-6 py-16" data-testid="how-page">
      <h1 className="text-3xl font-bold text-forest-ink">How It Works</h1>
      <ol className="mt-8 grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="relative rounded-lg border-t-4 border-leaf bg-white p-6 shadow" data-testid={`how-step-item-${i+1}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-action-green text-white flex items-center justify-center font-bold">{i+1}</div>
            <h3 className="mt-6 font-semibold text-forest-ink">{s.title}</h3>
            <p className="mt-2 text-slate-600 text-sm">{s.body}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
