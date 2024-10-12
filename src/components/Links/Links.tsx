import { useState } from "react";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import { IUserPlatformList } from "~/interface/platform";
import { toast } from "react-hot-toast";
import LinkBox from "../ui/LinkBox";
import MobileMockup from "../MobileMockup/MobileMockup";
import Modal from "../ui/Modal";
import { useLinkStore } from "~/zustand/store/useLinkStore";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetcher } from "~/zustand/api";
import Spinner from "../ui/Spinner";
import { IoMdClose } from "react-icons/io";
import PrimaryButton from "../ui/PrimaryBtn";

function Links() {
  const [isUnsaved, setIsUnsaved] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    linkList,
    allLinkLists,
    setLinkList,
    setAllLinkLists,
    addLink,
    updatedLinkList,
  } = useLinkStore();
  const [selectedLink, setSelectedLink] = useState<IUserPlatformList | null>(
    null
  );
  const [eventFrom, setEventFrom] = useState<string | null>(null);

  const queryClient = useQueryClient();

  // Use React Query to fetch the links from the backend
  const { data, error, isLoading } = useQuery(
    "links",
    async () =>
      fetcher("/links", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    {
      onSuccess: (data) => {
        setAllLinkLists(data);
      },
    }
  );

  if (error) {
    toast.error((error as Error).message);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // handle form validation
  const validateForm = (linkList: IUserPlatformList) => {
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

  // Mutation for saving a new link
  const mutation = useMutation(
    async (linkData: IUserPlatformList) =>
      fetcher("/save-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(linkData),
        credentials: "include",
      }),
    {
      onSuccess: (newLink) => {
        // Update Zustand state and refetch data upon successful mutation
        addLink(newLink); // Update Zustand store with the new link
        queryClient.invalidateQueries("links"); // Invalidate and refetch 'links' query
        toast.success("Link saved successfully!"); // Show success notification
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to save link");
      },
    }
  );

  //Mutation for delete a link
  const mutationForDelete = useMutation(
    async (id: string) =>
      fetcher(`/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }),
    {
      onSuccess: () => {
        // Show success notification
        toast.success("Link deleted successfully");
        closeModal();
        // Invalidate and refetch the "links" query to ensure UI updates with the new data
        queryClient.invalidateQueries("links");
      },
      onError: (error: Error) => {
        // Handle error
        toast.error(error.message || "Failed to delete the link");
      },
    }
  );

  const mutationForUpdate = useMutation(
    async ({
      id,
      updatedLinkList,
    }: {
      id: string;
      updatedLinkList: IUserPlatformList | null;
    }) => {
      return fetcher(`/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedLinkList),
        credentials: "include",
      });
    },
    {
      onSuccess: () => {
        // Show success notification
        toast.success("Link updated successfully");
        // Invalidate and refetch the "links" query to ensure UI updates with the new data
        queryClient.invalidateQueries("links");
        closeModal(); // Assuming this function is available in your context to close any modals
      },
      onError: (error: Error) => {
        // Handle error
        toast.error(error.message || "Failed to update the link");
      },
    }
  );

  //Save link
  const handleSave = async () => {
    if (validateForm(linkList)) {
      mutation.mutate(linkList as IUserPlatformList);
      setIsUnsaved(false);
      setLinkList(null);
    }
  };
  const { isLoading: isSaving } = mutation;
  const { isLoading: isDeleteing } = mutationForDelete;
  const { isLoading: isUpdating } = mutationForUpdate;

  const handleChange = (e: string) => {
    setLinkList({
      ...(linkList || null),
      platform_url: e,
    });
  };

  //Handle remove links locally
  const handleRemove = (list: IUserPlatformList) => {
    if (list?._id) {
      setSelectedLink(list);
      setEventFrom("delete");
      openModal();
    } else {
      setLinkList(null);
      setIsUnsaved(false);
    }
  };

  const handleEdit = (list: IUserPlatformList) => {
    setSelectedLink(list);
    setEventFrom("edit");
    openModal();
  };

  const handleDeleteLinkFromDB = (id: string) => {
    if (id) {
      mutationForDelete.mutate(id);
    }
  };

  const handleUpdateInDB = (id: string) => {
    const platformPattern = new RegExp(
      `^https:\\/\\/(www\\.)?${
        updatedLinkList?.platform_name
          ? updatedLinkList?.platform_name
          : selectedLink?.platform_name
      }\\.com\\/[A-Za-z0-9_-]+`
    );

    if (id && updatedLinkList) {
      // if(updatedLinkList?.platform_name &&  )
      mutationForUpdate.mutate({ id, updatedLinkList });
    } else {
      toast.error("You must make some changes");
    }
  };

  return (
    <div className="flex md:justify-center items-start gap-5 py-5">
      <div className="w-1/3 flex h-auto items-center justify-center bg-white rounded-2xl p-6 relative hide-in-mobile">
        <MobileMockup />
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
        {isLoading || isUpdating ? (
          <>
            <div role="status" className="animate-pulse mt-10">
              <div className="h-[200px] bg-gray-100 rounded-2xl w-full mb-4"></div>
            </div>
            <div role="status" className="animate-pulse mt-10">
              <div className="h-[200px] bg-gray-100 rounded-2xl w-full mb-4"></div>
            </div>
          </>
        ) : (
          <div className="">
            {linkList && (
              <>
                <LinkBox
                  index={allLinkLists?.length}
                  list={linkList}
                  handleChange={handleChange}
                  handleRemove={() => handleRemove(linkList)}
                  handleEdit={() => handleEdit(linkList)}
                  isSaved={false}
                />
                <div className="border-t border-gray-200 w-full mt-5 flex justify-end items-center">
                  <PrimaryButton
                    onClick={handleSave}
                    isLoading={isSaving}
                    className="mt-5"
                  >
                    <p>Save</p>
                  </PrimaryButton>
                </div>
              </>
            )}
            {allLinkLists?.length > 0 || linkList ? (
              allLinkLists?.map((list: IUserPlatformList, i: number) => (
                <LinkBox
                  key={i}
                  index={i}
                  list={list}
                  handleChange={handleChange}
                  handleRemove={() => handleRemove(list)}
                  handleEdit={() => handleEdit(list)}
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
        )}
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header={
          <div className="flex justify-between items-center">
            <h2 className="capitalize text-xl text-gray-800 font-bold">
              {eventFrom} link
            </h2>
            <div
              onClick={closeModal}
              className="hover:bg-gray-200 w-8 h-8 p-1 flex items-center justify-center cursor-pointer rounded-md"
            >
              <IoMdClose />
            </div>
          </div>
        }
        footer={
          <div className="flex gap-2 mt-2">
            <button
              className="bg-white border border-gray-200 shadow hover:bg-gray-200 text-gray-800 transition-all duration-300 font-medium px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
            {eventFrom === "delete" ? (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={() => handleDeleteLinkFromDB(selectedLink?._id)}
              >
                {isDeleteing ? <Spinner /> : "Delete"}
              </button>
            ) : (
              <PrimaryButton
                onClick={() => handleUpdateInDB(selectedLink?._id)}
                isLoading={isUpdating}
              >
                <p>Save</p>
              </PrimaryButton>
            )}
          </div>
        }
        modalContent={
          eventFrom === "delete" ? (
            <div className="h-16 py-3 text-center">
              <p>Are you sure you want to delete this item?</p>
            </div>
          ) : eventFrom === "edit" ? (
            <div className="my-2">
              <LinkBox
                index={null}
                list={selectedLink}
                handleChange={handleChange}
                handleRemove={null}
                handleEdit={null}
                isSaved={true}
                changeView={true}
              />
            </div>
          ) : undefined
        }
      />
    </div>
  );
}

export default Links;
