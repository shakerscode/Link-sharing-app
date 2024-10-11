import { Outlet } from "react-router-dom";
import Header from "~/components/common/Header"; 

function MainLayout() {
  return (
    <div className="p-4 max-w-[1480px] w-full mx-auto"> 
      <Header />
      <div>
        <Outlet />
      </div> 
    </div>
  );
}

export default MainLayout;
