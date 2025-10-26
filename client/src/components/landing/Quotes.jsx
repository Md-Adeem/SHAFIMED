import { useState } from "react";
import QuoteModal from "../ui/QuoteModal"; // make sure path is correct
import {
  GiKneeCap,
  GiFemale,
  GiHairStrands,
  GiBodyHeight,
} from "react-icons/gi";
import {
  FaUserMd,
  FaBrain,
  FaLungs,
  FaHeart,
  FaCut,
  FaStethoscope,
  FaSyringe,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const treatments = [
  { name: "Knee Replacement", price: "$4000", icon: <GiKneeCap size={32} /> },
  { name: "Hip Replacement", price: "$5500", icon: <FaUserMd size={32} /> },
  { name: "Brain Tumor", price: "$5000", icon: <FaBrain size={32} /> },
  { name: "Heart Bypass Surgery", price: "$4500", icon: <FaHeart size={32} /> },
  { name: "Valve Replacement", price: "$9500", icon: <FaSyringe size={32} /> },
  { name: "Breast Cancer", price: "$5000", icon: <FaStethoscope size={32} /> },
  { name: "Lung Cancer", price: "$5500", icon: <FaLungs size={32} /> },
  { name: "Rhinoplasty", price: "$1800", icon: <FaCut size={32} /> },
  { name: "Breast Implants", price: "$2750", icon: <FaStethoscope size={32} /> },
  { name: "Hair Transplant", price: "$1400", icon: <GiHairStrands size={32} /> },
  { name: "Cervical Cancer", price: "$4500", icon: <GiFemale size={32} /> },
  { name: "Hysterectomy", price: "$3000", icon: <GiBodyHeight size={32} /> },
];

const Quotes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  const handleOpenModal = (treatment) => {
    setSelectedTreatment(treatment || null); // optional parameter
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            Lowest Quotes <span className="text-teal-600">Assured</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We constantly negotiate better prices and alternatives without
            compromising treatment quality. Our prices are consistently lower.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {treatments.map((item, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm border border-teal-100 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="flex justify-center mb-4 text-teal-600 group-hover:text-teal-700 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center group-hover:text-teal-700 transition-colors">
                {item.name}
              </h3>
              <div className="mt-auto">
                <p className="text-gray-600 text-center mb-4">
                  Starting at{" "}
                  <span className="font-bold text-teal-700 text-lg">
                    {item.price}
                  </span>
                </p>
                <button
                  onClick={() => handleOpenModal(item.name)}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Get Free Quote
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => handleOpenModal()}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Free Quote
          </button>

          <button
            onClick={() => {
              const message = encodeURIComponent(
                `Hello Team ShaafiMed International,

I am interested in your medical services and would appreciate more information about the treatments and facilities you offer. Kindly provide the relevant details at your earliest convenience.

Thank you very much.`
              );
              window.open(`https://wa.me/919198986796?text=${message}`, "_blank");
            }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Chat with Expert
          </button>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        treatment={selectedTreatment}
      />
    </section>
  );
};

export default Quotes;
