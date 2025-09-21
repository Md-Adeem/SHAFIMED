import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Testimonials Carousel */}
          <div className="order-2 lg:order-1">
            <div 
              className="relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                {/* Quote */}
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                {/* Patient Info */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {testimonials[currentIndex].verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-gray-600">{testimonials[currentIndex].location}</div>
                    <div className="text-xs text-gray-500">{testimonials[currentIndex].date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Saved</div>
                    <div className="font-bold text-green-600">{testimonials[currentIndex].savings}</div>
                  </div>
                </div>
                
                {/* Treatment and Hospital */}
                <div className="mt-4 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {testimonials[currentIndex].treatment}
                    </span>
                    {testimonials[currentIndex].verified && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        ✓ Verified Patient
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    📍 {testimonials[currentIndex].hospital}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">18,500+</div>
                <div className="text-sm text-gray-600">{t('hero.stats.patientsTreated')}</div>
                <div className="text-xs text-gray-400 mt-1">Since 2019</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">94.2%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-gray-400 mt-1">Verified Outcomes</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">28+</div>
                <div className="text-sm text-gray-600">{t('searchBar.countries')}</div>
                <div className="text-xs text-gray-400 mt-1">Active Network</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">12min</div>
                <div className="text-sm text-gray-600">Avg Response</div>
                <div className="text-xs text-gray-400 mt-1">24/7 Support</div>
              </div>
            </div>
            
            {/* Feature List */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Free consultation with medical experts</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Verified hospitals and doctors</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Complete travel and stay assistance</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Post-treatment follow-up care</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
