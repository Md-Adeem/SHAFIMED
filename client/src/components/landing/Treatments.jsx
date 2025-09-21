
import { useState } from "react";
import { FaClock, FaCheckCircle, FaTag } from 'react-icons/fa'; // Added FaTag for price

// Replace the existing 'treatments' array at the top of your Treatments.jsx file with this one.
=======
import { useTranslation } from 'react-i18next';

const treatments = [
  { 
    title: "Knee Replacement", 
    img: "/images/knee-replacement.jpg", // Local path
    priceFrom: "$3,500",
    duration: "2-3 weeks",
    successRate: "98%",
    description: "Advanced knee replacement surgery with minimal downtime for quick recovery.",
    countries: ["India", "Turkey", "Thailand"]
  },
  { 
    title: "Heart Surgery", 
    img: "/images/heart-surgery.jpg", // Local path
    priceFrom: "$8,500",
    duration: "1-2 weeks",
    successRate: "97%",
    description: "World-class cardiac procedures with experienced surgeons and modern facilities.",
    countries: ["India", "Germany", "Singapore"]
  },
  { 
    title: "Liver Transplant", 
    img: "/images/liver-transplant.jpg", // Local path
    priceFrom: "$25,000",
    duration: "4-6 weeks",
    successRate: "95%",
    description: "Life-saving liver transplant procedures with comprehensive pre- and post-op care.",
    countries: ["India", "Turkey", "Germany"]
  },
  { 
    title: "IVF Treatment", 
    img: "/images/ivf-treatment.jpg", // Local path
    priceFrom: "$2,500",
    duration: "2-3 weeks",
    successRate: "65%",
    description: "Advanced fertility treatments with personalized care plans for aspiring parents.",
    countries: ["India", "Cyprus", "Czech Republic"]
  },
  { 
    title: "Spine Surgery", 
    img: "/images/spine-surgery.jpg", // Local path
    priceFrom: "$12,000",
    duration: "3-4 weeks",
    successRate: "96%",
    description: "Minimally invasive spine surgery techniques ensuring faster recovery.",
    countries: ["India", "Turkey", "Germany"]
  },
  { 
    title: "Cosmetic Surgery", 
    img: "/images/cosmetic-surgery.jpg", // Local path
    priceFrom: "$4,500",
    duration: "1-2 weeks",
    successRate: "99%",
    description: "Aesthetic procedures with natural-looking results for enhanced confidence.",
    countries: ["Turkey", "South Korea", "Brazil"]
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

  const filteredTreatments = treatments.filter(treatment => {
    if (selectedCategory === "all") return true;
    // Simple category matching for demo purposes
    if (selectedCategory === "cardiac" && treatment.title.includes("Heart")) return true;
    if (selectedCategory === "orthopedic" && treatment.title.includes("Knee") || treatment.title.includes("Spine")) return true;
    if (selectedCategory === "oncology" && treatment.title.includes("Liver")) return true; // Assuming Liver Transplant for Oncology
    if (selectedCategory === "fertility" && treatment.title.includes("IVF")) return true;
    if (selectedCategory === "cosmetic" && treatment.title.includes("Cosmetic")) return true;
    return false;
  });

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            Popular <span className="text-teal-600">Medical Treatments</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Explore our most sought-after medical procedures performed by world-renowned specialists.
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('treatments.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('treatments.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-500/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 hover:text-teal-600 border border-slate-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.title}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-slate-300/70 hover:-translate-y-2 transition-all duration-300 flex flex-col" // Added flex-col for consistent button position
            >
              <div className="relative h-56">
                <img 
                  src={treatment.img} 
                  alt={treatment.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="font-heading text-2xl font-bold">{treatment.title}</h3>
                </div>
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-1">
                  <FaTag className="text-teal-500 text-sm" />
                  <div>
                    <div className="text-xs text-slate-600">Starting from</div>
                    <div className="font-bold text-teal-600">{treatment.priceFrom}</div>
                  </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
                  <div className="text-xs text-gray-600">{t('treatments.startingFrom')}</div>
                  <div className="font-bold text-blue-600">{treatment.priceFrom}</div>
                </div>
                
                {/* Savings Badge */}
                <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <div className="text-xs text-white font-medium">{treatment.savings}</div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col"> {/* Added flex-grow and flex-col here */}
                <p className="text-slate-600 text-sm mb-6 min-h-[40px] line-clamp-2"> {/* min-h to prevent layout shift */}
                  {treatment.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <FaClock className="text-teal-500" />
                    <div>
                      <div className="text-slate-500">Duration</div>
                      <div className="font-semibold text-slate-800">{treatment.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-green-500" />
                    <div>
                      <div className="text-slate-500">Success Rate</div>
                      <div className="font-semibold text-slate-800">{treatment.successRate}</div>
                    </div>
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
                
                <div className="mb-6">
                  <div className="text-xs text-slate-500 mb-2">Available in:</div>
                  <div className="flex flex-wrap gap-1">
                    {treatment.countries.map((country) => (
                      <span 
                        key={country}
                        className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-auto"> {/* mt-auto pushes button to bottom */}
                  Get Free Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
            View All Treatments
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