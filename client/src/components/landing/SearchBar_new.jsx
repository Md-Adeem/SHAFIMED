import { useState } from "react";

function SearchBar() {
  const [searchData, setSearchData] = useState({
    treatment: "",
    country: "",
    budget: ""
  });

  const handleSearch = () => {
    // Handle search logic here
    console.log("Searching for:", searchData);
  };

  const specialties = [
    { name: "Cardiology", icon: "❤️" },
    { name: "Orthopedics", icon: "🦴" },
    { name: "Oncology", icon: "🎗️" },
    { name: "Neurology", icon: "🧠" },
    { name: "Fertility", icon: "👶" },
    { name: "Cosmetic", icon: "✨" },
    { name: "Dentistry", icon: "🦷" },
    { name: "Ophthalmology", icon: "👁️" }
  ];

  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Treatment by <span className="text-blue-600">Specialty</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive range of medical specialties and connect with world-class specialists
          </p>
        </div>

        {/* Quick Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
              <input 
                type="text"
                value={searchData.treatment}
                onChange={(e) => setSearchData({...searchData, treatment: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search treatments..."
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                value={searchData.country}
                onChange={(e) => setSearchData({...searchData, country: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Countries</option>
                <option value="india">India</option>
                <option value="turkey">Turkey</option>
                <option value="thailand">Thailand</option>
                <option value="singapore">Singapore</option>
                <option value="malaysia">Malaysia</option>
              </select>
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <select 
                value={searchData.budget}
                onChange={(e) => setSearchData({...searchData, budget: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Budget</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-30k">$15,000 - $30,000</option>
                <option value="over-30k">Over $30,000</option>
              </select>
            </div>
            
            <div className="md:col-span-1 flex items-end">
              <button 
                onClick={handleSearch}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Medical Specialties Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {specialties.map((specialty) => (
            <div
              key={specialty.name}
              className="group bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl p-4 text-center cursor-pointer transition-all duration-200 hover:shadow-md"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                {specialty.icon}
              </div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {specialty.name}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Partner Hospitals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">45+</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">25,000+</div>
            <div className="text-sm text-gray-600">Happy Patients</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;  


