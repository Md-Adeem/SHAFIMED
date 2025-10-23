import { FaPhone, FaEnvelope, FaWhatsapp, FaClock, FaHospital, FaUserMd, FaMapMarkerAlt, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Footer from "../components/landing/Footer";

function ContactPage() {
  const { t } = useTranslation();
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    // Calculate navbar height dynamically
    const navbar = document.querySelector('header');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const handleWhatsAppClick = () => {
    // Pre-filled WhatsApp message for ShafiMed
    const message = encodeURIComponent("Hello ShafiMed Team, I need assistance with your healthcare services.");
    window.open(`https://wa.me/+919565188938?text=${message}`, '_blank');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 pb-12" style={{ paddingTop: `${navbarHeight}px` }}>
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("contact.heroTitle")}</h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {t("contact.heroDescription")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-100 transform transition-all duration-300 hover:shadow-2xl">
                  <div className="flex items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <FaHeadset className="text-teal-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{t("contact.support247")}</h3>
                      <p className="text-gray-600">{t("contact.support247Description")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <FaUserMd className="text-emerald-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{t("contact.medicalExperts")}</h3>
                      <p className="text-gray-600">{t("contact.medicalExpertsDescription")}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                      <h2 className="text-2xl font-bold mb-2">{t("contact.emergencyTitle")}</h2>
                      <p className="text-teal-100">{t("contact.emergencyDescription")}</p>
                    </div>
                    <div className="flex items-center bg-white text-teal-600 px-6 py-3 rounded-full font-bold">
                      <FaPhone className="text-xl mr-3" />
                      <span>+91 11 2692 5858</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-teal-100 transform transition-all duration-300 hover:shadow-2xl">
                  <img
                    src="/Doctor.jpg"
                    alt={t("contact.doctorImageAlt")}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm">{t("contact.available")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("contact.getInTouch")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("contact.getInTouchDescription")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Call Us Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6 mx-auto">
                <FaPhone className="text-teal-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{t("contact.callUs")}</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">{t("contact.ourSupportTeam")}</h4>
                  <a href="tel:+911126925858" className="text-xl font-medium text-teal-600 hover:text-teal-800 transition-colors block">
                    +91 11 2692 5858
                  </a>
                  <p className="text-gray-600 mt-2">{t("contact.supportHours")}</p>
                </div>
                <div className="text-center pt-4 border-t border-gray-100">
                  <Link to="/hospitals" className="text-teal-600 hover:text-teal-800 transition-colors font-medium">
                    {t("contact.viewHospitals")} →
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Chat Now Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6 mx-auto">
                <FaWhatsapp className="text-emerald-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{t("contact.chatNow")}</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-700 mb-6">
                    {t("contact.chatDescription")}
                  </p>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 hover:from-teal-600 hover:to-emerald-700 transition-all w-full"
                  >
                    <FaWhatsapp className="mr-2" />
                    <span>{t("contact.whatsappChat")}</span>
                  </button>
                </div>
                <div className="text-center text-gray-600 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-center">
                    <FaClock className="mr-2 text-teal-600" />
                    <span>{t("contact.chatHours")}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Email Support Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-teal-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <FaEnvelope className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">{t("contact.emailSupport")}</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-700 mb-6">
                    {t("contact.emailDescription")}
                  </p>
                  <a 
                    href="mailto:support@shafimed.com"
                    className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-teal-700 transition-all w-full"
                  >
                    <FaEnvelope className="mr-2" />
                    <span>{t("contact.sendEmail")}</span>
                  </a>
                </div>
                <div className="text-center text-gray-600 pt-4 border-t border-gray-100">
                  <p>{t("contact.emailResponseTime")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-teal-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("contact.ourOffices")}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{t("contact.ourOfficesDescription")}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-teal-50 flex items-start">
                <FaMapMarkerAlt className="text-teal-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{t("contact.headOffice")}</h3>
                  <p className="text-gray-600">New Delhi, India</p>
                  <p className="text-gray-600 mt-1">{t("contact.headOfficeAddress")}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-teal-50 flex items-start">
                <FaMapMarkerAlt className="text-teal-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{t("contact.regionalOffice")}</h3>
                  <p className="text-gray-600">Mumbai, India</p>
                  <p className="text-gray-600 mt-1">{t("contact.regionalOfficeAddress")}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-teal-50 flex items-start">
                <FaMapMarkerAlt className="text-teal-600 text-xl mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{t("contact.internationalOffice")}</h3>
                  <p className="text-gray-600">Dubai, UAE</p>
                  <p className="text-gray-600 mt-1">{t("contact.internationalOfficeAddress")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;  