import { Toaster } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import Header from "~/components/common/Header";
import { navLinks } from "~/constants/navLinks";
import { INav } from "~/interface/navInterface";

function MainLayout() {
  return (
    <div className="p-4 max-w-[1480px] w-full mx-auto">
      <Toaster position="bottom-center" />
      <Header />
      <div>
        <Outlet />
      </div>
      <div className="h-[90vh] mt-10">
        <div className="h-[600px] w-full bg-violet-50 flex items-center justify-center flex-col gap-2 rounded-xl">
          <h3 className="text-5xl text-center font-bold lg:px-5">
            Create dev profile and share <br /> to the world
          </h3>
          {/* menu  */}
          <div className="flex items-center gap-2 mt-3">
            {navLinks?.map((link: INav, i: number) => (
              <Link to={link?.path}>
                <button
                  key={i}
                  className={"bg-violet-500 hover:bg-violet-400 transition-all duration-300 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"}
                >
                  {link?.icon}
                  <p className="">{link?.title}</p>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
