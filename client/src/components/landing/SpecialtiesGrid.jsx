import React from 'react';
// Importing a variety of icons from different sets for the best match
import { FaHeartbeat, FaBone, FaBrain, FaBaby, FaFemale, FaLungs } from 'react-icons/fa';
import { GiStomach, GiKidneys, GiRibbon } from 'react-icons/gi';
import { IoSparkles } from "react-icons/io5";
import { FaWeightScale } from "react-icons/fa6";
import { BsPlusCircleFill } from "react-icons/bs";

const specialties = [
  { 
    name: "Oncology", 
    description: "Advanced cancer treatments with proven results.",
    icon: <GiRibbon className="w-10 h-10" />
  },
  { 
    name: "Neurosurgery", 
    description: "The specialty of neurosurgical care for adult and pediatric patients.",
    icon: <FaBrain className="w-10 h-10" />
  },
  { 
    name: "Spine Surgery", 
    description: "Precision spine surgeries for better mobility.",
    icon: <FaBone className="w-10 h-10" /> // Using a generic bone icon as a placeholder
  },
  { 
    name: "Cardiology", 
    description: "World-class heart care for adults and children.",
    icon: <FaHeartbeat className="w-10 h-10" />
  },
  { 
    name: "Orthopedics", 
    description: "Expert joint replacements and bone deformities solutions.",
    icon: <FaBone className="w-10 h-10" />
  },
  { 
    name: "IVF", 
    description: "Leading fertility treatments with high success.",
    icon: <FaBaby className="w-10 h-10" />
  },
  { 
    name: "Gynecology", 
    description: "Specialized women's health services.",
    icon: <FaFemale className="w-10 h-10" />
  },
  { 
    name: "Cosmetic", 
    description: "Aesthetic procedures for a new you.",
    icon: <IoSparkles className="w-10 h-10" />
  },
  { 
    name: "Weight Loss", 
    description: "Effective bariatric surgery options.",
    icon: <FaWeightScale className="w-10 h-10" />
  },
  { 
    name: "Liver Transplant", 
    description: "Liver transplant procedures of varying complexity.",
    icon: <GiStomach className="w-10 h-10" /> // Using a related organ as a placeholder
  },
  { 
    name: "Kidney Transplant", 
    description: "Expert renal care and transplants.",
    icon: <GiKidneys className="w-10 h-10" />
  },
  { 
    name: "Bone Marrow", 
    description: "Bone marrow transplant options for matched and non-matched donors.",
    icon: <FaBone className="w-10 h-10" />
  }
];

const SpecialtiesGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🏥 Medical Specialties
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            Multi-Specialty <span className="text-teal-600">Focus</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We cover all medical needs, from hair transplants to heart transplants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <div 
              key={specialty.name}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-100 p-6 flex items-center space-x-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                {specialty.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors">
                  {specialty.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {specialty.description}
                </p>
              </div>
              <div className="text-teal-400 group-hover:text-teal-600 transition-colors opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0">
                <BsPlusCircleFill className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesGrid;