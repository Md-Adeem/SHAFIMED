import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const hospitals = [
  { 
    name: "Apollo Hospitals", 
    img: "/images/apollo-hospitals.png", // New photo
    location: "India",
    rating: "4.8",
    specialties: ["Cardiology", "Oncology", "Orthopedics"]
  },
  { 
    name: "Fortis Healthcare", 
    img: "/images/fortis-healthcare.png", // New photo
    location: "India",
    rating: "4.7",
    specialties: ["Neurology", "Gastroenterology", "Urology"]
  },
  { 
    name: "Medanta", 
    img: "/images/medanta.png", // New photo
    location: "India",
    rating: "4.9",
    specialties: ["Heart Surgery", "Transplants", "Cancer"]
  },
  { 
    name: "Max Healthcare", 
    img: "/images/max-healthcare.png", // New photo
    location: "India",
    rating: "4.6",
    specialties: ["Orthopedics", "Fertility", "Cosmetic"]
  },
  // Fallback cards without specific images
  {
    name: "Bumrungrad-Intl.",
    img: "/images/Bumrungrad-Intl.png", // Fallback will be used
    location: "Thailand",
    rating: "4.8",
    specialties: ["International Care", "Wellness", "Surgery"]
  },
  {
    name: "Anadolu Medical",
    img: "/images/Anadolu-Medical.png", // Fallback will be used
    location: "Turkey",
    rating: "4.9",
    specialties: ["Oncology", "Robotic Surgery", "IVF"]
  }
];

function HospitalsStrip() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Our <span className="text-teal-600">Partner Hospitals</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A carefully selected network of world-class hospitals with proven track records of excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl shadow-slate-200/70 hover:shadow-2xl hover:shadow-slate-300/80 hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              {hospital.img ? (
                <>
                  <div className="relative h-56">
                    <img 
                      src={hospital.img} 
                      alt={'Photo of ${hospital.name}'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                      <h3 className="font-heading text-2xl font-bold">{hospital.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-slate-200 mt-1">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span>{hospital.location}</span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      <FaStar />
                      <span>{hospital.rating}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-grow flex flex-col">
                    <div className="mb-6">
                      <div className="text-xs text-slate-500 mb-2 font-semibold">TOP SPECIALTIES:</div>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty) => (
                          <span 
                            key={specialty}
                            className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-auto">
                      View Hospital Details
                    </button>
                  </div>
                </>
              ) : (
                // Fallback card design for hospitals without a specific photo
                <div className="p-6 flex-grow flex flex-col bg-teal-600 text-white rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-heading text-2xl font-bold">{hospital.name}</h3>
                        <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                            <FaStar />
                            <span>{hospital.rating}</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-teal-100 mb-6">
                        <FaMapMarkerAlt className="w-3 h-3" />
                        <span>{hospital.location}</span>
                    </div>
                    <div className="mb-6">
                        <div className="text-xs text-teal-200 mb-2 font-semibold">TOP SPECIALTIES:</div>
                        <div className="flex flex-wrap gap-2">
                            {hospital.specialties.map((specialty) => (
                                <span key={specialty} className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                                    {specialty}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className="w-full bg-white hover:bg-slate-200 text-teal-600 font-bold py-3 px-4 rounded-lg transition-colors mt-auto">
                        View Hospital Details
                    </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HospitalsStrip;