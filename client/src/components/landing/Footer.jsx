function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-white font-extrabold text-2xl mb-4">
              ShafiMed International
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Connecting patients with world-class healthcare across borders
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Treatments */}
          <div>
            <div className="text-white font-semibold mb-4">
              Popular Treatments
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cardiac Surgery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Orthopedic Surgery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Organ Transplant
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cancer Treatment
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Fertility Treatment
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-white font-semibold mb-4">Quick Links</div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/hospitals"
                  className="hover:text-white transition-colors"
                >
                  Top Hospitals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Find Doctors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Patient Stories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Medical Visa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Insurance
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Offices */}
          <div>
            <div className="text-white font-semibold mb-4">Contact Us</div>
            <div className="space-y-3 text-sm">
              {/* Global Headquarters */}
              <div>
                <div className="font-medium text-white mb-1">
                  Global HQ - Dubai
                </div>
                <p className="text-gray-400">Business Bay, Dubai, UAE</p>
                <p className="text-gray-400">Phone: +971-50-234-XXXX</p>
              </div>

              {/* Regional Office */}
              <div>
                <div className="font-medium text-white mb-1">
                  Head Office - New delhi
                </div>
                <p className="text-gray-400">Abu Fazal Enclave, Okhla, India</p>
                <p className="text-gray-400">Phone: +91-91-9898-6796</p>
              </div>

              {/* Support Contacts */}
              <div className="border-t border-gray-700 pt-3">
                <p className="text-gray-400">Email: shafimedindia@gmail.com</p>
                <p className="text-gray-400">Emergency: +971-50-234-XXXX</p>
                <p className="text-gray-400">WhatsApp: +91-91-9898-6796</p>
              </div>
            </div>
          </div>
        </div>


        {/* Certifications & Trust */}
        {/* <div className="border-t border-gray-700 pt-8 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-400">ISO 27001 Certified</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-xs text-gray-400">HIPAA Compliant</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-xs text-gray-400">SSL Secured</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div className="text-xs text-gray-400">24/7 Support</div>
            </div>
          </div>
        </div> */}



      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} ShafiMed International. All rights
              reserved. | Est. 2019
            </div>

            <div className="flex space-x-6 text-xs text-gray-500">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Medical Disclaimer
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
