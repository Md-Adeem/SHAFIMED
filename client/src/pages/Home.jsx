
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Hero from "../components/landing/Hero";
import MultiSpecialtyFocus from "../components/landing/MultiSpecialty Focus";
import HospitalsStrip from "../components/landing/HospitalsStrip";
import Steps from "../components/landing/Steps";
import Testimonials from "../components/landing/Testimonials";
import Quotes from "../components/landing/Quotes";
import Amenities from "../components/landing/Amenities";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";

const Home = () => {
  const location = useLocation(); // Move useLocation inside the component

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        // Smooth scroll to target section
        section.scrollIntoView({ behavior: "smooth" });

        //  Remove the state after scrolling (so it doesn't scroll again if refreshed)
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]); //  Run when location changes

  return (
    <main className="min-h-screen">
      {/* 1. HeroSection */}
      <section id="hero-section">
        <Hero />
      </section>

      {/* 2. Lowest Quotes */}
      <section id="lowest-quotes">
        <Quotes />
      </section>

      {/* 3. Top Hospitals Strip */}
      <section id="hospitals-strip">
        <HospitalsStrip />
      </section>

      {/* 4. MultiSpecialty Focus */}
      <section id="multi-specialty-focus">
        <MultiSpecialtyFocus />
      </section>

      {/* 5. HowItWorks */}
      <Steps />

      {/* 6. Amenities */}
      <section id="services">
        <Amenities />
      </section>

      {/* 7. Patient Testimonials */}
      <Testimonials />

      {/* 8. FAQ Section */}
      <FAQSection />

      {/* 9. Footer */}
      <Footer />
    </main>
  );
};

export default Home;
