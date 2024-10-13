import React from "react";
import Header from "../common/Header";
import MobileMockup from "../MobileMockup/MobileMockup";
import { useParams } from "react-router-dom";

export const PublicPreview = () => {
  const { userName } = useParams(); 
  return (
    <div className="min-h-screen  w-full mx-auto relative bg-gray-200">
      <div className="h-[400px] rounded-b-3xl bg-indigo-600 flex items-center justify-center">
        <div className="bg-white max-w-[1440px] w-full rounded-xl h-16 m-4 absolute top-0">
          <Header />
        </div>
      </div>
      <div
        className="w-[90%] lg:max-w-[25%]  h-[600px] shadow-md flex items-center justify-center bg-white rounded-3xl p-6 absolute top-40 right-0 left-0"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <MobileMockup showMockup={false} userName={userName}/>
      </div>
      <div className="bg-gray-200 lg:h-[600px]"></div>
    </div>
  );
};
