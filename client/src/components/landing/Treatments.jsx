
import { useState } from "react";
import { FaClock, FaCheckCircle, FaTag } from 'react-icons/fa'; // Added FaTag for price

// Replace the existing 'treatments' array at the top of your Treatments.jsx file with this one.

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
          </button>
        </div>
      </div>
    </section>
  );
}

export default Treatments;