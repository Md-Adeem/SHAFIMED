function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="text-white font-extrabold text-xl">ShafiMed</div>
          <p className="mt-2 text-sm text-gray-400">Trusted partner for medical travel and treatment planning.</p>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Treatments</div>
          <ul className="space-y-2 text-sm">
            <li>Knee Replacement</li>
            <li>Heart Bypass</li>
            <li>Liver Transplant</li>
            <li>IVF</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-sm">
            <li>Hospitals</li>
            <li>Doctors</li>
            <li>Countries</li>
            <li>Stories</li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li>Email: support@shafimed.com</li>
            <li>WhatsApp: +971-XXX-XXXX</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs text-gray-500">© {new Date().getFullYear()} ShafiMed. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;

