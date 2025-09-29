import React from "react";
import { motion } from "framer-motion";
import useReveal from "@/hooks/useReveal";
import Tabs from "@/components/Tabs";

function PipelineDiagram() {
  const nodes = ["Data", "MRV", "Verify", "Rewards"];
  return (
    <motion.svg
      viewBox="0 0 560 120"
      className="w-full h-28"
      aria-hidden
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.3,
          },
        },
      }}
    >
      {nodes.map((n, i) => (
        <motion.g
          key={n}
          transform={`translate(${40 + i * 140}, 35)`}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <rect width="100" height="50" rx="12" fill="#1E7A4F" />
          <text
            x="50"
            y="28"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#fff"
          >
            {n}
          </text>
          {i < nodes.length - 1 && (
            <motion.g
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: i * 0.3 + 0.5 }}
            >
              <path d={`M100,25 L120,25`} stroke="#2FBF71" strokeWidth="3" />
              <polygon points="120,20 130,25 120,30" fill="#2FBF71" />
            </motion.g>
          )}
        </motion.g>
      ))}
    </motion.svg>
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
    <div
      className="grid grid-cols-4 gap-3"
      aria-label="integration-categories"
    >
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          className="flex items-center gap-2"
          data-testid={`logo-${it.label}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden>
            <circle
              cx="16"
              cy="16"
              r="14"
              fill={i % 2 ? "#2FBF71" : "#0E7480"}
            />
            <text
              x="16"
              y="20"
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#fff"
            >
              {it.initial}
            </text>
          </svg>
          <span className="text-sm text-slate-700">{it.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function RoadmapTimeline() {
  const phases = [
    {
      title: "Phase 1",
      desc: "Retail chain integration; POS + smart meter pilots.",
    },
    {
      title: "Phase 2",
      desc: "Energy industry expansion; HVAC and fleet integrations.",
    },
    {
      title: "Phase 3",
      desc: "End-to-end MRV platform, verification automation & marketplace.",
    },
  ];
  return (
    <motion.svg
      viewBox="0 0 700 160"
      className="w-full h-40"
      aria-hidden
      initial="hidden"
      animate="visible"
    >
      <motion.line
        x1="40"
        y1="80"
        x2="660"
        y2="80"
        stroke="#2FBF71"
        strokeWidth="4"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1 },
        }}
        transition={{ duration: 1 }}
      />
      {phases.map((p, i) => (
        <motion.g
          key={p.title}
          transform={`translate(${60 + i * 280}, 40)`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 + 0.5 }}
        >
          <circle cx="0" cy="40" r="10" fill="#1E7A4F" />
          <rect
            x="20"
            y="10"
            width="200"
            height="60"
            rx="10"
            fill="#F4F7F6"
            stroke="#1E7A4F"
          />
          <text x="30" y="35" fontSize="12" fontWeight="700" fill="#0B3B2E">
            {p.title}
          </text>
          <text x="30" y="55" fontSize="11" fill="#1F2937">
            {p.desc}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  );
}

export default function Solution() {
  useReveal();
  const pillars = [
    {
      id: "ingestion",
      label: "Data Ingestion",
      content: (
        <PillarCard
          title="Automated Data Ingestion"
          desc="Secure, read-only integrations to utilities, transport, HVAC, fleet telematics, and POS systems."
          details="Data normalization and unit harmonization ensure consistent, comparable metrics across sources."
          visual={<CategoryLogos />}
        />
      ),
    },
    {
      id: "mrv",
      label: "MRV Engine",
      content: (
        <PillarCard
          title="Real-time MRV Engine"
          desc="Continuous verification with cross-source validation, anomaly detection, and ISO 14064-2 alignment."
          details="Rule engines map activities to methodologies; anomalies trigger revalidation or user prompts."
          visual={<PipelineDiagram />}
        />
      ),
    },
    {
      id: "compliance",
      label: "Compliance",
      content: (
        <PillarCard
          title="Compliance & Auditability"
          desc="Automated audit trails, standards mapping (GHG Protocol), and verification partner integrations."
          details="Export audit-ready evidence bundles with data lineage and checkpoint hashes."
          visual={
            <div className="text-xs text-slate-600">
              Badges: ISO, GHG Protocol
            </div>
          }
        />
      ),
    },
    {
      id: "rewards",
      label: "Rewards",
      content: (
        <PillarCard
          title="Reward Orchestration"
          desc="Translate verified savings into Carbon Points with dynamic pricing signals and marketplace redemption."
          details="Dynamic multipliers reflect grid intensity and program priorities; APIs enable partner rewards."
          visual={
            <div className="h-10 w-full rounded bg-mist grid place-items-center text-xs">
              Marketplace Card
            </div>
          }
        />
      ),
    },
  ];

  const verification = [
    "Third-party verification via API (e.g., SustainCERT, Bureau Veritas)",
    "Multi-source cross-checks: smart meter vs utility bill vs POS",
    "Statistical anomaly detection and fraud prevention",
    "Automated compliance rule engine",
  ];

  return (
    <main
      className="mx-auto max-w-7xl px-6 py-16 reveal"
      data-testid="solution-page"
    >
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold text-forest-ink">
          The Rewards Platform for Climate Action
        </h1>
        <p className="mt-3 text-slate-700">
          Built on a production-ready MRV architecture to measure real
          behavior, verify real carbon, and reward real value—without
          self-reporting.
        </p>
      </header>

      <section className="mt-10">
        <Tabs items={pillars} />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-forest-ink">
          Verification Workflows
        </h2>
        <ul className="mt-3 list-disc pl-6 text-slate-700 text-sm">
          {verification.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12 reveal">
        <h2 className="text-xl font-semibold text-forest-ink">Roadmap</h2>
        <div className="mt-3 rounded-xl bg-white p-4 shadow ring-1 ring-slate-200">
          <RoadmapTimeline />
        </div>
      </section>
    </main>
  );
}

const PillarCard = ({ title, desc, details, visual }) => (
  <div
    className="rounded-lg bg-white p-6 shadow ring-1 ring-slate-200"
    data-testid={`pillar-${title}`}
  >
    <h3 className="font-semibold text-forest-ink">{title}</h3>
    <p className="mt-2 text-slate-600 text-sm">{desc}</p>
    <div className="mt-4">{visual}</div>
    <p className="mt-4 text-sm text-slate-700">{details}</p>
  </div>
);
