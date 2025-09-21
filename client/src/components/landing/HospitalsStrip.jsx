import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
=======
import { useTranslation } from 'react-i18next';

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
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Apollo_Hospitals_Logo.svg/512px-Apollo_Hospitals_Logo.svg.png",
    location: "Chennai, India",
    rating: "4.7",
    specialties: ["Cardiac Surgery", "Oncology", "Transplants"],
    accreditation: "JCI, NABH",
    established: "1983",
    beds: "550+",
    featured: true
  },
  { 
    name: "Fortis Healthcare", 
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Fortis_Healthcare_logo.svg/512px-Fortis_Healthcare_logo.svg.png",
    location: "Gurugram, India",
    rating: "4.6",
    specialties: ["Neurology", "Gastroenterology", "Nephrology"],
    accreditation: "JCI, NABL",
    established: "2001",
    beds: "400+"
  },
  { 
    name: "Medanta", 
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Medanta_logo.svg/512px-Medanta_logo.svg.png",
    location: "Gurugram, India",
    rating: "4.8",
    specialties: ["Heart Surgery", "Liver Transplant", "Cancer Care"],
    accreditation: "JCI, NABH",
    established: "2009",
    beds: "1250+"
  },
  { 
    name: "Bumrungrad International", 
    img: "",
    location: "Bangkok, Thailand",
    rating: "4.5",
    specialties: ["International Care", "Health Checkups", "Cosmetic Surgery"],
    accreditation: "JCI, ISO",
    established: "1980",
    beds: "580+"
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
    name: "Anadolu Medical Center",
    img: "",
    location: "Istanbul, Turkey",
    rating: "4.6",
    specialties: ["Oncology", "Robotic Surgery", "IVF Treatment"],
    accreditation: "JCI, ISO",
    established: "2005",
    beds: "254+"
  },
  {
    name: "National University Hospital",
    img: "",
    location: "Singapore",
    rating: "4.4",
    specialties: ["Neurosurgery", "Organ Transplant", "Pediatrics"],
    accreditation: "JCI, MOH",
    established: "1985",
    beds: "1200+"
  }
];

function HospitalsStrip() {
  const { t } = useTranslation();
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Our <span className="text-teal-600">Partner Hospitals</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A carefully selected network of world-class hospitals with proven track records of excellence.
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('hospitals.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('hospitals.subtitle')}
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
                      alt={`Photo of ${hospital.name}`}
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
            <div key={hospital.name} className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group ${hospital.featured ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
              {hospital.featured && (
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-2 text-sm font-medium">
                  🏆 Featured Partner
                </div>
              )}
              
              {/* Hospital Logo & Info */}
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    {hospital.img ? (
                      <img 
                        src={hospital.img} 
                        alt={hospital.name} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg ${hospital.img ? 'hidden' : 'flex'}`}
                      style={{ display: hospital.img ? 'none' : 'flex' }}
                    >
                      {hospital.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {hospital.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{hospital.location}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Est. {hospital.established} • {hospital.beds} beds
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
                    <div className="text-xs text-gray-500 mt-1">{hospital.accreditation}</div>
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

                
                {/* Specialties */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">{t('medical.specializations')}:</div>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Action Footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                  {t('hospitals.viewProfile')} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">350+</div>
              <div className="text-sm text-gray-600">{t('searchBar.partnerHospitals')}</div>
              <div className="text-xs text-gray-400 mt-1">JCI Accredited</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">28+</div>
              <div className="text-sm text-gray-600">{t('searchBar.countries')}</div>
              <div className="text-xs text-gray-400 mt-1">Active Partnerships</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">18,500+</div>
              <div className="text-sm text-gray-600">Successful Cases</div>
              <div className="text-xs text-gray-400 mt-1">Last 24 Months</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
              <div className="text-xs text-gray-400 mt-1">Verified Outcomes</div>
            </div>
          </div>
          
          {/* Additional Trust Elements */}
          <div className="border-t border-gray-100 mt-8 pt-6">
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>24/7 Medical Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Insurance Pre-approval</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Second Opinion Services</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>Travel Coordination</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HospitalsStrip;