import { Outlet } from "react-router-dom";

import AuthFooter from "src/common/AuthFooter";

// import components
import Navbar from "src/common/Navbar";

const AuthLayout = () => {
  return (
    <div className="flex h-full flex-col justify-between">
      <Navbar />
      <Outlet />
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;
