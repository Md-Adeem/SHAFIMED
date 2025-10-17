import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const hospitals = [
  { 
    name: "Indraprastha Apollo Hospital, New Delhi",
    img: "/images/apollo-hospitals.png",
    location: "New Delhi, India",
    rating: "4.3 (86 ratings)",
    beds: "710",
    established: "1995",
    accreditations: ["JCI", "NABL"],
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Multi-specialty"],
    description: "India's premier multi-super specialty hospital and the flagship of Apollo Hospitals Group. First globally recognized by JCI in 2005; leader in organ transplantation and cardiac sciences."
  },
  { 
    name: "Fortis Escorts Heart Institute, New Delhi",
    img: "/images/fortis-healthcare.png",
    location: "New Delhi, India",
    rating: "4.5 (24 ratings)",
    beds: "310",
    established: "1988",
    accreditations: ["JCI", "NABH", "NABL"],
    specialties: ["Cardiac Surgery", "Heart Care"],
    description: "A flagship hospital of Fortis Healthcare, pioneer in cardiac care for over three decades; largest private cardiac hospital in Asia-Pacific."
  },
  { 
    name: "Max Super Speciality Hospital, Saket, New Delhi",
    img: "/images/max-healthcare.png",
    location: "New Delhi, India",
    rating: "3.8 (49 ratings)",
    beds: "539",
    established: "2005",
    accreditations: ["JCI", "NABH", "ISO"],
    specialties: ["Heart Care", "Cancer", "Multi-specialty"],
    description: "Top healthcare facility with cutting-edge medical technology; first in India accredited as Center of Excellence in Metabolic & Bariatric Surgery by SRC, USA."
  },
  { 
    name: "Sir Ganga Ram Hospital, New Delhi",
    img: "/images/Anadolu-Medical.png",
    location: "New Delhi, India",
    rating: "4.4 (24 ratings)",
    beds: "575",
    established: "1954",
    accreditations: ["NABH", "NABL", "ISO"],
    specialties: ["Multi-specialty", "Oncology", "Cardiology", "Transplants"],
    description: "Comprehensive private hospital; houses India's first bone bank; first large hospital in Delhi to join AB-PMJAY."
  },
  { 
    name: "BLK-Max Super Speciality Hospital, Delhi",
    img: "/images/Anadolu-Medical.png",
    location: "New Delhi, India",
    rating: "3.8 (48 ratings)",
    beds: "650",
    established: "1959",
    accreditations: ["JCI", "NABH", "NABL"],
    specialties: ["Oncology", "Transplants", "Orthopedics", "Multi-specialty"],
    description: "Prestigious tertiary care hospital; home to North India's largest Bone Marrow Transplant Centre; first in Asia with CyberKnife VSI for advanced radiosurgery."
  },
  { 
    name: "Manipal Hospitals Dwarka, Delhi",
    img: "/images/Anadolu-Medical.png",
    location: "New Delhi, India",
    rating: "4.4 (54 ratings)",
    beds: "380",
    established: "1970",
    accreditations: ["NABH", "NABL"],
    specialties: ["Multi-specialty", "Oncology", "Cardiology"],
    description: "Multi-super speciality tertiary care facility; part of Manipal Education and Medical Group."
  },
  { 
    name: "Fortis Hospital, Shalimar Bagh, New Delhi",
    img: "/images/Anadolu-Medical.png",
    location: "New Delhi, India",
    rating: "4.4 (33 ratings)",
    beds: "262",
    established: "2010",
    accreditations: ["NABH"],
    specialties: ["Pediatrics", "Cardiology", "Orthopedics", "Multi-specialty"],
    description: "Major multi-super specialty hospital; India's first Green Hospital Building."
  },
  { 
    name: "B.R. Healthcare Rohini",
    img: "/images/Anadolu-Medical.png",
    location: "New Delhi, India",
    rating: "N/A",
    beds: "N/A",
    established: "1970",
    accreditations: [],
    specialties: ["Multi-specialty", "Dental", "Hair", "Skin", "Orthopedic", "General Medicine"],
    description: "Healthcare facility providing comprehensive services with focus on Dental, Hair, Skin, Orthopedic, and General Medicine."
  },
  { 
    name: "Alive Wellness Clinics",
    img: "/images/Anadolu-Medical.png",
    location: "New Delhi, India",
    rating: "N/A",
    beds: "N/A",
    established: "1997",
    accreditations: [],
    specialties: ["Aesthetic Solutions"],
    description: "Specialty clinic offering 360-degree aesthetic solutions founded by Dr. Chiranjiv Chhabra."
  },
  // { 
  //   name: "Cloudnine Hospital, Kailash Colony",
  //   img: "/images/Anadolu-Medical.png",
  //   location: "New Delhi, India",
  //   rating: "N/A",
  //   beds: "N/A",
  //   established: "1970",
  //   accreditations: [],
  //   specialties: ["Maternity", "Childcare", "Multi-specialty"],
  //   description: "Facility specializing in maternity and childcare; known for international standards and stem cell banking services."
  // }
];

function HospitalsStrip() {
  const { t } = useTranslation();
  
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
            {t('hospitals.topHospitalsTitle').split('Top')[0]}<span className="text-teal-600">{t('hospitals.topHospitalsTitle').includes('Top') ? t('hospitals.topHospitalsTitle') : 'Top Hospitals in New Delhi'}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('hospitals.topHospitalsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hospitals.map((hospital) => (
            <div
              key={hospital.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl shadow-slate-200/70 hover:shadow-2xl hover:shadow-slate-300/80 hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56">
                <img 
                  src={hospital.img} 
                  alt={`Photo of ${hospital.name}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="font-heading text-2xl font-bold">{hospital.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-slate-200 mt-1">
                    <FaMapMarkerAlt className="w-3 h-3" />
                    <span>{hospital.location}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  <FaStar />
                  <span>{hospital.rating}</span>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4 text-sm text-slate-600">
                  <p><strong>{t('hospitals.beds')}:</strong> {hospital.beds}</p>
                  <p><strong>{t('hospitals.established')}:</strong> {hospital.established}</p>
                  <p><strong>{t('hospitals.accreditations')}:</strong> {hospital.accreditations.length ? hospital.accreditations.join(", ") : "N/A"}</p>
                </div>
                <div className="mb-4 text-sm text-slate-700">
                  <p>{hospital.description}</p>
                </div>
                <div className="mb-6">
                  <div className="text-xs text-slate-500 mb-2 font-semibold">{t('hospitals.topSpecialties').toUpperCase()}:</div>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-3 py-1 bg-teal-50 text-teal-800 text-xs font-semibold rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                {/* <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-auto">
                  View Hospital Details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HospitalsStrip;
