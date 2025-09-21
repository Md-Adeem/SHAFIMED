// src/pages/Home.jsx
import React from "react";

// Import all landing page components
import Hero from "../components/landing/Hero";
import SpecialtiesGrid from "../components/landing/SpecialtiesGrid";
import ServicesGrid from "../components/landing/ServicesGrid";
// import SearchBar from "../components/landing/SearchBar_new";
import HospitalsStrip from "../components/landing/HospitalsStrip";
import Steps from "../components/landing/Steps";
import Treatments from "../components/landing/Treatments";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />
      
      {/* Search Bar - Overlaps Hero */}
      {/* <SearchBar /> */}
      <SpecialtiesGrid />
      {/* Hospital Partners Strip */}
      <HospitalsStrip />
      
      {/* How It Works Steps */}
      <Steps />
      
      {/* Popular Treatments */}
      <Treatments />
      
      <ServicesGrid />

      {/* Patient Testimonials */}
      <Testimonials />
      
      {/* Call to Action */}
      <CTA />
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Home;
