import { useTranslation } from 'react-i18next';

const steps = [
  { 
    title: "Medical Consultation & Review", 
    text: "Upload medical reports and book a free consultation. Our medical advisors review your case within 24 hours and recommend treatment options.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    step: "01",
    timeline: "24-48 hrs",
    features: ["Free medical consultation", "Medical report analysis", "Treatment recommendations"]
  },
  { 
    title: "Hospital & Doctor Selection", 
    text: "Receive verified quotes from 3-5 top hospitals. Compare success rates, costs, and doctor credentials before making your decision.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    step: "02",
    timeline: "3-7 days",
    features: ["Multiple verified quotes", "Doctor background checks", "Success rate comparison"]
  },
  { 
    title: "Travel & Documentation", 
    text: "Complete visa assistance, flight bookings, and accommodation arrangements. We coordinate with hospitals for appointment scheduling.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    step: "03",
    timeline: "7-14 days",
    features: ["Visa support", "Travel arrangements", "Hotel bookings"]
  },
  { 
    title: "Treatment & Recovery Support", 
    text: "24/7 support during treatment, language interpretation, family assistance, and post-treatment follow-up care coordination.",
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    step: "04",
    timeline: "Ongoing",
    features: ["24/7 patient support", "Language assistance", "Recovery monitoring"]
  },
];

function Steps() {
  const { t } = useTranslation();
  
  const stepsData = [
    { 
      title: t('steps.step1.title'), 
      text: t('steps.step1.description'),
      icon: steps[0].icon,
      step: "01",
      timeline: steps[0].timeline,
      features: steps[0].features
    },
    { 
      title: t('steps.step2.title'), 
      text: t('steps.step2.description'),
      icon: steps[1].icon,
      step: "02",
      timeline: steps[1].timeline,
      features: steps[1].features
    },
    { 
      title: t('steps.step3.title'), 
      text: t('steps.step3.description'),
      icon: steps[2].icon,
      step: "03",
      timeline: steps[2].timeline,
      features: steps[2].features
    },
    { 
      title: t('steps.step4.title'), 
      text: t('steps.step4.description'),
      icon: steps[3].icon,
      step: "04",
      timeline: steps[3].timeline,
      features: steps[3].features
    },
  ];
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {t('steps.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('steps.subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stepsData.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
                {/* Timeline Badge */}
                <div className="inline-flex items-center justify-center bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  ⏱ {step.timeline}
                </div>
                
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full font-bold text-lg mb-4">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {step.text}
                </p>
                
                {/* Features List */}
                <div className="space-y-2">
                  {step.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-gray-500">
                      <svg className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Connector Arrow */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('cta.title')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              {t('cta.primaryButton')}
            </button>
            <button className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors">
              {t('cta.secondaryButton')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Steps;
