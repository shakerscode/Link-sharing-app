import toast from "react-hot-toast";
import { HiLogin, HiOutlineLogout } from "react-icons/hi";
import { IoMdPersonAdd } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import { navLinks } from "~/constants/navLinks";
import { useAuth } from "~/hooks/useAuth";
import { INav } from "~/interface/navInterface";
import { fetcher } from "~/zustand/api";
import { useLinkStore } from "~/zustand/store/useLinkStore";
import { useUserStore } from "~/zustand/store/useUserStore";
import Spinner from "../ui/Spinner";
import Cookies from "js-cookie";

export default function Header() {
  const location = useLocation();
  const isAuthenticated = useAuth();
  const { setIsAuthenticated, setAuthenticatedUserDetails } = useUserStore();
  const navigate = useNavigate();
  const { setAllLinkLists } = useLinkStore();

  // Mutation for saving a new link
  const mutation = useMutation(
    async () =>
      fetcher("/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include credentials to send cookies
      }),
    {
      onSuccess: () => {
        // Clear user session (you may use Zustand or Context API)
        setAuthenticatedUserDetails(null);
        setIsAuthenticated(null);
        setAllLinkLists([]);
        Cookies.remove("frontendToken");
        toast.success("Logout successfully!");

        // Redirect to home or login page
        navigate("/sign-in"); // Assuming you're using react-router
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to log out");
      },
    }
  );

  //handle logout
  const handleLogout = () => {
    mutation?.mutate();
  };

  const { isLoading } = mutation;

  return (
    <div className="bg-white rounded-2xl h-16 p-4 flex justify-between items-center">
      {/* logo  */}
      <Link to={"/"}>
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="text-violet-600 hidden md:block">
            {/* imported svg logo from icon folder  */}
            <LinkLogo size={32} />
          </div>
          <div className="text-violet-600 block md:hidden">
            {/* imported svg logo from icon folder  */}
            <LinkLogo size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 hide-name">
            devlinks
          </h2>
        </div>
      </Link>

      {/* menu  */}
      <div className="flex items-center gap-1 lg:gap-2">
        {navLinks?.map((link: INav, i: number) => (
          <Link key={i} to={link?.path}>
            <button
              className={`${
                link?.path === location?.pathname
                  ? "bg-violet-100 text-violet-500"
                  : "bg-none text-gray-500"
              } px-5 md:px-3 lg:px-4 hover:bg-violet-100 hover:text-violet-500 transition-all duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5`}
            >
              {link?.icon}
              <p className="hide-name">{link?.title}</p>
            </button>
          </Link>
        ))}
      </div>

      {/* action btn  */}
      <div className="flex gap-2">
        {isAuthenticated && <Link to={"/preview"}>
          <button
            className={
              "border border-violet-500 text-violet-500 px-3 md:px-5 hover:bg-violet-500 hover:text-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
            }
          >
            <MdOutlineRemoveRedEye className="block md:hidden text-xl" />

            <p className="hide-name">Preview</p>
          </button>
        </Link>}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className={
              "border border-violet-500 text-white px-3 lg:px-5 bg-violet-500 hover:text-violet-500 hover:bg-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
            }
          >
            {!isLoading && (
              <HiOutlineLogout className="block md:hidden text-xl" />
            )}

            {isLoading ? <Spinner /> : <p className="hide-name">Log out</p>}
          </button>
        ) : (
          <>
            <Link to={"/sign-in"}>
              <button
                className={
                  "border border-violet-500 text-white  px-3 lg:px-5 bg-violet-500 hover:text-violet-500 hover:bg-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                }
              >
                <HiLogin className="block md:hidden text-xl" />

                <p className="hide-name">Sign in</p>
              </button>
            </Link>
            <Link to={"/sign-up"}>
              <button
                className={
                  "border border-violet-500 text-white  px-3 lg:px-5 bg-violet-500 hover:text-violet-500 hover:bg-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
                }
              >
                <IoMdPersonAdd className="block md:hidden text-xl" />

                <p className="hide-name">Sign up</p>
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
