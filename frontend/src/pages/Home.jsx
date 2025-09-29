import React from "react";
import LeadForm from "@/components/LeadForm";
import "@/App.css";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-hero-gradient text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl" data-testid="hero-title">
                Reward Climate Action. <span className="text-gradient">Automatically.</span>
              </h1>
              <p className="mt-5 max-w-xl text-slate-200 text-lg" data-testid="hero-subtitle">
                Carbon Wallet is the turnkey SaaS platform that empowers you to measure, verify, and reward the sustainable actions of your employees. Turn ambitious ESG goals into engaging, automated results.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="#get-started" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 font-semibold text-forest-ink shadow-sm hover:brightness-90" data-testid="hero-primary-cta">Request Beta Access</a>
                <a href="#get-started" className="inline-flex items-center justify-center rounded-lg ring-1 ring-white/50 px-5 py-3 font-semibold text-white hover:bg-white/10" data-testid="hero-secondary-cta">Book a Demo</a>
              </div>
            </div>
            <div className="lg:justify-self-end">
              <div className="bg-card rounded-2xl p-6 shadow-2xl ring-1 ring-white/50 max-w-md" data-testid="hero-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-leaf/20 flex items-center justify-center text-forest-ink font-bold">CW</div>
                    <div>
                      <p className="text-sm font-semibold text-forest-ink">Syed M.B.</p>
                      <p className="text-xs text-slate-500">My Dashboard</p>
                    </div>
                  </div>
                  <span className="text-slate-500">• • •</span>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-700 text-sm" data-testid="hero-card-notif">
                  TfL Journey Verified: <span className="font-bold">+15 Carbon Points</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg bg-mist p-3">
                    <p className="text-xs text-slate-600">Total CO₂ Saved</p>
                    <p className="mt-1 text-xl font-bold text-forest-ink">143.5 kg</p>
                  </div>
                  <div className="rounded-lg bg-mist p-3">
                    <p className="text-xs text-slate-600">Reward Points</p>
                    <p className="mt-1 text-xl font-bold text-leaf">1,280</p>
                  </div>
                </div>
                <div className="mt-4 border rounded-lg p-3 space-y-2">
                  <p className="font-semibold text-slate-800">Redeem Rewards</p>
                  <div className="flex items-center gap-3 rounded-md border bg-white p-2 shadow-sm">
                    <div className="h-14 w-14 rounded-md bg-mist" />
                    <div>
                      <p className="font-semibold text-sm text-forest-ink">Patagonia Cotton Socks</p>
                      <p className="text-xs text-slate-500">Sustainable Apparel</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-bold text-leaf">45</p>
                    </div>
                  </div>
                  <button className="w-full rounded-md bg-forest-ink px-3 py-2 text-white font-semibold" data-testid="hero-card-cta">View Marketplace</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold text-forest-ink text-center" data-testid="how-it-works-title">Four Steps to Automated Impact</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {["Securely Connect Data","Automatically Verify CO₂","Instantly Earn Points","Redeem Exclusive Rewards"].map((title, idx) => (
              <div key={title} className="relative rounded-lg border-t-4 border-leaf bg-white p-6 shadow" data-testid={`how-step-${idx+1}`}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-action-green text-white flex items-center justify-center font-bold">{idx+1}</div>
                <h3 className="mt-6 text-lg font-semibold text-forest-ink">{title}</h3>
                <p className="mt-2 text-slate-600 text-sm">
                  {idx===0 && "Employees link data sources like transit cards, utility meters, or EV chargers in seconds via secure, read-only integrations."}
                  {idx===1 && "Our AI-powered MRV engine calculates CO₂ savings using ISO-compliant methodologies. No self-reporting, no fraud."}
                  {idx===2 && "For every verified kilogram of CO₂ saved, users are instantly issued Carbon Points directly to their wallet."}
                  {idx===3 && "Employees spend points in our curated marketplace on sustainable brands, green services, or even planting a tree."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with lead form */}
      <section id="get-started" className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-forest-ink" data-testid="cta-title">Ready to Turn Your Climate Goals into Reality?</h2>
              <p className="mt-3 max-w-xl text-slate-700">Our beta program is live. Be among the first to launch a fully automated, rewards-based climate program for your team.</p>
            </div>
            <div className="lg:justify-self-end">
              <div className="rounded-2xl bg-white p-6 shadow ring-1 ring-slate-200" data-testid="lead-form-card">
                <LeadForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
