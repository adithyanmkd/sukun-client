import { Routes, Route } from "react-router-dom";

// import layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./features/profile/layout/ProfileLayout.tsx";

// Public pages
import HomePage from "./features/home/HomePage";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs.tsx";
import AllFeatures from "./pages/allFeatures/AllFeatures";
import Faq from "./pages/faq/Faq";
import PageNotFound from "./pages/PageNotFound.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";

// Quran feature
import QuranIndex from "./features/quran/pages/QuranIndex";
import SurahReadPage from "./features/quran/pages/SurahReadPage.tsx";

// Profile feature
import Profile from "./features/profile/pages/Profile.tsx";

// Auth pages
import { OTPVerify, Login, Register } from "./features/auth/index.ts";
import GoogleCallback from "./features/auth/components/GoogleCallback.tsx";
import GoogleCallbackFailure from "./features/auth/components/GoogleCallbackFailure.tsx";

function App() {
  return (
    <>
      <Routes>
        {/* AUTH LAYOUT */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="google/success" element={<GoogleCallback />} />
          <Route path="google/failure" element={<GoogleCallbackFailure />} />
        </Route>

        {/* PUBLIC PAGES WITH MAIN LAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/all-features" element={<AllFeatures />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/otp-verify" element={<OTPVerify />} />

          {/* Quran pages */}
          <Route path="/quran" element={<QuranIndex />} />
          <Route path="/surah/:id" element={<SurahReadPage />} />

          {/* 404 */}
          <Route path="/*" element={<PageNotFound />} />
        </Route>

        {/* PROFILE PAGES WITH ProfileLayout */}
        <Route path="/profile" element={<ProfileLayout />}>
          <Route path="user" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
