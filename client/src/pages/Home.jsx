// src/pages/Home.jsx
import React from "react";

// Import all landing page components
import Hero from "../components/landing/Hero"; // HeroSection
import MultiSpecialtyFocus from "../components/landing/MultiSpecialtyFocus";
import HospitalsStrip from "../components/landing/HospitalsStrip"; // TopHospitals
import LowestQuotes from "../components/landing/LowestQuotes";
import Steps from "../components/landing/Steps"; // HowItWorks
import Services from "../components/landing/Services";
import Testimonials from "../components/landing/Testimonials"; // PatientTestimonials
import CaseStudies from "../components/landing/CaseStudies";
import NewsSection from "../components/landing/NewsSection";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* 1. HeroSection */}
      <Hero />
      
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
