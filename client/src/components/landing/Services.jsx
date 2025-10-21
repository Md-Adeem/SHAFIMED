import { useTranslation } from 'react-i18next';

const services = [
  {
    id: 'medical-consultation',
    title: 'Medical Consultation',
    description: 'Free expert medical consultation with treatment recommendations',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    features: ['Expert medical review', 'Treatment recommendations', 'Risk assessment', 'Second opinions'],
    availability: '24/7 Available',
    responseTime: 'Within 24 hours'
  },
  {
    id: 'hospital-selection',
    title: 'Hospital & Doctor Selection', 
    description: 'Verified hospitals and specialist matching based on your needs',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: ['JCI accredited hospitals', 'Specialist verification', 'Success rate analysis', 'Cost comparison'],
    availability: 'Global Network',
    responseTime: '3-5 business days'
  },
  {
    id: 'travel-assistance',
    title: 'Travel & Visa Support',
    description: 'Complete travel coordination including visa, flights, and accommodation',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    features: ['Medical visa assistance', 'Flight bookings', 'Hotel reservations', 'Airport transfers'],
    availability: 'Worldwide Service',
    responseTime: '7-14 days processing'
  },
  {
    id: 'patient-support',
    title: 'Patient Care Support',
    description: 'Dedicated support throughout your treatment journey',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    features: ['Language interpretation', 'Family assistance', 'Medical records management', 'Emergency support'],
    availability: '24/7 Emergency Line',
    responseTime: 'Immediate response'
  },
  {
    id: 'insurance-billing',
    title: 'Insurance & Billing',
    description: 'Insurance coordination and transparent billing management',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    features: ['Insurance pre-authorization', 'Claims processing', 'Payment plans', 'Cost breakdowns'],
    availability: 'Business Hours',
    responseTime: '1-3 business days'
  },
  {
    id: 'followup-care',
    title: 'Follow-up Care',
    description: 'Post-treatment monitoring and continued care coordination',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    features: ['Recovery monitoring', 'Medication guidance', 'Rehabilitation support', 'Health tracking'],
    availability: 'Ongoing Support',
    responseTime: 'Regular check-ins'
  }
];

function Services() {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🎆 Complete Care Package
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Medical Tourism Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            End-to-end support for your medical journey - from initial consultation to post-treatment care
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-teal-100 p-8 hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-teal-50 transition-all duration-500 group transform hover:-translate-y-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Service Header */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0 p-4 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl group-hover:scale-110 transition-all duration-300 shadow-lg">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>

              {/* Features List */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-teal-700 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What's Included:
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Details */}
              <div className="border-t border-gray-200 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Availability:
                  </div>
                  <span className="font-medium text-teal-700">{service.availability}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Response Time:
                  </div>
                  <span className="font-medium text-teal-700">{service.responseTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Service Process Timeline */}
        <div className="bg-gradient-to-r from-white to-teal-50 rounded-2xl shadow-xl border border-teal-100 p-8">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Service Journey</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">How our comprehensive services work together for your medical journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group bg-white/50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                1
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">Pre-Treatment</h4>
              <p className="text-gray-600">Medical consultation, hospital selection, travel arrangements</p>
            </div>
            
            <div className="text-center group bg-white/50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                2
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">During Treatment</h4>
              <p className="text-gray-600">Patient support, family assistance, insurance coordination</p>
            </div>
            
            <div className="text-center group bg-white/50 p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold group-hover:scale-110 transition-transform duration-300 shadow-lg">
                3
              </div>
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Post-Treatment</h4>
              <p className="text-gray-600">Follow-up care, recovery monitoring, continued support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;