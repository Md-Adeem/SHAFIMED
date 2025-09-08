
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
