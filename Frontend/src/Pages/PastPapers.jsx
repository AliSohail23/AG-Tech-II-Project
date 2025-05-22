import React from "react";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

import UploadCards from "../components/UploadCards";
import axios from "axios";
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
  const [uploads, setUploads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://ag-tech-ii-project-x1sa.vercel.app/api/pastPapers");
        console.log("Fetched Data:", res.data);
        setUploads(res.data.data); // Make sure data is an array
      } catch (error) {
        console.error("Error fetching papers:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const totalPages = Array.isArray(uploads)
    ? Math.ceil(uploads.length / itemsPerPage)
    : 0;

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const currentUploads = Array.isArray(uploads)
    ? uploads.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div className="mx-auto p-6 max-w-7xl">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold my-3 sm:my-4 md:my-6 px-2">
        Search Result Past Paper: Discrete Mathematics 3rd Semester Course Code
        GE-167
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10">
        {currentUploads.map((upload) => (
          <UploadCards key={upload._id || upload.id} upload={upload} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PastPapers;
