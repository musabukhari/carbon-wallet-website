import React from "react";
import { motion } from "framer-motion";

export default function FAQ() {
  const items = [
    { q: "How is CO₂ reduction measured without self-reporting?", a: "We integrate with utility, transportation, and building APIs to measure verified activity data. Our MRV engine cross-validates multiple sources and applies ISO 14064-2 aligned methodology." },
    { q: "What kinds of actions earn Carbon Points?", a: "Public transit, EV charging, carpooling, HVAC optimization, energy efficiency upgrades, and more. We continue to add MRV-backed actions based on your deployments." },
    { q: "How are rewards calculated?", a: "We translate verified CO₂ savings to Carbon Points using region-appropriate emission factors and dynamic reward parameters informed by market conditions." },
    { q: "Do you store personal data?", a: "Yes, minimally and with privacy by design. We encrypt data in transit and at rest, anonymize analytics, and provide user control over data connections." },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <motion.main initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-5xl px-6 py-16" data-testid="faq-page">
      <h1 className="text-3xl font-bold text-forest-ink">Frequently Asked Questions</h1>
      <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      <dl className="mt-8 divide-y divide-slate-200 rounded-lg bg-white shadow ring-1 ring-slate-200">
        {items.map((it, i) => (
          <div key={i} className="p-6">
            <dt className="font-semibold text-forest-ink" data-testid={`faq-q-${i+1}`}>{it.q}</dt>
            <dd className="mt-2 text-slate-700" data-testid={`faq-a-${i+1}`}>{it.a}</dd>
          </div>
        ))}
      </dl>
    </motion.main>
  );
}
