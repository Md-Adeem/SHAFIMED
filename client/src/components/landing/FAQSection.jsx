import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const faqData = [
  {
    category: 'General',
    questions: [
      {
        q: "What is medical tourism and how does ShafiMed help?",
        a: "Medical tourism involves traveling to another country for medical treatment. ShafiMed facilitates this by connecting patients with verified hospitals, arranging travel, and providing comprehensive support throughout the medical journey."
      },
      {
        q: "How much can I save through medical tourism?",
        a: "Patients typically save 60-80% compared to treatment costs in developed countries. For example, a knee replacement that costs $40,000 in the US can be done for $4,200 in India with the same quality standards."
      },
      {
        q: "Is medical tourism safe?",
        a: "Yes, when done through reputable providers like ShafiMed. We partner only with JCI-accredited hospitals that meet international quality standards. Our partner hospitals have success rates comparable to or better than Western facilities."
      }
    ]
  },
  {
    category: 'Services',
    questions: [
      {
        q: "What services does ShafiMed provide?",
        a: "We provide end-to-end services including medical consultation, hospital selection, travel arrangements, visa assistance, accommodation booking, language interpretation, and post-treatment follow-up care."
      },
      {
        q: "Do you help with medical visa applications?",
        a: "Yes, we provide complete visa assistance including document preparation, application submission, and liaison with embassy/consulate offices to ensure smooth visa processing for medical purposes."
      },
      {
        q: "Can family members accompany me?",
        a: "Absolutely. We arrange companion visas, family accommodation, and provide support for accompanying family members throughout your treatment journey."
      }
    ]
  },
  {
    category: 'Costs & Payments',
    questions: [
      {
        q: "How do I pay for my treatment?",
        a: "We offer multiple payment options including direct payment to hospitals, payment plans, and assistance with insurance claims. Payment can be made via bank transfer, credit card, or other secure methods."
      },
      {
        q: "Are there any hidden costs?",
        a: "No. We provide transparent pricing with detailed cost breakdowns including treatment, accommodation, travel, and all associated fees. There are no hidden charges."
      },
      {
        q: "Do you work with insurance companies?",
        a: "Yes, we assist with insurance pre-authorization and claims processing. Many international insurance plans cover medical tourism, and we help navigate the approval process."
      }
    ]
  },
  {
    category: 'Quality & Safety',
    questions: [
      {
        q: "How do you verify hospital quality?",
        a: "We partner only with JCI-accredited hospitals that meet international standards. All facilities undergo rigorous evaluation including success rates, safety protocols, and quality metrics."
      },
      {
        q: "What if something goes wrong during treatment?",
        a: "We provide 24/7 support during your treatment. Our team coordinates with hospitals for any complications, and we have emergency protocols in place. All partner hospitals have comprehensive insurance coverage."
      },
      {
        q: "How do I get my medical records after treatment?",
        a: "We ensure you receive complete medical records, including digital copies, treatment summaries, and prescription details. These are provided in English and can be shared with your home doctors."
      }
    ]
  },
  {
    category: 'Travel & Logistics',
    questions: [
      {
        q: "How long do I need to stay for treatment?",
        a: "Duration varies by procedure: simple treatments may require 1-2 weeks, while complex surgeries like transplants may need 6-8 weeks. We provide specific timelines during consultation."
      },
      {
        q: "What about follow-up care after returning home?",
        a: "We coordinate with your local doctors for continued care and provide detailed medical reports. For complex cases, we arrange video consultations with your treating specialists."
      },
      {
        q: "Can I combine treatment with tourism?",
        a: "Yes, many patients extend their stay for recovery tourism. We can arrange sightseeing and cultural experiences once your doctor clears you for travel and activities."
      }
    ]
  }
];

function FAQSection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [openQuestion, setOpenQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [...new Set(faqData.map(item => item.category))];
  
  const filteredFAQs = faqData.find(item => item.category === selectedCategory)?.questions || [];
  
  const searchFilteredFAQs = searchQuery
    ? filteredFAQs.filter(faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredFAQs;

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-white relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ❓ Got Questions?
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about medical tourism and our services
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 sticky top-8 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📁 Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenQuestion(null);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : 'text-gray-700 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Quick Stats */}
              <div className="mt-8 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{faqData.reduce((total, cat) => total + cat.questions.length, 0)}+</div>
                  <div className="text-sm text-gray-600">Questions Answered</div>
                  <div className="text-xs text-gray-500 mt-1">✨ Always Updated</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {searchFilteredFAQs.length} result(s) found for "{searchQuery}"
                </p>
              </div>
            )}

            <div className="space-y-4">
              {searchFilteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none group-hover:bg-blue-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-600 transition-colors">
                      {faq.q}
                    </h3>
                    <div className={`w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openQuestion === index ? 'bg-blue-600 rotate-180' : 'group-hover:bg-blue-200'
                    }`}>
                      <svg
                        className={`w-4 h-4 transition-colors duration-200 ${
                          openQuestion === index ? 'text-white' : 'text-blue-600'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {openQuestion === index && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <div className="pt-4 text-gray-700 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {searchFilteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">Try searching with different keywords or browse categories</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our medical experts are available 24/7 to answer your specific questions and provide personalized guidance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              📞 Call Expert Now
            </button>
            <button className="bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold py-3 px-8 rounded-lg transition-colors">
              💬 Start Live Chat
            </button>
          </div>
          
          {/* Contact Methods */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-blue-600 font-semibold">Phone Support</div>
              <div className="text-sm text-gray-600">+971-4-589-2847</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-semibold">WhatsApp</div>
              <div className="text-sm text-gray-600">+971-56-789-1234</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-semibold">Email</div>
              <div className="text-sm text-gray-600">support@shafimed.com</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;