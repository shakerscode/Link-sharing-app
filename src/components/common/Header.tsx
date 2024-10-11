import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import { navLinks } from "~/constants/navLinks";
import { INav } from "~/interface/navInterface";

export default function Header() {
  const location = useLocation();

  return (
    <div className="bg-white rounded-2xl h-16 p-4 flex justify-between items-center">
      {/* logo  */}
      <Link to={"/"}>
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="text-violet-600">
            {/* imported svg logo from icon folder  */}
            <LinkLogo size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 hide-name">
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
      <Link to={"/preview"}>
        <button
          className={
            "border border-violet-500 text-violet-500 px-5 hover:bg-violet-500 hover:text-white transition duration-300 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5"
          }
        >
          <MdOutlineRemoveRedEye className="block md:hidden text-xl" />

          <p className="hide-name">Preview</p>
        </button>
      </Link>
    </div>
  );
}
