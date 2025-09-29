import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getHello } from "@/lib/api";
import Home from "@/pages/Home";
import WhoWeAre from "@/pages/WhoWeAre";
import Solution from "@/pages/Solution";
import HowItWorks from "@/pages/HowItWorks";
import FAQ from "@/pages/FAQ";
import AdminLeads from "@/pages/AdminLeads";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BottomBar from "@/components/BottomBar";
import "@/index.css";

function App() {
  useEffect(() => {
    getHello().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <NavBar />
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solution" element={<Solution />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/who-we-are" element={<WhoWeAre />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
          </Routes>
        </main>
        <Footer />
        <BottomBar />
      </BrowserRouter>
    </div>
  );
}

export default App;
