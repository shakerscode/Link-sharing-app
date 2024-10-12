import mobileMoc from "~/assets/images/mobile-img.png";
import { platforms } from "~/constants/platfrom";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IUserInfo } from "~/interface/user.info";
import { useLinkStore } from "~/zustand/store/useLinkStore";
import { useUserStore } from "~/zustand/store/useUserStore";

function MobileMockup({ showMockup = true }: { showMockup?: boolean }) {
  const { allLinkLists } = useLinkStore();
  const { authenticateUserDetails: uInfo } = useUserStore();

  const arr = [1, 2, 3, 4];
  const array = Array.from(
    { length: arr?.length - allLinkLists?.length },
    (_, i) => i + 1
  );

  return (
    <>
      <div
        className={`h-[600px] rounded-[34px] ${
          showMockup ? "border-[1.5px] w-[80%]" : "border-none w-full"
        } relative border-gray-300 p-2.5`}
      >
        {showMockup && (
          <div
            className="w-4 h-4 border-[1.5px] border-gray-300 rounded-full absolute top-2 bg-gray-800"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
            }}
          ></div>
        )}
        <div
          className="w-full h-full absolute p-5 flex flex-col items-center justify-center"
          style={{
            left: "50%",
            top: "5%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
            <img src={uInfo?.imageUrl} alt="" />
          </div>
          {uInfo?.first_name || uInfo?.last_name ? (
            <h6 className="text-2xl font-bold text-gray-700 mt-5">
              {uInfo?.first_name} {uInfo?.last_name}
            </h6>
          ) : (
            <div className="w-2/3 h-6 mt-8 rounded-full bg-gray-200"></div>
          )}
          {uInfo?.email ? (
            <p className="text-sm text-gray-400 font-normal mt-1">
              {uInfo?.email}
            </p>
          ) : (
            <div className="w-1/3 h-4 mt-4 rounded-full bg-gray-200"></div>
          )}
          <div className={"mt-2"}></div>
          <div className="w-full overflow-y-scroll h-[280px] hide-scrollbar">
            {allLinkLists?.length > 0 &&
              allLinkLists?.map((list, i) => (
                <Link
                  to={list?.platform_url}
                  target="_blank"
                  className="w-full"
                  key={i}
                >
                  <div
                    className={`w-full flex items-center transition-all duration-300 px-5 cursor-pointer mt-4 h-12 rounded-xl ${
                      list?.platform_name?.toLowerCase() === "github"
                        ? "bg-gray-900 hover:bg-gray-700"
                        : list?.platform_name?.toLowerCase() === "linkedin"
                        ? "bg-blue-500 hover:bg-blue-400"
                        : list?.platform_name?.toLowerCase() === "youtube"
                        ? "bg-red-600 hover:bg-red-500"
                        : list?.platform_name?.toLowerCase() === "twitter"
                        ? "bg-sky-500 hover:bg-sky-400"
                        : ""
                    }`}
                  >
                    {platforms?.find(
                      (platform) => platform?.name === list?.platform_name
                    )?.icon && (
                      <span className="mr-2 text-white">
                        {
                          platforms?.find(
                            (platform) => platform?.name === list?.platform_name
                          )?.icon
                        }
                      </span>
                    )}
                    <p className="text-white text-sm">{list?.platform_name}</p>
                    <IoMdArrowForward className="flex-end flex ml-auto text-white" />
                  </div>
                </Link>
              ))}

            {array.map((_, i: number) => (
              <div
                key={i}
                className="w-full mt-4 h-12 rounded-xl bg-gray-200"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMockup;
