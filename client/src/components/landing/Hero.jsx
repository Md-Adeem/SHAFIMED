import React, { useState } from "react";
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
import QuoteModal from "../ui/QuoteModal"; // ✅ Import your modal

const Hero = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-teal-100 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 rounded-full text-sm font-medium mb-6 shadow-md">
              <FaShieldAlt className="mr-2" />
              {t("hero.trustBadge")}
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t("hero.title")}
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
              {t("hero.subtitle")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              {/* 🔴 Let's Help button — now opens modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Let’s Help
              </button>

              {/* WhatsApp Chat button */}
              <a
                href={`https://wa.me/919198986796?text=${encodeURIComponent(
                  `Hello Team ShaafiMed International,

I am interested in your medical services and would appreciate more information about the treatments and facilities you offer. Kindly provide the relevant details at your earliest convenience.

Thank you very much.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="group bg-white border-2 border-green-600 text-green-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-green-600"
                  >
                    <path d="M12 2C6.477 2 2 6.266 2 11.5c0 2.022.626 3.939 1.804 5.563L2 22l5.111-1.767C8.016 21.191 9.982 21.9 12 21.9c5.523 0 10-4.266 10-9.5S17.523 2 12 2zm0 17.9c-1.741 0-3.447-.564-4.864-1.606l-.349-.25-3.036 1.05 1.037-2.958-.228-.31C3.831 15.137 3.4 13.354 3.4 11.5 3.4 7.361 7.26 4 12 4s8.6 3.361 8.6 7.5-3.86 7.4-8.6 7.4zm4.211-5.037c-.231-.116-1.363-.674-1.574-.75-.211-.077-.365-.116-.519.116-.154.231-.595.75-.73.904-.135.154-.269.173-.5.058-.231-.115-.975-.359-1.857-1.143-.687-.607-1.151-1.354-1.286-1.585-.134-.231-.014-.356.101-.471.104-.104.231-.269.346-.404.115-.135.154-.231.231-.385.077-.154.038-.289-.019-.404-.058-.115-.519-1.25-.712-1.711-.187-.449-.376-.388-.519-.396l-.442-.008c-.154 0-.404.058-.617.289-.211.231-.808.789-.808 1.923s.828 2.232.943 2.385c.115.154 1.63 2.487 3.946 3.482.552.238.982.381 1.318.487.554.176 1.057.151 1.456.092.444-.066 1.363-.556 1.554-1.093.191-.537.191-.996.134-1.093-.057-.097-.211-.154-.442-.27z" />
                  </svg>
                  Chat on WhatsApp
                </button>
              </a>
            </div>

            {/* Feature highlights (unchanged) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-teal-200 group-hover:to-emerald-200 transition-all duration-300">
                  <FaUserMd className="text-teal-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-teal-700 transition-colors">
                  {t("hero.features.expertDoctors")}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-300">
                  <FaClock className="text-emerald-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-700 transition-colors">
                  {t("hero.features.available247")}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-teal-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-purple-200 group-hover:to-teal-200 transition-all duration-300">
                  <FaGlobe className="text-purple-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                  {t("hero.features.globalReach")}
                </p>
              </div>
              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-yellow-200 group-hover:to-emerald-200 transition-all duration-300">
                  <FaAward className="text-yellow-600 text-xl" />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-yellow-700 transition-colors">
                  {t("hero.features.awardWinning")}
                </p>
              </div>
            </div>
          </div>

          {/* Right content (unchanged) */}
          <div className="lg:col-span-5">
            {/* Patient success card... (same as before) */}
            {/* ... */}
          </div>
        </div>

        {/* Bottom stats (unchanged) */}
        {/* ... */}
      </div>

      {/* ✅ Quote Modal Component */}
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Hero;
