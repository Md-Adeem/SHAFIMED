import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const newsArticles = [
  {
    id: 1,
    title: "ShafiMed Partners with Leading Indian Hospitals for Enhanced Medical Tourism",
    excerpt: "New partnerships with Apollo and Medanta expand treatment options for international patients",
    category: "Partnership",
    date: "March 15, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=400&auto=format&fit=crop",
    content: "ShafiMed announced strategic partnerships with Apollo Hospitals and Medanta, two of India's premier healthcare institutions...",
    featured: true
  },
  {
    id: 2,
    title: "Medical Tourism Market Shows 25% Growth in 2024",
    excerpt: "Industry report highlights increasing demand for affordable, quality healthcare abroad",
    category: "Industry News",
    date: "March 10, 2024", 
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=400&auto=format&fit=crop",
    content: "The global medical tourism industry continues its robust growth trajectory, with a 25% increase in 2024...",
    featured: false
  },
  {
    id: 3,
    title: "New AI-Powered Treatment Matching System Launches",
    excerpt: "Advanced algorithm helps patients find the best treatment options based on medical history",
    category: "Technology",
    date: "March 8, 2024",
    readTime: "4 min read", 
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=400&auto=format&fit=crop",
    content: "ShafiMed introduces revolutionary AI technology to match patients with optimal treatment providers...",
    featured: false
  },
  {
    id: 4,
    title: "Success Story: 1000th Cardiac Surgery Patient Celebrates Recovery",
    excerpt: "Milestone achievement marks ShafiMed's growing impact in cardiac care facilitation",
    category: "Success Story",
    date: "March 5, 2024",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400&auto=format&fit=crop", 
    content: "Ahmed Al-Mansouri from Dubai becomes the 1000th cardiac surgery patient to achieve successful outcomes...",
    featured: false
  },
  {
    id: 5,
    title: "Joint Replacement Surgery Costs Drop 15% in 2024",
    excerpt: "Improved hospital partnerships and competitive pricing benefit patients seeking orthopedic care",
    category: "Healthcare Economics",
    date: "March 2, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=400&auto=format&fit=crop",
    content: "Negotiated rates with partner hospitals result in significant cost reductions for joint replacement procedures...",
    featured: false
  },
  {
    id: 6,
    title: "Turkey Emerges as Top Destination for Fertility Treatments",
    excerpt: "High success rates and competitive pricing attract international patients to Turkish clinics",
    category: "Market Trends",
    date: "February 28, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1623341214825-9f50d0aa02ba?q=80&w=400&auto=format&fit=crop",
    content: "Turkey's fertility clinics report record international patient numbers with 60%+ success rates...",
    featured: false
  }
];

const categories = ['All', 'Partnership', 'Industry News', 'Technology', 'Success Story', 'Healthcare Economics', 'Market Trends'];

function NewsSection() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = selectedCategory === 'All' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = newsArticles.filter(article => !article.featured);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Updates
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed about medical tourism trends, success stories, and industry developments
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {selectedCategory === 'All' && featuredArticle && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredArticle.category}
                    </span>
                    <span className="text-gray-500 text-sm">{featuredArticle.date}</span>
                    <span className="text-gray-500 text-sm">{featuredArticle.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredArticle.title}</h3>
                  <p className="text-gray-600 mb-6">{featuredArticle.excerpt}</p>
                  <button 
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="self-start bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory === 'All' ? regularArticles : filteredArticles).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-3 text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-teal-600 font-medium text-sm group-hover:underline">
                    Read More →
                  </span>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-gray-400 text-xs">250+ views</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Medical Tourism News</h3>
          <p className="mb-6 max-w-2xl mx-auto">
            Get the latest industry insights, success stories, and market trends delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 bg-white text-gray-800 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedArticle.category}
                </span>
                <span className="text-gray-500 text-sm">{selectedArticle.date}</span>
                <span className="text-gray-500 text-sm">{selectedArticle.readTime}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h2>
              <p className="text-gray-600 text-lg mb-6">{selectedArticle.excerpt}</p>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{selectedArticle.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default NewsSection;