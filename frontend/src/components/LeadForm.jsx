import React, { useState } from "react";
import { createLead } from "@/lib/api";
import { toast } from "sonner";

const initial = {
  name: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  industry: "",
  company_size: "",
  team_size: "",
  timeline: "",
  interests: [],
  message: "",
  source: "early-access",
  consent: true,
};

export default function LeadForm({ compact = false }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...form, interests: form.interests?.filter(Boolean) };
      await createLead(payload);
      toast.success("Thanks! We'll be in touch shortly.");
      setForm(initial);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${compact ? "" : "max-w-xl"}`} data-testid="lead-form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
          <input id="name" name="name" value={form.name} onChange={onChange} required placeholder="Your name" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600" data-testid="lead-form-name-input" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Work Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={onChange} required placeholder="name@company.com" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600" data-testid="lead-form-email-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700">Company</label>
          <input id="company" name="company" value={form.company} onChange={onChange} placeholder="Company Inc." className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-company-input" />
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-slate-700">Industry</label>
          <input id="industry" name="industry" value={form.industry} onChange={onChange} placeholder="Retail, Tech, Energy..." className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-industry-input" />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-slate-700">Country</label>
          <input id="country" name="country" value={form.country} onChange={onChange} placeholder="UK, US, ..." className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-country-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="+44..." className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-phone-input" />
        </div>
        <div>
          <label htmlFor="company_size" className="block text-sm font-medium text-slate-700">Company Size</label>
          <select id="company_size" name="company_size" value={form.company_size} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-company-size-select">
            <option value="">Select</option>
            <option>1-50</option>
            <option>51-200</option>
            <option>201-1000</option>
            <option>1001-5000</option>
            <option>5000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="team_size" className="block text-sm font-medium text-slate-700">Program Team Size</label>
          <select id="team_size" name="team_size" value={form.team_size} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-team-size-select">
            <option value="">Select</option>
            <option>1</option>
            <option>2-5</option>
            <option>6-10</option>
            <option>10+</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-slate-700">Timeline</label>
          <select id="timeline" name="timeline" value={form.timeline} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-timeline-select">
            <option value="">Select</option>
            <option>ASAP</option>
            <option>1-3 months</option>
            <option>3-6 months</option>
            <option>6+ months</option>
          </select>
        </div>
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-slate-700">Source</label>
          <input id="source" name="source" value={form.source} onChange={onChange} placeholder="early-access, demo, event" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2" data-testid="lead-form-source-input" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
        <textarea id="message" name="message" value={form.message} onChange={onChange} rows={4} placeholder="Tell us about your goals" className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600" data-testid="lead-form-message-textarea" />
      </div>

      <div className="flex items-center gap-2">
        <input id="consent" name="consent" type="checkbox" checked={!!form.consent} onChange={onChange} className="h-4 w-4 rounded border-slate-300 text-action-green focus:ring-action-green" data-testid="lead-form-consent-checkbox" />
        <label htmlFor="consent" className="text-sm text-slate-700">I agree to be contacted and accept the Privacy Policy.</label>
      </div>

      <button type="submit" disabled={loading} className="inline-flex items-center justify-center rounded-lg bg-action-green px-5 py-3 font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 disabled:opacity-60" data-testid="lead-form-submit-button">
        {loading ? "Submitting..." : "Request Early Access"}
      </button>
    </form>
  );
}
