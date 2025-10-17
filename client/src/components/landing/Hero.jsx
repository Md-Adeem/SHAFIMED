import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaStethoscope,
  FaHospital,
  FaUserMd,
  FaAward,
  FaShieldAlt,
  FaClock,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              {t("hero.trustBadge")}
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero.title")}
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/login">
                <button className="group bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  {/* {t("hero.Get started")} */} Get Started
                </button>
              </Link>

              <Link to="/signup">
                <button className="group border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg">
                  {t("hero.emergencyCare")} 
                </button>
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaUserMd className="text-blue-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {t("hero.features.expertDoctors")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaClock className="text-green-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {t("hero.features.available247")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaGlobe className="text-purple-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {t("hero.features.globalReach")}
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaAward className="text-yellow-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {t("hero.features.awardWinning")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - 5 columns */}
          <div className="lg:col-span-5">
            {/* Success Story Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
              {/* Floating stats */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">94.7%</div>
                  <div className="text-xs">Success Rate</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=80&h=80&fit=crop&crop=face"
                    alt="Patient"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Ahmed Al-Rashid
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Heart Valve Replacement • UAE
                    </p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                      <span className="text-xs text-gray-500 ml-2">
                        Verified Patient
                      </span>
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic mb-6">
                  "ShafiMed connected me with Apollo Hospital in Chennai. The
                  surgery was successful and I saved over $35,000 compared to
                  local costs. Their team handled everything from visa to
                  recovery accommodation."
                </blockquote>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12h</div>
                  <div className="text-xs text-gray-600">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">847</div>
                  <div className="text-xs text-gray-600">Specialists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    23.4k
                  </div>
                  <div className="text-xs text-gray-600">Treatments</div>
                </div>
              </div>

              {/* Medical icons decoration */}
              <div className="absolute -bottom-2 -left-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 shadow-lg">
                <FaStethoscope className="text-white text-xl" />
              </div>
              <div className="absolute top-1/2 -right-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-2 shadow-lg">
                <FaHospital className="text-white text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom stats section */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                50k+
              </div>
              <div className="text-gray-600">
                {t("hero.stats.patientsTreated")}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                500+
              </div>
              <div className="text-gray-600">
                {t("hero.stats.expertDoctors")}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                50+
              </div>
              <div className="text-gray-600">
                {t("hero.stats.specializations")}
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                24/7
              </div>
              <div className="text-gray-600">
                {t("hero.stats.supportAvailable")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
