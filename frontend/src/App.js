import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getHello } from "@/lib/api";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Solution from "@/pages/Solution";
import HowItWorks from "@/pages/HowItWorks";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/index.css";

function App() {
  useEffect(() => {
    // Call a simple API to verify connectivity
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
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
