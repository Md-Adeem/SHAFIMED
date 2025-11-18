import { FaGlobe } from "react-icons/fa";
import Footer from "../components/landing/Footer";
import FloatingEnquiryButton from "../components/ui/FloatingEnquiryButton";

export default function About() {
  return (
    <>
      <section className="bg-gradient-to-b from-white via-teal-50 to-emerald-50 m-10 text-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 relative">
          {/* About Intro */}
          <div className="text-center mb-16">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ℹ️ About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-teal-600">ShaafiMed</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ShaafiMed is an international healthcare facilitation platform that
              connects
              <span className="font-semibold text-gray-800">
                {" "}
                global patients with trusted Indian doctors
              </span>
              . We provide complete support — from booking medical consultations to
              post-surgery recovery — making healthcare accessible, transparent, and
              human-centered.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To make India the world's most trusted medical destination by bridging
                the gap between international patients and world-class Indian doctors.
                We envision a healthcare experience that is effortless, affordable,
                and compassionate — no matter where our patients come from.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to simplify medical travel by providing end-to-end
                support for international patients — from consultation, visa
                assistance, hospital coordination, and translation, to recovery and
                post-treatment care. We aim to make every patient feel at home, in
                India and beyond.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="text-center mb-20">
            <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎁 What We Offer
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              What <span className="text-teal-600">We Offer</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Our comprehensive patient care services ensure a smooth, stress-free
              experience — before, during, and after treatment.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {[
                {
                  icon: "🏨",
                  title: "Connect with Top International Hospitals",
                  desc: "Access a curated network of accredited Indian hospitals and global medical specialists.",
                },
                {
                  icon: "💼",
                  title: "Free 5-Day Hotel Stay Post-Surgery",
                  desc: "Relax and recover comfortably after surgery with complimentary accommodation.",
                },
                {
                  icon: "🚖",
                  title: "Complimentary Airport Pickup & Drop",
                  desc: "Enjoy hassle-free transfers from the airport to your hospital or hotel.",
                },
                {
                  icon: "📞",
                  title: "Local SIM Card on Arrival",
                  desc: "Stay connected with family and friends from day one of your medical journey.",
                },
                {
                  icon: "🗣️",
                  title: "24/7 Interpreter & Medical Support",
                  desc: "Our multilingual support team assists you throughout your stay in India.",
                },
                {
                  icon: "🧾",
                  title: "Visa & Documentation Assistance",
                  desc: "We help you with visa processing, medical letters, and hospital coordination.",
                },
              ].map((offer, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg rounded-2xl p-6 border border-teal-100 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="text-3xl mb-3">{offer.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {offer.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{offer.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-20">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              💎 Our Core Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Our <span className="text-teal-600">Core Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              These values define how we build, communicate, and care for every
              patient we serve.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Compassion",
                  desc: "We believe healthcare begins with empathy — every patient deserves care and comfort.",
                },
                {
                  title: "Transparency",
                  desc: "No hidden costs or confusion. We maintain clarity in pricing, process, and communication.",
                },
                {
                  title: "Excellence",
                  desc: "Partnering only with verified, world-class hospitals and specialists across India.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg rounded-2xl p-8 border border-teal-100 transition-all duration-300 hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-teal-600 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full px-8 py-4 border border-teal-200">
              <FaGlobe className="text-teal-600 text-xl" />
              <p className="text-gray-800 font-medium text-lg">
                Empowering global healthcare access — from India to the world 🌍
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingEnquiryButton />
    </>
  );
}