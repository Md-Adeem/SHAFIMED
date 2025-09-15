const hospitals = [
  { 
    name: "Apollo Hospitals", 
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/7/77/Apollo_Hospitals_Logo.svg/512px-Apollo_Hospitals_Logo.svg.png",
    location: "India",
    rating: "4.8",
    specialties: ["Cardiology", "Oncology", "Orthopedics"]
  },
  { 
    name: "Fortis Healthcare", 
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Fortis_Healthcare_logo.svg/512px-Fortis_Healthcare_logo.svg.png",
    location: "India",
    rating: "4.7",
    specialties: ["Neurology", "Gastroenterology", "Urology"]
  },
  { 
    name: "Medanta", 
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Medanta_logo.svg/512px-Medanta_logo.svg.png",
    location: "India",
    rating: "4.9",
    specialties: ["Heart Surgery", "Transplants", "Cancer"]
  },
  { 
    name: "Max Healthcare", 
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Max_Healthcare_Logo.svg/512px-Max_Healthcare_Logo.svg.png",
    location: "India",
    rating: "4.6",
    specialties: ["Orthopedics", "Fertility", "Cosmetic"]
  },
  {
    name: "Bumrungrad International",
    img: "", // Will use fallback
    location: "Thailand",
    rating: "4.8",
    specialties: ["International Care", "Wellness", "Surgery"]
  },
  {
    name: "Anadolu Medical Center",
    img: "", // Will use fallback
    location: "Turkey",
    rating: "4.9",
    specialties: ["Oncology", "Robotic Surgery", "IVF"]
  }
];

function HospitalsStrip() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Partner Hospitals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Carefully selected network of world-class hospitals with proven track records
          </p>
        </div>

        {/* Hospitals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hospitals.map((hospital) => (
            <div key={hospital.name} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden group">
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
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{hospital.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-gray-900">{hospital.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Specialties:</div>
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
                  View Hospital Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">45+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">25,000+</div>
              <div className="text-sm text-gray-600">Successful Cases</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HospitalsStrip;

