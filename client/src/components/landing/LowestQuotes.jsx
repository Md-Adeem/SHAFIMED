import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const quoteFeatures = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Verified Quotes",
    description: "All quotes verified by licensed medical professionals"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    title: "Transparent Pricing",
    description: "No hidden costs - detailed breakdown included"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Quick Response",
    description: "Receive quotes within 24-48 hours"
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Multiple Options",
    description: "Compare 3-5 hospitals for best value"
  }
];

const exampleQuotes = [
  {
    procedure: "Knee Replacement Surgery",
    hospital: "Apollo Hospital, Chennai",
    originalPrice: "$18,000",
    ourPrice: "$4,200",
    savings: "77%",
    duration: "2-3 weeks",
    rating: "4.8"
  },
  {
    procedure: "Heart Bypass Surgery", 
    hospital: "Medanta Hospital, Delhi",
    originalPrice: "$45,000",
    ourPrice: "$9,500",
    savings: "79%",
    duration: "2-4 weeks",
    rating: "4.7"
  },
  {
    procedure: "Liver Transplant",
    hospital: "Global Hospital, Chennai",
    originalPrice: "$120,000",
    ourPrice: "$28,000",
    savings: "77%", 
    duration: "6-8 weeks",
    rating: "4.6"
  }
];

function LowestQuotes() {
  const { t } = useTranslation();
  const [selectedQuote, setSelectedQuote] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-teal-50 to-emerald-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.2) 1px, transparent 0)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            💰 Best Prices Guaranteed
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Get the Lowest Verified Quotes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Compare transparent pricing from top hospitals worldwide. Save up to 80% on medical procedures without compromising quality.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quoteFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group border border-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Quote Comparison */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Quote Selection */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Real Cost Comparisons</h3>
              <div className="space-y-4">
                {exampleQuotes.map((quote, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedQuote(index)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 group ${
                      selectedQuote === index 
                        ? 'bg-gradient-to-r from-teal-50 to-emerald-50 shadow-lg border-2 border-teal-300 transform scale-105' 
                        : 'bg-white/70 hover:bg-white hover:shadow-md border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{quote.procedure}</h4>
                        <p className="text-sm text-gray-600">{quote.hospital}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{quote.ourPrice}</div>
                        <div className="text-xs text-gray-500 line-through">{quote.originalPrice}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Quote Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-gray-900">Quote Details</h4>
                <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold text-gray-900">{exampleQuotes[selectedQuote].rating}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Procedure</div>
                  <div className="font-semibold text-gray-900">{exampleQuotes[selectedQuote].procedure}</div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Hospital</div>
                  <div className="font-semibold text-gray-900">{exampleQuotes[selectedQuote].hospital}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">{exampleQuotes[selectedQuote].duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">You Save</div>
                    <div className="font-semibold text-green-600">{exampleQuotes[selectedQuote].savings}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Local Price:</span>
                    <span className="line-through text-gray-500">{exampleQuotes[selectedQuote].originalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Our Price:</span>
                    <span className="text-green-600">{exampleQuotes[selectedQuote].ourPrice}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Get My Quote →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Save on Your Treatment?</h3>
            <p className="text-gray-600 mb-6">Get personalized quotes from verified hospitals in minutes</p>
            <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Free Quote Now ✨
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LowestQuotes;