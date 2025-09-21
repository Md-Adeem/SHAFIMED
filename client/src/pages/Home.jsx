// src/pages/Home.jsx
import React from "react";

// Import all landing page components
import Hero from "../components/landing/Hero";
import SpecialtiesGrid from "../components/landing/SpecialtiesGrid";
import ServicesGrid from "../components/landing/ServicesGrid";
import HospitalsStrip from "../components/landing/HospitalsStrip";
import Steps from "../components/landing/Steps";
import Treatments from "../components/landing/Treatments";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import MultiSpecialtyFocus from "../components/landing/MultiSpecialtyFocus";
import LowestQuotes from "../components/landing/LowestQuotes";
import Services from "../components/landing/Services";
import CaseStudies from "../components/landing/CaseStudies";
import NewsSection from "../components/landing/NewsSection";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* 1. HeroSection */}
      <Hero />
      
      {/* Search Bar - Overlaps Hero */}
      {/* <SearchBar /> */}
      <SpecialtiesGrid />
      {/* Hospital Partners Strip */}
      {/* 2. MultiSpecialtyFocus */}
      <MultiSpecialtyFocus />
      
      {/* 3. TopHospitals */}
      <HospitalsStrip />
      
      {/* 4. LowestQuotes */}
      <LowestQuotes />
      
      {/* 5. HowItWorks */}
      <Steps />
      
      {/* 6. Services */}
      <Services />
      
      <ServicesGrid />

      {/* Patient Testimonials */}
      {/* 7. PatientTestimonials */}
      <Testimonials />
      
      {/* 8. CaseStudies */}
      <CaseStudies />
      
      {/* 9. NewsSection */}
      <NewsSection />
      
      {/* 10. FAQSection */}
      <FAQSection />
      
      {/* 11. Footer */}
      <Footer />
    </main>
  );
};

export default Home;
