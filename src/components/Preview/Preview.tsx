import React from "react";
import { Link } from "react-router-dom";
import MobileMockup from "../MobileMockup/MobileMockup";
import { useUserStore } from "~/zustand/store/useUserStore";
import toast from "react-hot-toast";

function Preview() {
  const { authenticateUserDetails } = useUserStore();

  //Handle copy URL
  const handleCopyLink = () => {
    const linkToCopy = `${window.location.origin}/${authenticateUserDetails?.user_name}`;

    // Copy the link to clipboard
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        toast.error("Failed to copy link.");
        console.error("Error copying link: ", err);
      });
  };

  return (
    <div className="min-h-screen  w-full mx-auto relative bg-gray-200">
      {/* Preview Header  */}
      <div className="h-[400px] rounded-b-3xl bg-indigo-600 flex items-center justify-center">
        <div className="bg-white max-w-[1440px] w-[90%] md:w-full  rounded-xl h-16 p-4 m-4 flex justify-between items-center absolute top-0">
          <Link to={"/links"}>
            <button
              className={
                "border border-violet-500 text-violet-500 px-5 hover:bg-violet-500 hover:text-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
              }
            >
              Back to Editor
            </button>
          </Link>
          <Link
            to={`/${authenticateUserDetails?.user_name}`}
            onClick={handleCopyLink}
          >
            <button
              className={
                "border border-indigo-500 hover:text-indigo-500 hover:bg-white px-5 bg-indigo-500 text-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
              }
            >
              Share link
            </button>
          </Link>
        </div>
      </div>

       {/* Preview mockup  */}
      <div
        className="w-[90%] lg:max-w-[25%]  h-[600px] shadow-md flex items-center justify-center bg-white rounded-3xl p-6 absolute top-40 right-0 left-0"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <MobileMockup showMockup={false} />
      </div>
      <div className="bg-gray-200 lg:h-[600px]"></div>
    </div>
  );
}

export default Preview;
