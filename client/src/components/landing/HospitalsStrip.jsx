import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import hospitals from '../../data/hospitals';

function HospitalsStrip() {
  const { t } = useTranslation();
  
  // Show only the first 3 hospitals on the landing page
  const featuredHospitals = hospitals.slice(0, 3);
  
  return (
    <section className="py-20 bg-gradient-to-br from-teal-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🏥 Featured Hospitals
          </div>
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
            {t('hospitals.topHospitalsTitle').split('Top')[0]}<span className="text-teal-600">{t('hospitals.topHospitalsTitle').includes('Top') ? t('hospitals.topHospitalsTitle') : 'Top Hospitals in New Delhi'}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('hospitals.topHospitalsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHospitals.map((hospital, index) => (
            <div
              key={hospital.name}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-teal-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 flex flex-col hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56">
                <img 
                  src={hospital.img} 
                  alt={`Photo of ${hospital.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="font-heading text-xl font-bold group-hover:text-teal-300 transition-colors">{hospital.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-slate-200 mt-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>{hospital.location}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-yellow-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  <FaStar />
                  <span>{hospital.rating}</span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4 text-sm text-gray-600">
                  <p><strong className="text-gray-900">{t('hospitals.beds')}:</strong> {hospital.beds}</p>
                  <p><strong className="text-gray-900">{t('hospitals.established')}:</strong> {hospital.established}</p>
                  <p><strong className="text-gray-900">{t('hospitals.accreditations')}:</strong> {hospital.accreditations.length ? hospital.accreditations.join(", ") : "N/A"}</p>
                </div>
                <div className="mb-4 text-sm text-gray-700 flex-grow">
                  <p>{hospital.description}</p>
                </div>
                <div className="mb-6">
                  <div className="text-xs text-gray-500 mb-2 font-semibold">{t('hospitals.topSpecialties').toUpperCase()}:</div>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-800 text-xs font-semibold rounded-full border border-teal-100"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Hospitals Button */}
        <div className="text-center mt-12">
          <Link to="/hospitals">
            <button className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              View All Hospitals
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HospitalsStrip;