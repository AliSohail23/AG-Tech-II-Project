/* eslint-disable no-unused-vars */
import React from "react"
import JSZip from "jszip";
import { saveAs } from "file-saver";

const UploadCards = ({ upload }) => {
  // Inside your component
  const getImageSource = (subjectName) => {
    if (subjectName === "DLD" || subjectName === "Digital Logic Design") {
      return "./paperThumbnail/DLD.png";
    }
    else if (subjectName === "Calculus-I" || subjectName === "Calculus-i") {
      return "./Calculus1.png";
    }
    else if (subjectName === "Writing Workshop" || subjectName === "ENG-121" || subjectName === "writing workshop") {
      return "./writingWorkshop.png";
    }

  };


  const handleDownload = async () => {
    let paperUpload = upload.paperUpload;

    // Parse if it's a stringified array
    if (typeof paperUpload === "string" && paperUpload.startsWith("[")) {
      try {
        paperUpload = JSON.parse(paperUpload);
      } catch (error) {
        alert("Invalid paper format.");
        return;
      }
    }

    // If it's a single file, open in browser
    if (Array.isArray(paperUpload) && paperUpload.length === 1) {
      window.open(paperUpload[0], "_blank");
      return;
    }

    // If multiple files – zip and download
    if (Array.isArray(paperUpload) && paperUpload.length > 1) {
      const zip = new JSZip();

      for (let i = 0; i < paperUpload.length; i++) {
        const url = paperUpload[i];
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const filename = `paper_${i + 1}.pdf`;
          zip.file(filename, blob);
        } catch (err) {
          console.error("Failed to fetch file:", url, err);
        }
      }

      zip.generateAsync({ type: "blob" }).then((content) => {
        saveAs(content, "papers.zip");
      });
    }

    // Fallback
    else if (typeof paperUpload === "string") {
      window.open(paperUpload, "_blank");
    } else {
      alert("No valid paper found.");
    }
  };



  return (
    <div className="w-full max-w-sm h-[380px] bg-gray-100 p-4 shadow-lg shadow-gray-400 rounded-xl flex flex-col justify-between text-center transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer">


      <div className="relative">
        <img
          src={upload.paperThumbnail ? upload.paperThumbnail : getImageSource(upload.subjectName)}
          alt={upload.subjectName}
          className="w-full h-48 object-cover rounded-lg"
        />
        <span
          className={`absolute top-2 right-1 text-white px-2 py-1 rounded-full text-xs sm:text-sm shadow-xl shadow-gray-400 ${upload.paperUnsolved === "Unsolved" ? "bg-red-500" : "bg-green-500"
            }`}
        >
          {upload.paperUnsolved === "Unsolved" ? "Unsolved" : "Unsolved"}
        </span>
      </div>



      {/* Text Content */}
      <div className="mt-3 flex flex-col items-center flex-grow gap-2 lg:gap-1">
        {/* Conditionally display subjectName.title if it's available */}
        <h3
          className={`font-semibold line-clamp-2 
            ${upload.subjectName === "Programming Fundamentals 17 to 21" || upload.subjectName === "Calculus-II 17 to 21" || upload.subjectName === "Electricity and Magnetism 17 to 21" || upload.subjectName === "Thermodynamics and Kinetic Theory" || upload.subjectName === "Fundamentals of Programming"
            ? "text-[5px] sm:text-base"
            : "text-base sm:text-lg"
            }`}
        >
          {upload.subjectName ? upload.subjectName : "Subject Name Not Available"}
        </h3>

        {/* Conditionally display universityName.university if it's available */}
        <p className="text-md sm:text-sm text-[#102E50] font-mono line-clamp-1">
          {upload.universityName ? upload.universityName : "University Not Available"}
        </p>
        <div className="flex gap-2">
          <p className="text-md font-bold sm:text-sm text-gray-600 line-clamp-1">
            {upload.courseCode ? upload.courseCode : "Course Code"}
          </p>
          <p className="text-md font-bold sm:text-sm text-gray-600 line-clamp-1">
            {upload.year ? upload.year : "No Year"}
          </p>
        </div>

      </div>
      {/* Button */}
      <button
        onClick={handleDownload}
        className="cursor-pointer btn mx-auto mt-4 mb-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm rounded-full shadow-md hover:bg-amber-500 hover:font-bold transition-all duration-200 ease-in-out transform hover:scale-105 hover:translate-y-1">
        DOWNLOAD
      </button>
    </div>
  );
};


export default UploadCards;