import React, { useState, useRef, FC, useEffect } from "react";
import { FaGripLines } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import LinkIcon from "~/assets/icons/LinkIcon";
import { platforms } from "~/constants/platfrom";
import { IUserPlatformList } from "~/interface/platform";

interface LinkBoxProps {
  index: number;
  list: IUserPlatformList;
  handleChange: (value: string) => void;
  handleRemove: () => void;
  setLinkList: React.Dispatch<React.SetStateAction<IUserPlatformList | null>>;
  isSaved: boolean;
}

const LinkBox: FC<LinkBoxProps> = ({
  index,
  list,
  handleChange,
  handleRemove,
  setLinkList,
  isSaved,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(
    list?.platform_name
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="mt-5 bg-gray-100 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-1.5">
          <FaGripLines className="text-gray-400 text-xs" />
          <p className="text-sm font-semibold text-gray-500">
            Link <strong>#{index + 1}</strong>
          </p>
        </div>
        <div className="flex items-center gap-1 text-neutral-400">
          {isSaved && (
            <button
              className="text-neutral-400 cursor-pointer text-sm hover:text-gray-500 transition-all duration-300"
              onClick={handleRemove}
            >
              Edit
            </button>
          )}
          {isSaved && <div className="h-4 w-[1.5px] bg-gray-400"></div>}
          <button
            className="text-neutral-400 cursor-pointer text-sm hover:text-gray-500 transition-all duration-300"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>

      {/* Platform selection box */}
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
          disabled={isSaved}
          onClick={() => setDropdownOpen((prev) => !prev)}
          className={`flex items-center w-full px-4 py-3 text-sm border border-gray-200 rounded-md bg-white focus:outline-none justify-between #`}
        >
          {/* Display the selected platform's icon and name */}
          {list?.platform_name ? (
            <div className="flex items-center text-gray-700">
              {platforms?.find(
                (platform) => platform?.name === list?.platform_name
              )?.icon && (
                <span className="mr-2">
                  {
                    platforms?.find(
                      (platform) => platform?.name === list?.platform_name
                    )?.icon
                  }
                </span>
              )}
              <span>{list?.platform_name}</span>
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
                    setSelectedPlatform(platform.name);
                    setDropdownOpen(false);
                    setLinkList((prev) => ({
                      ...prev,
                      platform_name: platform?.name,
                    }));
                  }}
                  className={`flex items-center gap-2 rounded-md p-2 cursor-pointer hover:bg-gray-200 text-gray-700 text-sm ${
                    selectedPlatform === platform.name ? "bg-gray-200" : ""
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

      {/* Link input */}
      <div className="mt-2">
        <label className="block font-medium text-gray-500 text-xs mb-1 w-fit">
          Link
        </label>

        <div className="w-full text-sm border border-gray-200 rounded-md bg-white focus:outline-none overflow-hidden flex items-center justify-center">
          <div className="w-10 h-full flex items-center justify-center text-gray-500">
            <LinkIcon size={16} />
          </div>
          <input
           disabled={isSaved}
            onChange={(e) => handleChange(e.target.value)}
            defaultValue={list?.platform_url ? list?.platform_url : ""}
            type="text"
            placeholder={`https://www.${
              selectedPlatform ? selectedPlatform?.toLowerCase() : "twitter"
            }.com/@jhon_doe`}
            className="w-full pr-4 py-3 focus:outline-none bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default LinkBox;
