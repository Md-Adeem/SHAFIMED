
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSubmitCase = () => {
    navigate("/submit-case");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#135ec1] to-[#d7e9ff]">
      {/* ✅ Hero Section */}
      <section
        className="bg-cover bg-center text-white py-20 px-4"
        style={{ backgroundImage: "url('/bg.jpeg')" }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            A True Devotion to Healing
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg mb-6">
            Duis sit amet nulla vestibulum, interdum felis a, malesuada enim. Ut
            vel risus accumsan, iaculis elit id, varius est. Praesent ut ante nisi.
          </p>

          <button
            onClick={handleSubmitCase}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Submit Your Case
          </button>
        </div>
      </section>

      {/* ✅ Info Section */}
      <section className="py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-hospital-user text-4xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">ABOUT US</h3>
            <p className="text-gray-600">
              Learn more about our mission, vision, and healthcare services.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-user-md text-4xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">DOCTORS</h3>
            <p className="text-gray-600">
              Meet our experienced team of doctors and specialists.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-calendar-check text-4xl text-blue-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">APPOINTMENTS</h3>
            <p className="text-gray-600">
              Book your appointment quickly and easily.
            </p>
          </div>
        </div>
      </section>




        {/* ✅ What We Offer Section */}
<section className="py-16 px-4">
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
    What We Offer
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {/* Card 1 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src="/pen.jpeg"
        alt="Case Submission"
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">Case Submission</h4>
        <p className="text-gray-600 text-sm">
          Easily submit your case with detailed information about your health
          concerns.
        </p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src="/fa.jpeg"
        alt="Facilitator Assistance"
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">Facilitator Assistance</h4>
        <p className="text-gray-600 text-sm">
          Receive personalized assistance from our facilitators, guiding you
          through the process.
        </p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src="/rep.jpeg"
        alt="Reports Upload"
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">Reports Upload</h4>
        <p className="text-gray-600 text-sm">
          Securely upload your medical reports for review by our team and
          doctors.
        </p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition">
      <img
        src="/fo.jpeg"
        alt="Follow-up Tracking"
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-2">Follow-up Tracking</h4>
        <p className="text-gray-600 text-sm">
          Track your follow-up appointments and progress with our intuitive
          system.
        </p>
      </div>
    </div>
  </div>
</section>





      {/* ✅ Services Section */}
      <section className="py-12 px-4 bg-gray-100 bg-opacity-70 rounded-lg shadow-lg mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-800">
          A True Devotion to Healing
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-user-nurse text-4xl text-blue-600 mb-4"></i>
            <h4 className="text-lg font-semibold mb-2">Licensed Therapist</h4>
            <p className="text-gray-600">Professional & caring staff.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-stethoscope text-4xl text-blue-600 mb-4"></i>
            <h4 className="text-lg font-semibold mb-2">Quick Examination</h4>
            <p className="text-gray-600">Fast & accurate diagnosis.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-baby text-4xl text-blue-600 mb-4"></i>
            <h4 className="text-lg font-semibold mb-2">Child Care</h4>
            <p className="text-gray-600">Specialized pediatric care.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-ambulance text-4xl text-blue-600 mb-4"></i>
            <h4 className="text-lg font-semibold mb-2">24/7 Emergency</h4>
            <p className="text-gray-600">Always available for you.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-x-ray text-4xl text-blue-600 mb-4"></i>
            <h4 className="text-lg font-semibold mb-2">X-Ray</h4>
            <p className="text-gray-600">Modern scanning technology.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
            <i className="fas fa-heartbeat text-4xl text-blue-600 mb-4"></i>
            <h4 className="text-lg font-semibold mb-2">Electrocardiography</h4>
            <p className="text-gray-600">Heart monitoring services.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

