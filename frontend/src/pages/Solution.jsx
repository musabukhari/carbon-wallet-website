import React, { useState } from "react";
import { motion } from "framer-motion";

function PipelineDiagram() {
  const nodes = ["Data", "MRV", "Verify", "Rewards"];
  return (
    <div className="grid grid-cols-4 gap-4">
      {nodes.map((n) => (
        <div key={n} className="rounded-lg bg-action-green/90 px-4 py-3 text-white text-center font-semibold shadow">
          {n}
        </div>
      ))}
    </div>
  );
}

function CategoryLogos() {
  const items = [
    { label: "Utilities", initial: "U" },
    { label: "Transit", initial: "T" },
    { label: "HVAC", initial: "H" },
    { label: "Fleet", initial: "F" },
  ];
  return (
    <div className="grid grid-cols-4 gap-3" aria-label="integration-categories">
      {items.map((it, i) => (
        <div key={it.label} className="flex items-center gap-2" data-testid={`logo-${it.label}`}>
          <div className={`grid h-7 w-7 place-items-center rounded-full text-white font-bold ${i % 2 ? "bg-leaf" : "bg-sea-teal"}`}>{it.initial}</div>
          <span className="text-sm text-slate-700">{it.label}</span>
        </div>
      ))}
    </div>
  );
}

function ComplianceBadges() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full bg-mist px-3 py-1 text-forest-ink ring-1 ring-slate-200">ISO 14064-2</span>
      <span className="rounded-full bg-mist px-3 py-1 text-forest-ink ring-1 ring-slate-200">GHG Protocol</span>
      <span className="rounded-full bg-mist px-3 py-1 text-forest-ink ring-1 ring-slate-200">Audit Trail</span>
    </div>
  );
}

const parent = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const child = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Solution() {
  const pillars = [
    {
      title: "Automated Data Ingestion",
      desc: "Secure, read-only integrations to utilities, transport, HVAC, fleet telematics, and POS systems.",
      details: "Data normalization and unit harmonization ensure consistent, comparable metrics across sources.",
      visual: <CategoryLogos />,
    },
    {
      title: "Real-time MRV Engine",
      desc: "Continuous verification with cross-source validation, anomaly detection, and ISO 14064-2 alignment.",
      details: "Rule engines map activities to methodologies; anomalies trigger revalidation or user prompts.",
      visual: <PipelineDiagram />,
    },
    {
      title: "Compliance & Auditability",
      desc: "Automated audit trails, standards mapping (GHG Protocol), and verification partner integrations.",
      details: "Export audit-ready evidence bundles with data lineage and checkpoint hashes.",
      visual: <ComplianceBadges />,
    },
    {
      title: "Reward Orchestration",
      desc: "Translate verified savings into Carbon Points with dynamic pricing signals and marketplace redemption.",
      details: "Dynamic multipliers reflect grid intensity and program priorities; APIs enable partner rewards.",
      visual: <div className="h-10 w-full rounded bg-mist grid place-items-center text-xs">Rewards Marketplace</div>,
    },
  ];

  const verification = [
    { title: "Third-party verification via API", desc: "Automated validation with partners like SustainCERT and Bureau Veritas." },
    { title: "Multi-source cross-checks", desc: "Compare smart meters, utility bills, POS, and device telemetry in real time." },
    { title: "Anomaly detection & fraud prevention", desc: "Statistical detection and GPS sanity checks to ensure integrity." },
    { title: "Compliance rule engine", desc: "Programmatic checks against ISO 14064-2 and GHG Protocol." },
  ];

  const [open, setOpen] = useState(null);

  return (
    <motion.main initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto max-w-7xl px-6 py-16" data-testid="solution-page">
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-ink">The Rewards Platform for Climate Action</h1>
        <p className="mt-3 text-slate-700">Built on a production-ready MRV architecture to measure real behavior, verify real carbon, and reward real value—without self-reporting.</p>
      </header>

      <motion.section variants={parent} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-10 grid gap-5 md:grid-cols-2">
        {pillars.map((p, idx) => (
          <motion.div key={p.title} variants={child} whileHover={{ y: -2 }} className="rounded-lg bg-white p-5 shadow ring-1 ring-slate-200" data-testid={`pillar-${p.title}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-forest-ink">{p.title}</h3>
                <p className="mt-2 text-slate-600 text-sm">{p.desc}</p>
              </div>
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="rounded-md px-2 py-1 text-sm text-forest-ink hover:bg-slate-100"
                data-testid={`pillar-toggle-${idx}`}
              >{open === idx ? "Hide" : "Details"}</button>
            </div>
            <div className="mt-4">{p.visual}</div>
            {open === idx && (
              <p className="mt-4 text-sm text-slate-700" data-testid={`pillar-details-${idx}`}>{p.details}</p>
            )}
          </motion.div>
        ))}
      </motion.section>

      <motion.section variants={parent} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Verification Workflows</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verification.map((v, i) => (
            <motion.div key={v.title} variants={child} className="group rounded-lg bg-white p-5 shadow ring-1 ring-slate-200 transition hover:shadow-lg">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-action-green text-white text-xs font-bold">{i+1}</span>
                <h3 className="font-semibold text-forest-ink">{v.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{opacity:0,y:50}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">Roadmap</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[{t:"Phase 1",d:"Retail chain integration; POS + smart meter pilots."},{t:"Phase 2",d:"Energy industry expansion; HVAC and fleet integrations."},{t:"Phase 3",d:"End-to-end MRV platform, verification automation & marketplace."}].map((p) => (
            <div key={p.t} className="rounded-xl bg-white p-5 shadow ring-1 ring-slate-200">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-leaf" />
                <h3 className="font-semibold text-forest-ink">{p.t}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-700 break-words whitespace-normal">{p.d}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.main>
  );
}
