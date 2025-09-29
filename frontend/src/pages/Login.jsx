import React, { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      params.append("grant_type", "password");
      const { data } = await api.post("/auth/login", params, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
      localStorage.setItem("cw_token", data.access_token);
      toast.success("Logged in");
      window.location.replace("/admin/leads");
    } catch (err) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-sm px-6 py-24" data-testid="login-page">
      <h1 className="text-2xl font-bold text-forest-ink">Admin Login</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-slate-700" htmlFor="username">Username</label>
          <input id="username" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={username} onChange={(e)=>setUsername(e.target.value)} data-testid="login-username-input" />
        </div>
        <div>
          <label className="block text-sm text-slate-700" htmlFor="password">Password</label>
          <input id="password" type="password" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" value={password} onChange={(e)=>setPassword(e.target.value)} data-testid="login-password-input" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-action-green px-4 py-2 font-semibold text-white" data-testid="login-submit-button">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
