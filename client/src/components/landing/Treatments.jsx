import { useState } from "react";
import { useTranslation } from 'react-i18next';

const treatments = [
  { 
    title: "Knee Replacement", 
    img: "https://images.unsplash.com/photo-1632059362301-4f27a0d8b60e?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$4,200",
    priceRange: "$4,200 - $7,800",
    duration: "2-3 weeks",
    recoveryTime: "6-12 weeks",
    successRate: "94.8%",
    description: "Total knee replacement with titanium implants and robotic assistance",
    countries: ["India", "Turkey", "Thailand"],
    procedures: "2,340+ completed",
    category: "orthopedic",
    savings: "Up to 70% vs USA"
  },
  { 
    title: "Heart Bypass Surgery", 
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$9,500",
    priceRange: "$9,500 - $18,000",
    duration: "2-3 weeks",
    recoveryTime: "4-8 weeks",
    successRate: "92.3%",
    description: "Coronary artery bypass with experienced cardiac surgeons",
    countries: ["India", "Turkey", "Singapore"],
    procedures: "1,890+ completed",
    category: "cardiac",
    savings: "Up to 80% vs USA"
  },
  { 
    title: "Liver Transplant", 
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031b?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$28,000",
    priceRange: "$28,000 - $45,000",
    duration: "4-8 weeks",
    recoveryTime: "12-16 weeks",
    successRate: "89.7%",
    description: "Living donor and cadaveric liver transplant programs",
    countries: ["India", "Turkey", "Germany"],
    procedures: "540+ completed",
    category: "transplant",
    savings: "Up to 75% vs USA"
  },
  { 
    title: "IVF Treatment", 
    img: "https://images.unsplash.com/photo-1623341214825-9f50d0aa02ba?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$2,800",
    priceRange: "$2,800 - $5,500",
    duration: "2-4 weeks",
    recoveryTime: "2-3 weeks",
    successRate: "58.4%",
    description: "Advanced fertility treatment with genetic screening options",
    countries: ["India", "Cyprus", "Czech Republic"],
    procedures: "3,200+ cycles",
    category: "fertility",
    savings: "Up to 65% vs USA"
  },
  { 
    title: "Spinal Fusion Surgery", 
    img: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$8,500",
    priceRange: "$8,500 - $15,000",
    duration: "2-4 weeks",
    recoveryTime: "8-12 weeks",
    successRate: "91.2%",
    description: "Minimally invasive spinal fusion with titanium instrumentation",
    countries: ["India", "Turkey", "Germany"],
    procedures: "1,670+ completed",
    category: "orthopedic",
    savings: "Up to 78% vs USA"
  },
  { 
    title: "Breast Reconstruction", 
    img: "https://images.unsplash.com/photo-1606813907291-fad639c661be?q=80&w=800&auto=format&fit=crop",
    priceFrom: "$3,200",
    priceRange: "$3,200 - $6,800",
    duration: "1-2 weeks",
    recoveryTime: "4-6 weeks",
    successRate: "96.1%",
    description: "Post-mastectomy reconstruction with implant or flap techniques",
    countries: ["Turkey", "India", "Brazil"],
    procedures: "980+ completed",
    category: "cosmetic",
    savings: "Up to 60% vs USA"
  },
];

function Treatments() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Treatments" },
    { id: "cardiac", name: "Cardiac" },
    { id: "orthopedic", name: "Orthopedic" },
    { id: "transplant", name: "Transplant" },
    { id: "fertility", name: "Fertility" },
    { id: "cosmetic", name: "Reconstructive" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('treatments.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('treatments.subtitle')}
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
                  <div className="text-xs text-gray-600">{t('treatments.startingFrom')}</div>
                  <div className="font-bold text-blue-600">{treatment.priceFrom}</div>
                </div>
                
                {/* Savings Badge */}
                <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="text-xs text-white font-medium">{treatment.savings}</div>
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
                      Hospital Stay
                    </span>
                    <span className="font-semibold text-gray-900">{treatment.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Recovery Time
                    </span>
                    <span className="font-semibold text-gray-900">{treatment.recoveryTime}</span>
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
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Experience
                    </span>
                    <span className="font-semibold text-gray-900">{treatment.procedures}</span>
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
            {t('treatments.viewAll')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Treatments;
