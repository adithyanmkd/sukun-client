import { Routes, Route } from "react-router-dom";

// import layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./features/user/profile/layout/ProfileLayout.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";

// Public pages
import HomePage from "./features/user/home/HomePage.tsx";
import AboutUs from "./pages/aboutUs/AboutUs";
import ContactUs from "./pages/contactUs/ContactUs.tsx";
import AllFeatures from "./pages/allFeatures/AllFeatures";
import Faq from "./pages/faq/Faq";
import PageNotFound from "./pages/PageNotFound.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";

// Quran pages
import QuranIndex from "./features/user/quran/pages/QuranIndex";
import SurahReadPage from "./features/user/quran/pages/SurahReadPage.tsx";

// Profile pages
import Profile from "./features/user/profile/pages/Profile.tsx";

// Auth pages
import { OTPVerify, Login, Register } from "./features/auth/index.ts";
import GoogleCallback from "./features/auth/components/GoogleCallback.tsx";
import GoogleCallbackFailure from "./features/auth/components/GoogleCallbackFailure.tsx";

// admin news management pages
import DashboardPage from "./features/admin/dashboard/DashboardPage.tsx";
import NewsListPage from "./features/admin/news/pages/NewsListPage.tsx";
import CategoryListPage from "./features/admin/news/pages/CategoryListPage.tsx";
import SourceListPage from "./features/admin/news/pages/SourceListPage.tsx";

import News from "./features/user/news/pages/News.tsx";

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

          {/* news pages */}
          <Route path="/news" element={<News />} />

          {/* 404 */}
          <Route path="/*" element={<PageNotFound />} />
        </Route>

        {/* PRIVATE PAGES WITH ADMIN LAYOUT */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="news" element={<NewsListPage />} />
          <Route path="category" element={<CategoryListPage />} />
          <Route path="sources" element={<SourceListPage />} />
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
