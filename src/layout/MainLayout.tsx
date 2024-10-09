import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "~/components/common/Header";

function MainLayout() {
  return (
    <div className="p-4">
      <Toaster position="bottom-center"/>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
