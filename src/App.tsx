import { Routes, Route } from "react-router-dom";

// import layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// import pages
import HomePage from "./features/home/HomePage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import Login from "./features/auth/pages/Login";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs";
import AllFeatures from "./pages/allFeatures/AllFeatures";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/all-features" element={<AllFeatures />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
