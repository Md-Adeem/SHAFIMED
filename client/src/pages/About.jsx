import { FaLinkedin, FaGithub, FaGlobe } from "react-icons/fa";
import Footer from "../components/landing/Footer";

export default function About() {
  const teamMembers = [
    {
      name: "Fraz Ahmad Haidry",
      role: "Team Lead & System Architect",
      desc: "Specializing in designing scalable, high-performance systems, Fraz architects robust back-end solutions and integrates them seamlessly with frontend platforms. He ensures that the entire stack works efficiently to meet both short-term goals and long-term scalability.",
      img: "/src/assets/Fraz.jpg",
      linkedin: "https://www.linkedin.com/in/fraz-ahmad-haidry-a9578522a/",
      github: "https://github.com/frazhaidry",
      tags: ["React", "Next.js", "System Design", "Backend Architecture"],
    },
    {
      name: "Md Adeem",
      role: "Full-Stack Developer, CI/CD & Deployment Expert",
      desc: "Designing and implementing robust APIs, focusing on performance and scalability. Proficient in Node.js and MongoDB, with a strong understanding of backend architecture and data modeling. Adept at setting up CI/CD pipelines for streamlined deployments and automating workflows to ensure consistent, error-free production releases.",
      img: "/src/assets/md-adeem-photo.jpg",
      linkedin: "https://www.linkedin.com/in/md-adeem/",
      github: "https://github.com/Md-Adeem",
      tags: ["Node.js", "MongoDB", "System Design", "CI/CD", "API Development"],
    },
    {
      name: "Inzamam Siddiqui",
      role: "Frontend Developer",
      desc: "Expert in building responsive and performant user interfaces using React and TailwindCSS. Focuses on system architecture for the frontend, optimizing for both developer experience and user experience. Implements complex state management solutions and ensures cross-browser compatibility and accessibility.",
      img: "/src/assets/Inzamam.jpg",
      linkedin: "https://www.linkedin.com/in/inzamam-siddiqui-25567828b/",
      github: "https://github.com/inzamam-sid",
      tags: ["React", "TailwindCSS", "UI/UX", "Responsive Design", "System Architecture"],
    },
    {
      name: "Mohd Faraz",
      role: "UI & QA Engineer",
      desc: "Ensures quality across the development pipeline, from code through deployment. Responsible for maintaining CI/CD pipelines, ensuring system stability through automated testing, and managing cloud infrastructure deployments using AWS and Docker. Focuses on system reliability and performance, ensuring smooth releases and minimal downtime.",
      img: "/src/assets/faraz.jpg",
      linkedin: "https://www.linkedin.com/in/mohammad-faraz-8755a6302/",
      github: "https://github.com/farazmohd230",
      tags: ["AWS", "Docker", "CI/CD", "Automated Testing", "System Reliability"],
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-white via-teal-50 to-emerald-50 m-10 text-gray-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-12 py-20 relative">
          {/* About Intro */}
          <div className="text-center mb-16">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ℹ️ About Us
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About <span className="text-teal-600">ShaafiMed</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ShaafiMed is an international healthcare facilitation platform that connects
              <span className="font-semibold text-gray-800"> global patients with trusted Indian doctors</span>.
              We provide complete support — from booking medical consultations to post-surgery recovery — 
              making healthcare accessible, transparent, and human-centered.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To make India the world's most trusted medical destination by bridging
                the gap between international patients and world-class Indian doctors.
                We envision a healthcare experience that is effortless, affordable,
                and compassionate — no matter where our patients come from.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to simplify medical travel by providing end-to-end
                support for international patients — from consultation, visa
                assistance, hospital coordination, and translation, to recovery and
                post-treatment care. We aim to make every patient feel at home,
                in India and beyond.
              </p>
            </div>
          </div>

          {/* What We Offer */}
          <div className="text-center mb-20">
            <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🎁 What We Offer
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              What <span className="text-teal-600">We Offer</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Our comprehensive patient care services ensure a smooth, stress-free
              experience — before, during, and after treatment.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {[
                {
                  icon: "💼",
                  title: "Connect with Top International Hospitals",
                  desc: "Access a curated network of accredited Indian hospitals and global medical specialists.",
                },
                {
                  icon: "🏨",
                  title: "Free 5-Day Hotel Stay Post-Surgery",
                  desc: "Relax and recover comfortably after surgery with complimentary accommodation.",
                },
                {
                  icon: "🚖",
                  title: "Complimentary Airport Pickup & Drop",
                  desc: "Enjoy hassle-free transfers from the airport to your hospital or hotel.",
                },
                {
                  icon: "📞",
                  title: "Local SIM Card on Arrival",
                  desc: "Stay connected with family and friends from day one of your medical journey.",
                },
                {
                  icon: "🗣️",
                  title: "24/7 Interpreter & Medical Support",
                  desc: "Our multilingual support team assists you throughout your stay in India.",
                },
                {
                  icon: "🧾",
                  title: "Visa & Documentation Assistance",
                  desc: "We help you with visa processing, medical letters, and hospital coordination.",
                },
              ].map((offer, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg rounded-2xl p-6 border border-teal-100 transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-3">{offer.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {offer.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{offer.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-20">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              💎 Our Core Values
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Our <span className="text-teal-600">Core Values</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              These values define how we build, communicate, and care for every
              patient we serve.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Compassion",
                  desc: "We believe healthcare begins with empathy — every patient deserves care and comfort.",
                },
                {
                  title: "Transparency",
                  desc: "No hidden costs or confusion. We maintain clarity in pricing, process, and communication.",
                },
                {
                  title: "Excellence",
                  desc: "Partnering only with verified, world-class hospitals and specialists across India.",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg rounded-2xl p-8 border border-teal-100 transition-all duration-300 hover:-translate-y-2"
                >
                  <h4 className="text-xl font-semibold text-teal-600 mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Meet Our Team */}
          <section className="relative py-28 bg-gradient-to-b from-white via-teal-50/60 to-emerald-50 overflow-hidden">
            <div className="absolute inset-0 -z-10 opacity-30 blur-3xl bg-gradient-to-r from-teal-100 via-teal-200 to-emerald-100"></div>

            <div className="text-center mb-16">
              <div className="inline-block bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                👥 Meet Our Team
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-5 tracking-tight">Meet Our Team</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                The minds behind <span className="text-teal-600 font-semibold">ShaafiMed</span> — 
                where innovation meets empathy to bring the best of Indian healthcare to the world.
              </p>
            </div>

            {/* First Section: Show 2 team members */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-14 mb-16">
              {teamMembers.slice(0, 2).map((member, index) => (
                <div
                  key={index}
                  className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-teal-100 hover:border-teal-300 p-10"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-teal-100 group-hover:ring-teal-300 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-teal-600 text-sm mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.desc}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center gap-6 text-gray-500 mt-6">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
                      <FaGithub size={20} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition">
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Section: Show 2 more team members */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-14">
              {teamMembers.slice(2, 4).map((member, index) => (
                <div
                  key={index}
                  className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-teal-100 hover:border-teal-300 p-10"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover ring-4 ring-teal-100 group-hover:ring-teal-300 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-teal-600 text-sm mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{member.desc}</p>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {member.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gradient-to-r from-teal-50 to-emerald-50 text-teal-700 px-3 py-1 rounded-full font-medium border border-teal-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-center gap-6 text-gray-500 mt-6">
                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition">
                      <FaGithub size={20} />
                    </a>
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition">
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Tagline */}
            <div className="mt-24 text-center">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full px-8 py-4 border border-teal-200">
                <FaGlobe className="text-teal-600 text-xl" />
                <p className="text-gray-800 font-medium text-lg">
                  Empowering global healthcare access — from India to the world 🌍
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}