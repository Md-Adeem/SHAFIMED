// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import QuoteModal from "./ui/QuoteModal";

// const TopNavbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const initGoogleTranslate = () => {
//       if (window.google && window.google.translate) {
//         // Prevent duplicate widget initialization
//         if (
//           !document.querySelector(
//             "#google_translate_element_nav .goog-te-combo"
//           )
//         ) {
//           new window.google.translate.TranslateElement(
//             {
//               pageLanguage: "en",
//               includedLanguages: "en,ar,fr,de,es,hi,bn,ru",
//               layout:
//                 window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//               autoDisplay: false,
//             },
//             "google_translate_element_nav"
//           );
//         }
//       } else {
//         setTimeout(initGoogleTranslate, 500);
//       }
//     };

//     // Load Google Translate script only once globally
//     if (!document.getElementById("google_translate_script")) {
//       const script = document.createElement("script");
//       script.id = "google_translate_script";
//       script.src =
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitNav";
//       script.async = true;
//       document.body.appendChild(script);

//       window.googleTranslateElementInitNav = initGoogleTranslate;
//     } else {
//       initGoogleTranslate();
//     }
//   }, []);

//   return (
//     <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 shadow-sm relative z-[999]">
//       <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm">
//         {/* Left - Brand */}
//         <Link to="/" className="flex items-center gap-2 group">
//           <div className="w-12 h-12 flex items-center justify-center">
//             <img
//               src="/src/assets/ShaafiMedX.jpg"
//               alt="ShaafiMedX Logo"
//               className="w-12 h-12 object-contain"
//             />
//           </div>
//           <span className="text-xl md:text-2xl font-extrabold text-white 
//             leading-tight 
//             max-w-[120px] md:max-w-none 
//             whitespace-normal md:whitespace-nowrap">
//             ShaafiMedX-International
//           </span>
//         </Link>

//         {/* Right - Translate + Quote */}
//         <div className="flex items-center gap-3 relative">
//           {/* Google Translate Widget */}
//           <div
//             id="google_translate_element_nav"
//             // className="flex items-center bg-white/20 rounded-md px-2 py-[2px] min-h-[36px]"
//             className="
//               flex items-center 
//               bg-white/20 backdrop-blur-sm 
//               rounded-md px-1.5 md:px-2 
//               py-[2px] min-h-[34px]
//               overflow-hidden
//               max-w-[85px] md:max-w-none
//             "
//           ></div>

//           {/* Get Quote Button */}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             // className="bg-red-600 hover:bg-red-700 px-7 py-3 text-white rounded-md text-sm font-semibold"
//             className="
//               bg-red-600 hover:bg-red-700 
//               px-4 py-2 md:px-7 md:py-3 
//               text-white rounded-md 
//               text-xs md:text-sm 
//               font-semibold
//             "
//           >
//             Get Quote
//           </button>
//         </div>

//         {/* Quote Modal */}
//         <QuoteModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />
//       </div>
//     </div>
//   );
// };

// export default TopNavbar;





import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import QuoteModal from "./ui/QuoteModal";
import { Menu, X } from "lucide-react"; // unchanged

const TopNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --------------------------------------------------------------------
  // 🔥 CHANGE ADDED — Initialize Google Translate only ONCE
  // --------------------------------------------------------------------
  useEffect(() => {
    window.googleTranslateElementInitNav = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ar,fr,de,es,hi,bn,ru",
          layout:
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element_nav" // ALWAYS desktop + mobile header
      );
    };

    if (!document.getElementById("google_translate_script")) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitNav";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* --------------------------------------------------------------------
          🔥 CHANGE ADDED — MOBILE TRANSLATE BUTTON FIXED IN HEADER
      -------------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 shadow-sm relative z-[999]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm">

        {/* <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white py-2 shadow-sm z-[999]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 text-sm"> */}

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/src/assets/ShaafiMedX.jpg"
              alt="ShaafiMedX Logo"
              className="w-12 h-12"
            />

            <span className="text-xl md:text-2xl font-extrabold leading-tight whitespace-nowrap">
              ShaafiMedX-International
            </span>
          </Link>

          {/* --------------------------------------------------------------------
              🔥 CHANGE ADDED — SHOW GOOGLE TRANSLATE EVEN ON MOBILE
              md:flex ➝ flex
          -------------------------------------------------------------------- */}
          <div className="flex items-center gap-3">

            {/* GOOGLE TRANSLATE (desktop + mobile) */}
            <div
              id="google_translate_element_nav"
              className="
                flex items-center 
                bg-white/20 backdrop-blur-sm 
                rounded-md px-2 py-[2px] 
                min-h-[34px]
                text-black
              "
            ></div>

            {/* DESKTOP & MOBILE GET QUOTE */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:block bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md font-semibold"
            >
              Get Quote
            </button>

            {/* MOBILE MENU ICON */}
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* ---------------------- MOBILE SIDEBAR ---------------------- */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-[1000] transform
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          transition-transform duration-300`}
      >
        {/* CLOSE */}
        <div className="flex justify-between items-center p-4 border-b">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={28} />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col p-4 space-y-5 text-gray-800">
          <Link to="/" className="text-lg font-medium">Home</Link>
          <Link to="/hospitals" className="text-lg font-medium">Hospitals</Link>
          <Link to="/about" className="text-lg font-medium">About</Link>
          <Link to="/contact" className="text-lg font-medium">Contact</Link>

          {/* --------------------------------------------------------------------
              🔥 CHANGE REMOVED — DO NOT MOVE GOOGLE TRANSLATE TO SIDEBAR
              (Widget stays in header like Vaidam.com)
          -------------------------------------------------------------------- */}

          {/* GET QUOTE (mobile button) */}
          <button
            onClick={() => {
              setSidebarOpen(false);
              setIsModalOpen(true);
            }}
            className="bg-red-600 text-white py-2 rounded-md w-full font-semibold"
          >
            Get Quote
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[900]"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TopNavbar;

