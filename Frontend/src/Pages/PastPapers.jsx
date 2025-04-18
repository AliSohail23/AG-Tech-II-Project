import React from "react";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import Button from "../components/Button";

const PastPapers = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show loader for 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <ClimbingBoxLoader color="#2563EB" loading={true} size={15} />
      </div>
    );
  }


  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <Searchcontents />
      </div>
      <div>
        <Papercontents />
      </div>
      <br />
    </>
  );
};

function Navbar() {
  return (
    <div className="bg-[#2563EB]">
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

function Searchcontents() {
  return (
    <div className="bg-[#D5E3FC]">
      <br />
      <div
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-black flex items-center justify-center px-2 text-center"
        style={{ textShadow: "2px 2px 6px rgba(255, 255, 255, 0.8)" }}
      >
        All Past Papers
      </div>

      {/* Search Field */}
      <div className="flex flex-wrap items-end justify-around gap-4 p-4 rounded-lg shadow-md">
        <div className="relative w-full md:mx-8 mx-4">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-[#2563EB]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 md:pr-28 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#D5E4]"
            placeholder="Discrete Mathematics 3rd Semester"
            required
          />
          <button
            type="submit"
            className="cursor-pointer absolute right-2.5 bottom-2.5 text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </div>


    </div>
  );
}


function Papercontents() {
  // Dummy Values
  const uploads = [
    {
      id: 1,
      year: "2018",
      title: "IT-201 Object Oriented Programming Past Paper 2018",
      university: "Punjab University",
      image: "./Images/2018.PNG",
    },
    {
      id: 2,
      year: "2019",
      title: "IT-201 Object Oriented Programming Past Paper 2019",
      university: "University of Management & Technology",
      image: "./Images/2020.PNG",
    },
    {
      id: 3,
      year: "2021",
      title: "IT-201 Object Oriented Programming Past Paper 2021",
      university: "Punjab University",
      image: "./Images/bs 2021.PNG",
    },
    {
      id: 4,
      title: "Discrete Mathematics and Its Applications",
      university: "Kenneth Rosen",
      image: "./Images/Discrete Mathematics.jpg",
    },
    {
      id: 5,
      title: "Database Past Paper and Guess Material 3rd Semester",
      university: "PU & Other Universities",
      image: "./Images/Guess Paper.png",
    },
    {
      id: 6,
      title: "Programming Fundamentals - C++",
      university: "D.S Malik",
      image: "./Images/DS Malik C++.jpg",
    },
  ];

  return (
    <div className=" mx-auto p-4 ml-8 mr-8">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold my-3 sm:my-4 md:my-6 px-2">
        Search Result Past Paper: Discrete Mathematics 3rd Semester Course Code GE-167
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="bg-gray-100 p-3 sm:p-4 shadow-lg shadow-gray-400 rounded-xl relative flex flex-col items-center text-center transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <img
              src={upload.image}
              alt={upload.title}
              className="w-full h-36 sm:h-40 md:h-48 object-cover rounded-lg transition-all duration-300 ease-in-out transform hover:scale-110"
            />

            <h3 className="text-base sm:text-lg font-semibold my-2 line-clamp-2">{upload.title}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">{upload.university}</p>
            {/* Small & Centered Button */}
            <Button className="btn mx-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm rounded-full shadow-md hover:bg-amber-500 hover:font-bold transition-all duration-200 ease-in-out transform hover:scale-105 hover:translate-y-1 cursor-pointer">
              DOWNLOAD
            </Button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default PastPapers;
