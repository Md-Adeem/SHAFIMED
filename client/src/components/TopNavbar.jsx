import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QuoteModal from "./ui/QuoteModal";

const TopNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        // Prevent duplicate widget initialization
        if (
          !document.querySelector(
            "#google_translate_element_nav .goog-te-combo"
          )
        ) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,ar,fr,de,es,hi,bn,ru",
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element_nav"
          );
        }
      } else {
        setTimeout(initGoogleTranslate, 500);
      }
    };

    // Load Google Translate script only once globally
    if (!document.getElementById("google_translate_script")) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitNav";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInitNav = initGoogleTranslate;
    } else {
      initGoogleTranslate();
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 shadow-sm relative z-[999]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm">
        {/* Left - Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src="/src/assets/ShaafiMedX.jpg"
              alt="ShaafiMedX Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <span className="text-xl md:text-2xl font-extrabold text-white 
            leading-tight 
            max-w-[120px] md:max-w-none 
            whitespace-normal md:whitespace-nowrap">
            ShaafiMedX-International
          </span>
        </Link>

        {/* Right - Translate + Quote */}
        <div className="flex items-center gap-3 relative">
          {/* Google Translate Widget */}
          <div
            id="google_translate_element_nav"
            // className="flex items-center bg-white/20 rounded-md px-2 py-[2px] min-h-[36px]"
            className="
              flex items-center 
              bg-white/20 backdrop-blur-sm 
              rounded-md px-1.5 md:px-2 
              py-[2px] min-h-[34px]
              overflow-hidden
              max-w-[85px] md:max-w-none
            "
          ></div>

          {/* Get Quote Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            // className="bg-red-600 hover:bg-red-700 px-7 py-3 text-white rounded-md text-sm font-semibold"
            className="
              bg-red-600 hover:bg-red-700 
              px-4 py-2 md:px-7 md:py-3 
              text-white rounded-md 
              text-xs md:text-sm 
              font-semibold
            "
          >
            Get Quote
          </button>
        </div>

        {/* Quote Modal */}
        <QuoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default TopNavbar;
