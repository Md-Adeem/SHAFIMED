import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import hospitals from "../data/hospitals";
import Footer from "../components/landing/Footer";
import FloatingEnquiryButton from "../components/ui/FloatingEnquiryButton";

const Hospitals = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 pt-24 pb-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header without Back Button */}
          <div className="mb-10">
            <div className="text-center">
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🏥 Our Hospital Network
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-teal-600">Hospital Network</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our extensive network of world-class hospitals and
                medical facilities across India, all carefully selected for their
                excellence in patient care and medical expertise.
              </p>
            </div>
          </div>

          {/* Hospital Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 text-center border border-teal-100 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                {hospitals.length}
              </div>
              <div className="text-gray-600">Hospitals Network</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 text-center border border-teal-100 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                {hospitals
                  .reduce(
                    (total, hospital) => total + (parseInt(hospital.beds) || 0),
                    0
                  )
                  .toLocaleString()}
              </div>
              <div className="text-gray-600">Total Beds</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-6 text-center border border-teal-100 hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
                {new Set(hospitals.flatMap((h) => h.specialties)).size}
              </div>
              <div className="text-gray-600">Specialties</div>
            </div>
          </div>

          {/* Hospitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hospitals.map((hospital, index) => (
              <div
                key={index}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-teal-100 hover:shadow-2xl transition-all duration-300 flex flex-col hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-56">
                  <img
                    src={hospital.img}
                    alt={`Photo of ${hospital.name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <h3 className="font-heading text-xl font-bold group-hover:text-teal-300 transition-colors">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-slate-200 mt-1">
                      <FaMapMarkerAlt className="w-3 h-3" />
                      <span>{hospital.location}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    <FaStar />
                    <span>{hospital.rating}</span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-4 text-sm text-gray-600">
                    <p>
                      <strong className="text-gray-900">Beds:</strong>{" "}
                      {hospital.beds}
                    </p>
                    <p>
                      <strong className="text-gray-900">Established:</strong>{" "}
                      {hospital.established}
                    </p>
                    <p>
                      <strong className="text-gray-900">Accreditations:</strong>{" "}
                      {hospital.accreditations.length
                        ? hospital.accreditations.join(", ")
                        : "N/A"}
                    </p>
                  </div>
                  <div className="mb-4 text-sm text-gray-700 flex-grow">
                    <p>{hospital.description}</p>
                  </div>
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 mb-2 font-semibold">
                      TOP SPECIALTIES:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-100"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Choosing a Hospital?
            </h2>
            <p className="text-teal-100 text-lg mb-6 max-w-2xl mx-auto">
              Our medical coordinators are here to help you find the perfect
              hospital for your treatment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-teal-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-colors hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Contact Our Team
              </Link>
              <Link
                to="/quote"
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingEnquiryButton />
    </>
  );
};

export default Hospitals;