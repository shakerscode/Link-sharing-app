import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "~/components/common/Header";

function MainLayout() {
  return (
    <div className="p-4 max-w-[1480px] w-full mx-auto">
      <Toaster position="bottom-center"/>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
