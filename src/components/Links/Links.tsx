import React, { useEffect, useState } from "react";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import { IUserPlatformList } from "~/interface/platform";
import { toast } from "react-hot-toast";
import LinkBox from "../ui/LinkBox";
import MobileMockup from "../MobileMockup/MobileMockup";
import Modal from "../ui/Modal";

function Links() {
  const [linkList, setLinkList] = useState<IUserPlatformList | null>(null);

  const [allLinkLists, setAllLinkList] = useState<IUserPlatformList[] | null>(
    null
  );
  const [isUnsaved, setIsUnsaved] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Send the new link data to the backend API
        const response = await fetch("http://localhost:5001/api/links", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          // Successfully saved link to the database
          toast.success("Link saved successfully!");

          // Optionally, update local state or re-fetch data from the database
          setAllLinkList(data);
          setLinkList(null);
          setIsUnsaved(false);
        } else {
          // Show an error message if the request failed
          toast.error(data.message || "Failed to save link.");
        }
      } catch (error) {
        console.error("Failed to save link:", error);
        toast.error("Failed to save link. Please try again.");
      }
    };
    fetchData();
    const prevLists: IUserPlatformList[] = JSON.parse(
      localStorage.getItem("savedLinkLists") || "[]"
    );
    if (prevLists) {
      setAllLinkList(prevLists);
    }
  }, []);

  // handle form validation
  const validateForm = () => {
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

    // Get the selected platform's name in lowercase
    const platformName = linkList?.platform_name.toLowerCase();

    // Dynamically create the regular expression using the RegExp constructor
    const platformPattern = new RegExp(
      `^https:\\/\\/(www\\.)?${platformName}\\.com\\/[A-Za-z0-9_-]+`
    );

    if (platformPattern && !platformPattern.test(linkList?.platform_url)) {
      toast.error(`Please enter a valid ${platformName} URL.`);
      return false;
    }

    // If all validations pass
    return true;
  };

  // Handle adding new links to the list
  const handleAddNewLink = () => {
    if (!isUnsaved) {
      setLinkList({ platform_name: null, platform_url: null });
      setIsUnsaved(true);
    } else {
      toast.error("Please save the current link before adding a new one.");
    }
  };

  //Save link
  const handleSave = async () => {
    if (validateForm()) {
      const newLinkList = linkList as IUserPlatformList;

      try {
        // Send the new link data to the backend API
        const response = await fetch("http://localhost:5001/api/save-link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newLinkList),
        });

        const data = await response.json();

        if (response.ok) {
          // Successfully saved link to the database
          toast.success("Link saved successfully!");

          // Optionally, update local state or re-fetch data from the database
          setAllLinkList((prevLinks) => [...(prevLinks || []), newLinkList]);
          setLinkList(null);
          setIsUnsaved(false);
        } else {
          // Show an error message if the request failed
          toast.error(data.message || "Failed to save link.");
        }
      } catch (error) {
        console.error("Failed to save link:", error);
        toast.error("Failed to save link. Please try again.");
      }

      // Retrieve previous saved items from localStorage, if any
      const prevItems: IUserPlatformList[] = JSON.parse(
        localStorage.getItem("savedLinkLists") || "[]"
      );

      // Save to localStorage
      localStorage.setItem(
        "savedLinkLists",
        JSON.stringify([...prevItems, newLinkList])
      );

      setIsUnsaved(false); // Mark as saved
      toast.success("Link saved successfully!");
      setLinkList(null);
    }
  };

  //Handle on change for input
  const handleChange = (e: string) => {
    setLinkList((prev) => ({
      ...prev,
      platform_url: e,
    }));
  };

  //Handle remove links locally
  const handleRemove = () => {
    // setLinkList(null);
    // setIsUnsaved(false);
    openModal();
  };

  return (
    <div className="flex md:justify-center items-start gap-5 py-5">
      <div className="w-[30%] flex h-[750px] items-center justify-center bg-white rounded-2xl p-6 relative hide-in-mobile">
        <MobileMockup isSaved={!isUnsaved} />
      </div>
      <div className="lg:w-2/3 w-full h-full bg-white rounded-2xl p-8">
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
          disabled={isUnsaved}
          className={
            "border border-violet-500 text-violet-500 w-full mt-8 px-5 hover:bg-violet-500 hover:text-white transition duration-300 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 text-sm"
          }
        >
          + Add new link
        </button>

        {/* Main Link Box  */}
        <div className="">
          {linkList && (
            <>
              <LinkBox
                index={allLinkLists?.length}
                list={linkList}
                handleChange={handleChange}
                handleRemove={handleRemove}
                setLinkList={setLinkList}
                isSaved={false}
              />
              <div className="border-t border-gray-200 w-full mt-5 flex justify-end items-center">
                <button
                  onClick={handleSave}
                  className={
                    "border border-violet-500 hover:text-violet-500 px-5 hover:bg-white  bg-violet-600 text-white transition duration-300 py-2 rounded-lg text-sm font-semibold mt-5"
                  }
                >
                  Save
                </button>
              </div>
            </>
          )}
          {allLinkLists?.length > 0 || linkList ? (
            allLinkLists?.map((list: IUserPlatformList, i: number) => (
              <LinkBox
                index={i}
                list={list}
                handleChange={handleChange}
                handleRemove={handleRemove}
                setLinkList={setLinkList}
                isSaved={true}
              />
            ))
          ) : (
            <div className="border-[2px] border-dotted border-gray-300 rounded-lg w-full h-[400px] mt-6 flex flex-col items-center justify-center text-gray-400">
              <LinkLogo size={60} />
              <p className="text-sm font-medium">Link box is empty!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header={
          <div>
            <p>Header</p>
          </div>
        }
        footer={
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={closeModal}
          >
            Close
          </button>
        }
        modalContent={<div>Hello world</div>}
      />
    </div>
  );
}

export default Links;
