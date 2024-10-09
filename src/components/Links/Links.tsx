import React, { useEffect, useRef, useState } from "react";
import { FaGripLines } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import LinkIcon from "~/assets/icons/LinkIcon";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import { platforms } from "~/constants/platfrom";
import { IPlatform, IUserPlatformList } from "~/interface/platform";
import { toast } from "react-hot-toast";

function Links() {
  const [selectedPlatform, setSelectedPlatform] = useState<IPlatform | null>(
    null
  );
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [linkList, setLinkList] = useState<IUserPlatformList | null>(null);
  const [savedLinkLists, setSavedLinkList] = useState<
    IUserPlatformList[] | null
  >(null);

  // Reference to the dropdown container
  const dropdownRef = useRef(null);

  //handler for closing dropdown when we click outside of the button
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  //effect that handle dropdown closing handler
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handle form validation
  const validateForm = () => {
    if (savedLinkLists?.length === 0 || savedLinkLists === null) {
      toast.success("Link box generated");
      return true;
    }
    if (!linkList) {
      toast.error("You must save the current platform");
      return false;
    }
    if (!linkList?.platform_name) {
      toast.error("Please select a platform.");
      return false;
    }
    if (!linkList?.platform_url) {
      toast.error("Please select a valid url.");
      return false;
    }
  };

  // Handle adding new links to the list
  const handleAddNewLink = () => {
    if (validateForm()) {
      setSavedLinkList((prev) => [
        ...(prev || []),
        { platform_name: null, platform_url: null },
      ]);
    }
  };

  return (
    <div className="flex items-start gap-5 py-5">
      <div className="w-1/3 min-h-[85vh] h-full bg-white rounded-2xl p-6"></div>
      <div className="w-2/3 h-full bg-white rounded-2xl p-8">
        {/* Link box header  */}
        <div className="my-3">
          <h2 className="text-3xl font-bold text-zinc-900">
            Customize your links
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>

        {/* Link box creator action  */}
        <button
          onClick={handleAddNewLink}
          className={
            "border border-violet-500 text-violet-500 w-full mt-8 px-5 hover:bg-violet-500 hover:text-white transition duration-300 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 text-sm"
          }
        >
          + Add new link
        </button>

        {/* Main Link Box  */}
        <div className="">
          {savedLinkLists?.length > 0 ? (
            savedLinkLists?.map((_: unknown, i: number) => (
              <div key={i} className="mt-5 bg-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-start gap-1.5">
                    <FaGripLines className="text-gray-400 text-xs" />
                    <p className="text-sm font-semibold text-gray-500">
                      Link <strong>#{i + 1}</strong>
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSavedLinkList((prev) => {
                        const newLinkList = [...(prev || [])]; // Copy the array
                        newLinkList.splice(i, 1); // Remove the item at index `i`
                        return newLinkList; // Return the updated list
                      })
                    }
                    className="text-neutral-400 cursor-pointer text-sm hover:text-gray-500 transition-all duration-300"
                  >
                    Remove
                  </button>
                </div>

                {/* Platform selection box  */}
                <div className="w-full mx-auto mt-4 relative">
                  <label
                    htmlFor="platform"
                    className="block text-gray-500 text-xs font-medium mb-1 w-fit"
                  >
                    Platform
                  </label>

                  {/* Custom Select Input */}
                  <button
                    id="platform"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center w-full px-4 py-3 text-sm border border-gray-200 rounded-md  bg-white focus:outline-none  justify-between"
                  >
                    {/* Display the selected platform's icon and name */}
                    {selectedPlatform ? (
                      <div className="flex items-center text-gray-700">
                        {selectedPlatform && selectedPlatform.icon}
                        <span>{selectedPlatform.name}</span>
                      </div>
                    ) : (
                      <p className="text-gray-400">Select a platform</p>
                    )}
                    {/* Dropdown arrow icon */}
                    <IoChevronDownOutline size={16} className="text-gray-500" />
                  </button>

                  {/* Options Dropdown */}
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute mt-1 w-full rounded-md shadow-xl bg-white border border-gray-200 z-10"
                    >
                      <ul className="max-h-60 overflow-auto focus:outline-none p-3 flex flex-col gap-1">
                        {platforms.map((platform, index) => (
                          <li
                            key={index}
                            onClick={() => {
                              setSelectedPlatform(platform);
                              setDropdownOpen(false);
                            }}
                            className={`flex items-center rounded-md p-2 cursor-pointer hover:bg-gray-200 text-gray-700 text-sm ${
                              selectedPlatform?.name === platform.name
                                ? "bg-gray-200"
                                : ""
                            }`}
                          >
                            {platform.icon}
                            <span>{platform.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Link input  */}
                <div className="mt-2">
                  <label className="block font-medium text-gray-500 text-xs mb-1 w-fit">
                    Link
                  </label>

                  <div className="w-full text-sm border border-gray-200 rounded-md  bg-white focus:outline-none overflow-hidden flex items-center justify-center">
                    <div className="w-10 h-full flex items-center justify-center text-gray-500">
                      <LinkIcon size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder={`https://www.${
                        selectedPlatform
                          ? selectedPlatform?.name?.toLowerCase()
                          : "twitter"
                      }.com/@jhon_doe`}
                      className="w-full pr-4 py-3 focus:outline-none"
                    />
                    {/* Icon inside input  */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border-[2px] border-dotted border-gray-300 rounded-lg w-full h-[400px] mt-6 flex flex-col items-center justify-center text-gray-400">
              <LinkLogo size={60} />
              <p className="text-sm font-medium">Link box is empty!</p>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 w-full mt-5 flex justify-end items-center">
          <button
            className={
              "border border-violet-500 hover:text-violet-500 px-5 hover:bg-white  bg-violet-600 text-white transition duration-300 py-2 rounded-lg text-sm font-semibold mt-5"
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Links;
