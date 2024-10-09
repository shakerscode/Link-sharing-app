import { Outlet } from "react-router-dom";
import Header from "~/components/common/Header";

function MainLayout() {
  return (
    <div className="p-4">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
