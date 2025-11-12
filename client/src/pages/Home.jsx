import React from "react";
import Hero from "../components/landing/Hero";
import MultiSpecialtyFocus from "../components/landing/MultiSpecialty Focus";
import HospitalsStrip from "../components/landing/HospitalsStrip";
import Steps from "../components/landing/Steps";
import Testimonials from "../components/landing/Testimonials";
import Quotes from "../components/landing/Quotes";
import Amenities from "../components/landing/Amenities";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";
import FloatingEnquiryButton from "../components/ui/FloatingEnquiryButton";

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* 1. HeroSection */}
      <section id="hero-section">
      <Hero />
      </section>

      {/* 2.Lowest Quotes */}
      <section id="lowest-quotes">
        <Quotes/>
      </section>

      {/* 3. Top Hospitals Strip */}
      <section id="hospitals-strip">
        <HospitalsStrip />
      </section>

      {/* 4.MultiSpecialty Focus */}
      <section id="multi-specialty-focus">  
      <MultiSpecialtyFocus />
      </section>

      {/* 5. HowItWorks */}
      <Steps />

      {/* 6. Amenities */}
      <section id="services">
      <Amenities />
      </section>


      {/* 7. PatientTestimonials */}
      <Testimonials />

      {/* 8. FAQSection */}
      <FAQSection />

      {/* 9. Footer */}
      <Footer />
      
      {/* Floating Enquiry and WhatsApp Buttons */}
      <FloatingEnquiryButton />
    </main>
  );
};

export default Home;