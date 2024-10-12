import { useState } from "react";
import MobileMockup from "../MobileMockup/MobileMockup";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { CiImageOn } from "react-icons/ci";
import userImg from "~/assets/images/user.jpg";
import { IUserInfo } from "~/interface/user.info";

const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB
const ALLOWED_FORMATS = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/bmp": [".bmp"],
};

function ProfileDetails() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(userImg);
  const [userDetails, setUserDetails] = useState<IUserInfo | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("File is too large. Maximum size is 1MB.");
      return;
    }

    // Check file format
    if (!ALLOWED_FORMATS[file.type]) {
      toast.error("Invalid file format. Only PNG, JPG, and BMP are allowed.");
      return;
    }

    // Set the image and create a preview URL
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    toast.success("Image uploaded successfully!");
  };

  // Dropzone setup
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: ALLOWED_FORMATS,
    maxSize: MAX_IMAGE_SIZE,
    multiple: false,
  });

  const validateInfo = () => {
    if (!userDetails?.first_name) {
      toast.error("First name is required");
      return false;
    }
    if (!userDetails?.last_name) {
      toast.error("Last name is required");
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validateInfo()) {
      localStorage.setItem("uInfo", JSON.stringify(userDetails));
      setIsSaved(true);
    }
  };

  return (
    <div className="flex items-start gap-5 py-5">
      <div className="w-1/3 flex h-auto items-center justify-center bg-white rounded-2xl p-6 relative hide-in-mobile">
        <MobileMockup />
      </div>
      <div className="w-full lg:w-2/3 h-full bg-white rounded-2xl p-8">
        {/* Profile box header  */}
        <div className="my-3">
          <h2 className="text-3xl font-bold text-zinc-900">Profile details</h2>
          <p className="text-sm text-neutral-400 mt-2">
            Add your details to create a personal touch to your profile
          </p>
        </div>

        <div className="mt-8 bg-gray-100 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <p className="w-1/3 text-gray-400 text-sm font-medium mb-1">
            Profile picture
          </p>
          <div className="w-full lg:w-2/3 flex flex-col lg:flex-row mt-3 md:mt-0 items-center lg:gap-6">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              {...getRootProps({
                className: `w-44 h-44 cursor-pointer relative overflow-hidden border bg-gray-300 rounded-lg cursor-pointer flex items-center justify-center ${
                  isDragActive ? "bg-gray-200" : ""
                }`,
              })}
            >
              <input {...getInputProps()} />
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Profile"
                  className={`w-full h-full object-cover rounded-lg transition-all duration-300 ${
                    isHovered ? "brightness-50" : "brightness-100"
                  }`}
                />
              ) : (
                <p className="text-gray-400 text-xs text-center">
                  Drag & drop or click <br /> to upload
                </p>
              )}
              {isHovered && (
                <div className="absolute top-0 right-0 flex flex-col gap-2 items-center justify-center w-full h-full bg-transparent">
                  <CiImageOn className="text-xl text-white" />
                  <p className="text-sm text-white">Change image</p>
                </div>
              )}
            </div>
            <p className="w-auto text-center lg:text-start mt-3 lg:mt-0 text-gray-400 text-xs font-medium mb-1">
              Image must be below 1024x1024 px <br />
              Use PNG, JPG BMP and format
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-100 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex flex-col items-start lg:flex-row lg:items-center">
            <p className="w-1/3 text-gray-400 text-sm font-medium mb-1">
              First name*
            </p>
            <input
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  first_name: e.target.value,
                }))
              }
              required
              placeholder="Jhon Doe"
              className="w-full lg:w-2/3 bg-white p-3 transition-all duration-300 text-sm border-[1.5px] hover:shadow-xl hover:shadow-violet-200 border-violet-500 focus:outline-none rounded-lg"
            />
          </div>
          <div className="flex flex-col items-start lg:flex-row lg:items-center">
            <p className="w-1/3 text-gray-400 text-sm font-medium mb-1">
              Last name*
            </p>
            <input
              required
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  last_name: e.target.value,
                }))
              }
              placeholder="Doe"
              className="w-full lg:w-2/3 bg-white p-3 transition-all duration-300 text-sm border-[1.5px] hover:shadow-xl hover:shadow-violet-200 border-violet-500 focus:outline-none rounded-lg"
            />
          </div>
          <div className="flex flex-col items-start lg:flex-row lg:items-center">
            <p className="w-1/3 text-gray-400 text-sm font-medium mb-1">
              Email
            </p>
            <input
              onChange={(e) =>
                setUserDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="youremail@email.com"
              className="w-full md:w-2/3 bg-white p-3 transition-all duration-300 text-sm border-[1.5px] hover:shadow-xl hover:shadow-violet-200 border-violet-500 focus:outline-none rounded-lg"
            />
          </div>
        </div>
        <div className="border-t border-gray-200 w-full mt-5 lg:mt-28 flex justify-end items-center">
          <button
            onClick={handleSave}
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

export default ProfileDetails;
