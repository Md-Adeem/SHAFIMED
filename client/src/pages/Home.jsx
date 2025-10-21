import React from "react";
import Hero from "../components/landing/Hero";
import SpecialtiesGrid from "../components/landing/SpecialtiesGrid";
import HospitalsStrip from "../components/landing/HospitalsStrip";
import Steps from "../components/landing/Steps";
import Testimonials from "../components/landing/Testimonials";
import MultiSpecialtyFocus from "../components/landing/MultiSpecialtyFocus";
import Services from "../components/landing/Services";
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

      {/* 4. <SearchBar /> */}
      <SpecialtiesGrid />

      {/* 5. HowItWorks */}
      <Steps />
      
      {/* 6. Services */}
      <Services />
      
      {/* 7. PatientTestimonials */}
      <Testimonials />
      
      {/* 8. FAQSection */}
      <FAQSection />
      
      {/* 9. Footer */}
      <Footer />
      
    </main>
  );
};

export default Home;
