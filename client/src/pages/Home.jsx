// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-blue-50 min-h-screen flex flex-col justify-center items-center text-center px-6">
//         <div className="max-w-4xl">
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
//             Find a <span className="text-blue-600">Doctor</span> And <br />
//             Book An <span className="text-blue-600">Appointment</span>
//           </h1>
//           <p className="mt-4 text-gray-600">
//             We are a team of 50+ Expert Doctors with 24/7 Service, 200+ beds,
//             Home appointments and Video Consultation.
//           </p>

//           <div className="mt-6 flex justify-center gap-4">
//             <Link
//               to="/login"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//             >
//               Make Appointment
//             </Link>
//             <button className="flex items-center gap-2 border px-6 py-3 rounded-lg hover:bg-gray-100">
//               ▶ Play Video
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* How it Works Section */}
//       <section className="py-16 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           How it Works?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-6 md:px-16">
//           <div>
//             <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="Search" className="w-16 mx-auto"/>
//             <h3 className="font-semibold mt-4">Search Doctor</h3>
//             <p className="text-gray-600">Keeping your health is our priority</p>
//           </div>
//           <div>
//             <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile" className="w-16 mx-auto"/>
//             <h3 className="font-semibold mt-4">Check Doctor Profile</h3>
//             <p className="text-gray-600">Choose from 100s of doctors</p>
//           </div>
//           <div>
//             <img src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png" alt="Schedule" className="w-16 mx-auto"/>
//             <h3 className="font-semibold mt-4">Schedule Appointment</h3>
//             <p className="text-gray-600">Book with flexible dates</p>
//           </div>
//           <div>
//             <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Solution" className="w-16 mx-auto"/>
//             <h3 className="font-semibold mt-4">Get Solution</h3>
//             <p className="text-gray-600">Receive best treatment</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;







// import { Link } from "react-router-dom";

// function Home() {
//   return (
//     <div>
//       {/* Hero Section with Background Image */}
//       <section
//         className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://i.pinimg.com/1200x/1f/50/ff/1f50ff26f906ce127ad8bf255466ad30.jpg')",
//         }}
//       >
//         {/* Add overlay to make text readable */}
//         <div className="bg-black bg-opacity-50 w-full h-full flex flex-col items-center justify-center">
//           <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
//             Find a <span className="text-blue-400">Doctor</span> And <br />
//             Book An <span className="text-blue-400">Appointment</span>
//           </h1>
//           <p className="text-gray-200 mb-6 max-w-xl">
//             We are a team of 50+ Expert Doctors with 24/7 Service, 200+ beds,
//             Home appointments and Video Consultation.
//           </p>
//           <div className="flex space-x-4">
//             <Link
//               to="/login"
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             >
//               Make Appointment
//             </Link>
//             <button className="bg-gray-200 px-6 py-2 rounded flex items-center hover:bg-gray-300">
//               ▶ Play Video
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* How it Works Section */}
//       <section className="py-16 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           How it Works?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center px-6 md:px-16">
//           <div>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
//               alt="Search"
//               className="w-16 mx-auto"
//             />
//             <h3 className="font-semibold mt-4">Search Doctor</h3>
//             <p className="text-gray-600">Keeping your health is our priority</p>
//           </div>
//           <div>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//               alt="Profile"
//               className="w-16 mx-auto"
//             />
//             <h3 className="font-semibold mt-4">Check Doctor Profile</h3>
//             <p className="text-gray-600">Choose from 100s of doctors</p>
//           </div>
//           <div>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
//               alt="Schedule"
//               className="w-16 mx-auto"
//             />
//             <h3 className="font-semibold mt-4">Schedule Appointment</h3>
//             <p className="text-gray-600">Book with flexible dates</p>
//           </div>
//           <div>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
//               alt="Solution"
//               className="w-16 mx-auto"
//             />
//             <h3 className="font-semibold mt-4">Get Solution</h3>
//             <p className="text-gray-600">Receive best treatment</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Home;








// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Left gradient angled section */}
      <div className="w-full md:w-1/2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white relative clip-diagonal flex flex-col justify-center px-10 py-16 z-10">
        <p className="uppercase text-sm mb-2 tracking-wide">Lorem Ipsum Dolor</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Your health, <br /> our priority
        </h1>
        <p className="mb-6 text-lg max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="bg-white text-cyan-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition">
          Read More
        </button>
      </div>

      {/* Right image */}
      <div className="w-full md:w-1/2">
        <img
          src="https://i.pinimg.com/736x/00/94/59/0094592376ef57c54bfa7874ee2cb315.jpg"
          alt="Doctor with patient"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Home;
