import { useTranslation } from 'react-i18next';

const specialties = [
  {
    id: 'cardiology',
    title: 'Cardiology',
    description: 'Advanced heart procedures and surgeries',
    procedures: ['Bypass Surgery', 'Valve Replacement', 'Angioplasty', 'Pacemaker'],
    startingPrice: '$8,500',
    successRate: '94.2%',
    specialists: 180
  },
  {
    id: 'orthopedics', 
    title: 'Orthopedics',
    description: 'Joint replacement and spine surgeries',
    procedures: ['Knee Replacement', 'Hip Replacement', 'Spine Surgery', 'Sports Medicine'],
    startingPrice: '$4,200',
    successRate: '96.8%',
    specialists: 220
  },
  {
    id: 'oncology',
    title: 'Oncology', 
    description: 'Comprehensive cancer treatment',
    procedures: ['Chemotherapy', 'Radiation', 'Surgical Oncology', 'Immunotherapy'],
    startingPrice: '$12,000',
    successRate: '89.3%',
    specialists: 150
  }
];

function MultiSpecialtyFocus() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🚑 Medical Specialties
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Medical Specialties We Cover
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access world-class specialists across multiple medical disciplines with verified success rates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialties.map((specialty, index) => (
            <div 
              key={specialty.id} 
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{specialty.title}</h3>
              <p className="text-sm text-gray-600 mb-6">{specialty.description}</p>
              
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{specialty.startingPrice}</div>
                  <div className="text-xs text-gray-500">Starting From</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{specialty.successRate}</div>
                  <div className="text-xs text-gray-500">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{specialty.specialists}+</div>
                  <div className="text-xs text-gray-500">Specialists</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Common Procedures:</div>
                <div className="flex flex-wrap gap-2">
                  {specialty.procedures.map((procedure, index) => (
                    <span key={index} className="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors">
                      {procedure}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-teal-600 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105">
                Learn More →
              </button>
            </div>
          ))}
        </div>
        
        {/* Bottom stats */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl font-bold text-teal-600 mb-2 group-hover:scale-110 transition-transform">550+</div>
              <div className="text-sm text-gray-600">Medical Specialists</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform">25+</div>
              <div className="text-sm text-gray-600">Sub-specialties</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">350+</div>
              <div className="text-sm text-gray-600">Partner Hospitals</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform">28+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MultiSpecialtyFocus;