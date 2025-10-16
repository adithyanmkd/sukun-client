import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col pb-40">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <p>footer demo</p>
    </div>
  );
};

export default MainLayout;
