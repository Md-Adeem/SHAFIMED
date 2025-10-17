import {
  GiKneeCap,
  GiFemale,
  GiHairStrands,
  GiBodyHeight,
  GiHeartOrgan,
} from "react-icons/gi";
import {
  FaUserMd,
  FaBrain,
  FaLungs,
  FaHeart,
  FaCut,
  FaStethoscope,
  FaSyringe,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const treatments = [
  { name: "Knee Replacement", price: "$4000", icon: <GiKneeCap size={32} /> },
  { name: "Hip Replacement", price: "$5500", icon: <FaUserMd size={32} /> },
  { name: "Brain Tumor", price: "$5000", icon: <FaBrain size={32} /> },
  { name: "Heart Bypass Surgery", price: "$4500", icon: <FaHeart size={32} /> },
  { name: "Valve Replacement", price: "$9500", icon: <FaSyringe size={32} /> },
  { name: "Breast Cancer", price: "$5000", icon: <FaStethoscope size={32} /> },
  { name: "Lung Cancer", price: "$5500", icon: <FaLungs size={32} /> },
  { name: "Rhinoplasty", price: "$1800", icon: <FaCut size={32} /> },
  {
    name: "Breast Implants",
    price: "$2750",
    icon: <FaStethoscope size={32} />,
  },
  {
    name: "Hair Transplant",
    price: "$1400",
    icon: <GiHairStrands size={32} />,
  },
  { name: "Cervical Cancer", price: "$4500", icon: <GiFemale size={32} /> },
  { name: "Hysterectomy", price: "$3000", icon: <GiBodyHeight size={32} /> },
];

const MultiSpecialtyFocus = () => {
  return (
    <div className="py-16 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-teal-800 mb-2">
        Lowest Quotes Assured
      </h2>
      <p className="text-teal-600 mb-10 max-w-2xl mx-auto">
        We constantly negotiate better prices and alternatives without
        compromising treatment quality. Our prices are consistently lower.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-12">
        {treatments.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-teal-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-teal-400 transition-all duration-300"
          >
            <div className="flex justify-center mb-4 text-teal-600">
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold text-black">{item.name}</h3>
            <p className="text-gray-700 mt-2">
              Starting{" "}
              <span className="font-bold text-black">{item.price}</span>
            </p>
            <button className="text-teal-600 font-medium mt-2 hover:text-teal-800 hover:underline transition-colors">
              Get Quote
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="mt-12 flex justify-center gap-6">
        <Link to="/signup">
          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all duration-300">
            Get Quote
          </button>
        </Link>

        <Link to="/chat">
          <button
            onClick={() => window.open("https://wa.me/9565188938", "_blank")}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300"
          >
            Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MultiSpecialtyFocus;
