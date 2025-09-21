import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const caseStudies = [
  {
    id: 1,
    title: "Complex Heart Surgery Success",
    patientName: "Mohammed Al-Rashid",
    age: 58,
    country: "UAE",
    condition: "Triple Vessel Coronary Artery Disease",
    treatment: "Coronary Artery Bypass Surgery (CABG)",
    hospital: "Apollo Hospital, Chennai",
    duration: "3 weeks",
    costSaved: "$62,000",
    outcome: "Complete recovery, returned to normal activities within 6 weeks",
    beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?q=80&w=400&auto=format&fit=crop",
    timeline: [
      { phase: "Initial Consultation", duration: "Day 1-2", description: "Medical review and treatment planning" },
      { phase: "Pre-operative Phase", duration: "Day 3-7", description: "Comprehensive health assessment and preparation" },
      { phase: "Surgery & Recovery", duration: "Day 8-21", description: "Successful CABG surgery and monitored recovery" },
      { phase: "Follow-up Care", duration: "Ongoing", description: "Regular check-ups and rehabilitation support" }
    ],
    testimonial: "ShafiMed made what seemed impossible, possible. The coordination was flawless, and the medical care exceeded all expectations.",
    verified: true,
    successMetrics: {
      procedureSuccess: "100%",
      recoveryTime: "6 weeks",
      complicationRate: "0%",
      patientSatisfaction: "5/5"
    }
  },
  {
    id: 2,
    title: "Life-Changing Knee Replacement",
    patientName: "Sarah Mitchell",
    age: 62,
    country: "UK",
    condition: "Severe Osteoarthritis - Bilateral Knees",
    treatment: "Bilateral Total Knee Replacement",
    hospital: "Fortis Hospital, Delhi",
    duration: "4 weeks",
    costSaved: "$45,000",
    outcome: "Pain-free mobility restored, walking 5km daily after 3 months",
    beforeImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop",
    timeline: [
      { phase: "Assessment", duration: "Day 1-3", description: "Comprehensive orthopedic evaluation" },
      { phase: "First Surgery", duration: "Day 4-14", description: "Right knee replacement and initial recovery" },
      { phase: "Second Surgery", duration: "Day 15-28", description: "Left knee replacement and bilateral rehabilitation" },
      { phase: "Rehabilitation", duration: "3-6 months", description: "Physiotherapy and mobility restoration" }
    ],
    testimonial: "After 5 years of chronic pain, I can finally walk without discomfort. The quality of care in India was exceptional.",
    verified: true,
    successMetrics: {
      procedureSuccess: "100%",
      recoveryTime: "12 weeks",
      complicationRate: "0%",
      patientSatisfaction: "5/5"
    }
  },
  {
    id: 3,
    title: "Successful Fertility Treatment",
    patientName: "Anna & Carlos Silva",
    age: "32 & 35",
    country: "Brazil",
    condition: "Male Factor Infertility + Tubal Blockage",
    treatment: "IVF with ICSI and Genetic Testing",
    hospital: "Anadolu Medical Center, Turkey",
    duration: "6 weeks",
    costSaved: "$28,000",
    outcome: "Healthy pregnancy achieved, baby born at full term (3.2kg)",
    beforeImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1544362230-d1a050c5c6a5?q=80&w=400&auto=format&fit=crop",
    timeline: [
      { phase: "Initial Evaluation", duration: "Week 1", description: "Comprehensive fertility assessment for both partners" },
      { phase: "Treatment Protocol", duration: "Week 2-4", description: "Ovarian stimulation and monitoring" },
      { phase: "Procedures", duration: "Week 5-6", description: "Egg retrieval, ICSI, and embryo transfer" },
      { phase: "Follow-up", duration: "Ongoing", description: "Pregnancy monitoring and prenatal care" }
    ],
    testimonial: "After 4 failed attempts locally, ShafiMed connected us with the right specialists. Our miracle baby is now 8 months old!",
    verified: true,
    successMetrics: {
      procedureSuccess: "100%",
      pregnancyRate: "Achieved",
      complicationRate: "0%",
      patientSatisfaction: "5/5"
    }
  }
];

function CaseStudies() {
  const { t } = useTranslation();
  const [selectedCase, setSelectedCase] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Real Patient Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped patients achieve successful medical outcomes while saving significantly on treatment costs
          </p>
        </div>

        {/* Case Selection */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              onClick={() => setSelectedCase(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selectedCase === index
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-600'
              }`}
            >
              {study.title}
            </button>
          ))}
        </div>

        {/* Selected Case Study */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Case Header */}
          <div className="bg-white p-8 border-b border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Patient Info */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{caseStudies[selectedCase].title}</h3>
                  {caseStudies[selectedCase].verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      ✓ Verified Case
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Patient:</span>
                    <span className="ml-2 font-medium">{caseStudies[selectedCase].patientName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Age:</span>
                    <span className="ml-2 font-medium">{caseStudies[selectedCase].age}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Country:</span>
                    <span className="ml-2 font-medium">{caseStudies[selectedCase].country}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2 font-medium">{caseStudies[selectedCase].duration}</span>
                  </div>
                </div>
              </div>

              {/* Cost Savings */}
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{caseStudies[selectedCase].costSaved}</div>
                <div className="text-sm text-gray-600">Total Savings</div>
                <div className="text-xs text-gray-500 mt-1">vs. Local Treatment</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-50 px-8 py-4">
            <div className="flex space-x-6">
              {['overview', 'timeline', 'outcome'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Details</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Condition:</span>
                      <p className="font-medium">{caseStudies[selectedCase].condition}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Treatment:</span>
                      <p className="font-medium">{caseStudies[selectedCase].treatment}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Hospital:</span>
                      <p className="font-medium">{caseStudies[selectedCase].hospital}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Success Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(caseStudies[selectedCase].successMetrics).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="font-bold text-gray-900">{value}</div>
                        <div className="text-xs text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Treatment Timeline</h4>
                <div className="space-y-6">
                  {caseStudies[selectedCase].timeline.map((phase, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h5 className="font-semibold text-gray-900">{phase.phase}</h5>
                          <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">{phase.duration}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'outcome' && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Treatment Outcome</h4>
                <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                  <h5 className="font-semibold text-emerald-800 mb-2">Result:</h5>
                  <p className="text-emerald-700">{caseStudies[selectedCase].outcome}</p>
                </div>
                
                <div className="bg-teal-50 rounded-xl p-6">
                  <h5 className="font-semibold text-teal-800 mb-2">Patient Testimonial:</h5>
                  <blockquote className="text-teal-700 italic">"{caseStudies[selectedCase].testimonial}"</blockquote>
                  <div className="text-right mt-3 text-sm text-teal-600">
                    - {caseStudies[selectedCase].patientName}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Success Story?</h3>
            <p className="mb-6">Join thousands of patients who have achieved successful medical outcomes through ShafiMed</p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors">
              Share Your Case
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;