import React, { useState } from "react";
import { createLead } from "@/lib/api";
import { toast } from "sonner";

const initial = { name: "", email: "", company: "", message: "", source: "early-access" };

export default function LeadForm({ compact = false }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createLead(form);
      toast.success("Thanks! We\'ll be in touch shortly.");
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
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Your name"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            data-testid="lead-form-name-input"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">Work Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="name@company.com"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            data-testid="lead-form-email-input"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-slate-700">Company</label>
          <input
            id="company"
            name="company"
            value={form.company}
            onChange={onChange}
            placeholder="Company Inc."
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            data-testid="lead-form-company-input"
          />
        </div>
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-slate-700">Source</label>
          <input
            id="source"
            name="source"
            value={form.source}
            onChange={onChange}
            placeholder="early-access, demo, contact"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
            data-testid="lead-form-source-input"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={onChange}
          rows={4}
          placeholder="Tell us about your goals"
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-green-600"
          data-testid="lead-form-message-textarea"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center rounded-lg bg-action-green px-5 py-3 font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 disabled:opacity-60"
        data-testid="lead-form-submit-button"
      >
        {loading ? "Submitting..." : "Request Early Access"}
      </button>
    </form>
  );
}
