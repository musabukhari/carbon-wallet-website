import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/leads").then(({ data }) => setLeads(data)).finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-6 py-16" data-testid="admin-leads-page">
      <h1 className="text-3xl font-bold text-forest-ink">Leads (Internal Preview)</h1>
      <p className="mt-2 text-sm text-slate-600">This is a temporary view. Add auth before exposing.</p>
      <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow ring-1 ring-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {["Name","Email","Company","Phone","Country","Industry","Company Size","Team Size","Timeline","Source","Consent","Created"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td className="px-4 py-3" colSpan={12}>Loading...</td></tr>
            ) : leads.length === 0 ? (
              <tr><td className="px-4 py-3" colSpan={12}>No leads yet</td></tr>
            ) : (
              leads.map((l) => (
                <tr key={l.id} data-testid={`lead-row-${l.id}`}>
                  <td className="px-4 py-3">{l.name}</td>
                  <td className="px-4 py-3">{l.email}</td>
                  <td className="px-4 py-3">{l.company || "-"}</td>
                  <td className="px-4 py-3">{l.phone || "-"}</td>
                  <td className="px-4 py-3">{l.country || "-"}</td>
                  <td className="px-4 py-3">{l.industry || "-"}</td>
                  <td className="px-4 py-3">{l.company_size || "-"}</td>
                  <td className="px-4 py-3">{l.team_size || "-"}</td>
                  <td className="px-4 py-3">{l.timeline || "-"}</td>
                  <td className="px-4 py-3">{l.source || "-"}</td>
                  <td className="px-4 py-3">{l.consent ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{new Date(l.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
