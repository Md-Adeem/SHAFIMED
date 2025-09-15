import { useState } from "react";

const treatments = [
  { 
    title: "Knee Replacement", 
    img: "https://images.unsplash.com/photo-1632059362301-4f27a0d8b60e?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$3,500",
    duration: "2-3 weeks",
    successRate: "98%",
    description: "Advanced knee replacement surgery with minimal downtime",
    countries: ["India", "Turkey", "Thailand"]
  },
  { 
    title: "Heart Surgery", 
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$8,500",
    duration: "1-2 weeks",
    successRate: "97%",
    description: "World-class cardiac procedures with experienced surgeons",
    countries: ["India", "Germany", "Singapore"]
  },
  { 
    title: "Liver Transplant", 
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031b?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$25,000",
    duration: "4-6 weeks",
    successRate: "95%",
    description: "Life-saving liver transplant procedures",
    countries: ["India", "Turkey", "Germany"]
  },
  { 
    title: "IVF Treatment", 
    img: "https://images.unsplash.com/photo-1623341214825-9f50d0aa02ba?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$2,500",
    duration: "2-3 weeks",
    successRate: "65%",
    description: "Advanced fertility treatments with personalized care",
    countries: ["India", "Cyprus", "Czech Republic"]
  },
  { 
    title: "Spine Surgery", 
    img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$12,000",
    duration: "3-4 weeks",
    successRate: "96%",
    description: "Minimally invasive spine surgery techniques",
    countries: ["India", "Turkey", "Germany"]
  },
  { 
    title: "Cosmetic Surgery", 
    img: "https://images.unsplash.com/photo-1606813907291-fad639c661be?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$4,500",
    duration: "1-2 weeks",
    successRate: "99%",
    description: "Aesthetic procedures with natural-looking results",
    countries: ["Turkey", "South Korea", "Brazil"]
  },
];

function Treatments() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Treatments" },
    { id: "cardiac", name: "Cardiac" },
    { id: "orthopedic", name: "Orthopedic" },
    { id: "oncology", name: "Oncology" },
    { id: "fertility", name: "Fertility" },
    { id: "cosmetic", name: "Cosmetic" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="text-blue-600">Medical Treatments</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our most sought-after medical procedures performed by world-renowned specialists
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {treatments.map((treatment) => (
            <div
              key={treatment.title}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={treatment.img} 
                  alt={treatment.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="text-xs text-gray-600">Starting from</div>
                  <div className="font-bold text-blue-600">{treatment.priceFrom}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {treatment.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {treatment.description}
                </p>
                
                {/* Stats */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duration
                    </span>
                    <span className="font-semibold text-gray-900">{treatment.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Success Rate
                    </span>
                    <span className="font-semibold text-green-600">{treatment.successRate}</span>
                  </div>
                </div>
                
                {/* Countries */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Available in:</div>
                  <div className="flex flex-wrap gap-1">
                    {treatment.countries.map((country) => (
                      <span 
                        key={country}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Get Free Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200">
            View All Treatments
          </button>
        </div>
      </div>
    </section>
  );
}

export default Treatments;
