import React from 'react';
// Importing icons from Font Awesome
import { FaFileMedicalAlt, FaUserMd, FaPassport, FaMoneyBillWave, FaLanguage, FaAmbulance, FaHotel, FaClipboardList, FaUserNurse, FaWhatsapp } from 'react-icons/fa';

const services = [
  {
    name: "Medical Opinion and Cost Estimations",
    description: "Expert opinions and cost estimates.",
    icon: <FaFileMedicalAlt className="w-8 h-8" />
  },
  {
    name: "Pre-Travel Consultations",
    description: "Understand your procedure before travelling.",
    icon: <FaUserMd className="w-8 h-8" />
  },
  {
    name: "Visa Assistance",
    description: "Complete medical visa assistance.",
    icon: <FaPassport className="w-8 h-8" />
  },
  {
    name: "Money Exchange",
    description: "Convenient currency exchange services.",
    icon: <FaMoneyBillWave className="w-8 h-8" />
  },
  {
    name: "Interpreters and Translators",
    description: "Fluent professionals to break language barriers.",
    icon: <FaLanguage className="w-8 h-8" />
  },
  {
    name: "Transportation Assistance",
    description: "Complimentary airport transfers.",
    icon: <FaAmbulance className="w-8 h-8" />
  },
  {
    name: "Accommodation Options",
    description: "Near the hospital and matching your needs.",
    icon: <FaHotel className="w-8 h-8" />
  },
  {
    name: "Admission, Appointment, Pharma Care",
    description: "Full coordination of medical logistics.",
    icon: <FaClipboardList className="w-8 h-8" />
  },
  {
    name: "Private Duty Nursing",
    description: "Arrangements of private nursing care as needed.",
    icon: <FaUserNurse className="w-8 h-8" />
  }
];

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Our Services Cover <span className="text-teal-600">Every Need</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            You will be assisted by a dedicated case manager from our team. List of services you can expect from us, for FREE!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.name}
              className="bg-slate-50/70 rounded-xl p-6 flex items-center space-x-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/80 hover:-translate-y-2"
            >
              <div className="flex-shrink-0 text-teal-500">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-green-500/30 flex items-center justify-center mx-auto transition-all duration-300 hover:scale-105">
                <FaWhatsapp className="w-6 h-6 mr-3" />
                Chat With Us
            </button>
            <p className="text-sm text-slate-500 mt-4 max-w-md mx-auto">
                Our services are <strong>FREE</strong> and by using our services your hospital bill does not increase!
            </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;