import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getHello } from "@/lib/api";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/index.css";

const Home = lazy(() => import("@/pages/Home"));
const WhoWeAre = lazy(() => import("@/pages/WhoWeAre"));
const Solution = lazy(() => import("@/pages/Solution"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const AdminLeads = lazy(() => import("@/pages/AdminLeads"));
const Login = lazy(() => import("@/pages/Login"));

function App() {
  useEffect(() => {
    getHello().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <NavBar />
        <main className="flex-1 pt-20">
          <Suspense fallback={<p className="px-6 py-10">Loading...</p>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/who-we-are" element={<WhoWeAre />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/leads" element={<ProtectedRoute><AdminLeads /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BottomBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
