import { useState, useEffect } from "react";
const testimonials = [
  { 
    name: "Fatima Al-Zahra", 
    location: "Riyadh, Saudi Arabia", 
    treatment: "Cardiac Valve Replacement",
    text: "After waiting 8 months locally, ShafiMed connected me with Medanta Hospital in Delhi. Dr. Sharma and his team performed a perfect mitral valve repair. The entire journey from consultation to recovery was professionally managed.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
    savings: "$42,000",
    hospital: "Medanta Hospital, India",
    date: "March 2024",
    verified: true
  },
  { 
    name: "James Morrison", 
    location: "Lagos, Nigeria", 
    treatment: "Spinal Fusion L4-L5",
    text: "Living with chronic back pain for 3 years, I found hope through ShafiMed. Apollo Hospital Chennai gave me my life back. The minimally invasive technique meant I was walking within 2 days. Forever grateful.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
    savings: "$38,500",
    hospital: "Apollo Hospital, India",
    date: "January 2024",
    verified: true
  },
  { 
    name: "Amira Kassem", 
    location: "Cairo, Egypt", 
    treatment: "Total Knee Replacement",
    text: "At 62, climbing stairs was impossible. ShafiMed arranged everything - from medical visa to post-surgery physiotherapy. 4 months later, I'm hiking again! The care coordination was exceptional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
    savings: "$31,200",
    hospital: "Fortis Hospital, India",
    date: "November 2023",
    verified: true
  },
  { 
    name: "Carlos Silva", 
    location: "São Paulo, Brazil", 
    treatment: "Liver Transplant (Living Donor)",
    text: "When my daughter needed a liver transplant, ShafiMed found us the best program in India. The 6-week journey was challenging but successful. Both my daughter and I are healthy now. They saved two lives.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
    savings: "$125,000",
    hospital: "Global Hospital, India",
    date: "September 2023",
    verified: true
  },
  { 
    name: "Priya Sharma", 
    location: "Kathmandu, Nepal", 
    treatment: "IVF with Genetic Testing",
    text: "After 4 failed IVF attempts locally, ShafiMed connected us with Turkey's leading fertility center. Their PGT-A testing ensured a healthy pregnancy. Our miracle baby is now 6 months old.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop&ixlib=rb-4.0.3",
    savings: "$18,000",
    hospital: "Anadolu Medical Center, Turkey",
    date: "February 2023",
    verified: true
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Elements - hidden on mobile for performance */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-64 sm:h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse hidden sm:block"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse hidden sm:block" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            💬 Patient Stories
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Real Stories, Real Results
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from patients who transformed their lives through medical tourism
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12">
          {/* Testimonials Carousel */}
          <div>
            <div 
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg sm:shadow-xl border border-teal-100 hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 group">
                {/* Stars */}
                <div className="flex items-center mb-3 sm:mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                {/* Quote */}
                <blockquote className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                {/* Patient Info */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-teal-200 group-hover:border-teal-400 transition-colors duration-300"
                    />
                    {testimonials[currentIndex].verified && (
                      <div className="absolute -bottom-1 -right-1 sm:-bottom-1 sm:-right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors text-sm sm:text-base">{testimonials[currentIndex].name}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{testimonials[currentIndex].location}</div>
                    <div className="text-xs text-gray-500">{testimonials[currentIndex].date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs sm:text-sm text-gray-600">Saved</div>
                    <div className="font-bold text-emerald-600 text-sm sm:text-base">{testimonials[currentIndex].savings}</div>
                  </div>
                </div>
                
                {/* Treatment and Hospital */}
                <div className="mt-5 sm:mt-6 space-y-2 sm:space-y-3">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    <span className="inline-block bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1 rounded-full font-medium">
                      {testimonials[currentIndex].treatment}
                    </span>
                    {testimonials[currentIndex].verified && (
                      <span className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs px-2 py-1 sm:px-2 sm:py-1 rounded-full font-medium">
                        ✓ Verified Patient
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-teal-500 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {testimonials[currentIndex].hospital}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-5 sm:mt-6">
              <div className="flex space-x-1.5 sm:space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-gradient-to-r from-teal-500 to-emerald-600 w-6 sm:w-8' : 'bg-gray-300 hover:bg-teal-400'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-1.5 sm:space-x-2">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 sm:p-3 text-gray-600 hover:text-teal-600 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-teal-50"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 sm:p-3 text-gray-600 hover:text-teal-600 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-teal-50"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transition-shadow duration-300 border border-teal-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">18,500+</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Patients Treated</div>
                <div className="text-xs text-gray-500 mt-1">Since 2019</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transition-shadow duration-300 border border-emerald-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2">94.2%</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Success Rate</div>
                <div className="text-xs text-gray-500 mt-1">Verified Outcomes</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transition-shadow duration-300 border border-purple-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-1 sm:mb-2">28+</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Countries</div>
                <div className="text-xs text-gray-500 mt-1">Active Network</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-emerald-50 rounded-lg sm:rounded-xl p-4 sm:p-6 text-center shadow-sm sm:shadow-md hover:shadow-md sm:hover:shadow-lg transition-shadow duration-300 border border-orange-100">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-emerald-600 bg-clip-text text-transparent mb-1 sm:mb-2">12min</div>
                <div className="text-xs sm:text-sm text-gray-700 font-medium">Avg Response</div>
                <div className="text-xs text-gray-500 mt-1">24/7 Support</div>
              </div>
            </div>
            
            {/* Feature List */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm sm:shadow-md border border-teal-100">
              <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-3 sm:mb-4">Why Patients Choose Us</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-2.5 sm:space-x-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 group-hover:text-teal-700 transition-colors">Free consultation with medical experts</span>
                </div>
                <div className="flex items-start space-x-2.5 sm:space-x-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 group-hover:text-teal-700 transition-colors">Verified hospitals and doctors</span>
                </div>
                <div className="flex items-start space-x-2.5 sm:space-x-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 group-hover:text-teal-700 transition-colors">Complete travel and stay assistance</span>
                </div>
                <div className="flex items-start space-x-2.5 sm:space-x-3 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 group-hover:text-teal-700 transition-colors">Post-treatment follow-up care</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;