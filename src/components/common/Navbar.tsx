import { Link, useLocation } from "react-router-dom";
import Logo from "@assets/icons/logo.svg";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Bell, SearchIcon, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AvatarImage, Avatar } from "@/components/ui/avatar";

// import assets
import AvatarPlaceholder from "@assets/icons/avatar.svg";

import { useState } from "react";
import { useAppSelector } from "@/app/hooks";

const menus = [
  { name: "Home", href: "/" },
  { name: "News", href: "/news" },
  { name: "Videos", href: "/videos" },
  { name: "Tutors", href: "/tutors" },
  { name: "All Features", href: "/all-features" },
];

const Navbar = () => {
  const location = useLocation();
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-2 py-2 sm:px-4 sm:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Sukun"
            className="h-9 w-auto sm:h-10 md:h-11"
            loading="lazy"
          />
        </Link>

        {/* Mobile/Tablet Toggle – Show at md: and below */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center focus:ring-2 focus:ring-[#2E8A56] focus:outline-none md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navbar-menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Nav – Hidden on md: and below */}
        <nav className="hidden md:flex md:items-center md:gap-x-5 lg:gap-x-7">
          {menus.map((menu, i) => {
            const isActive = location.pathname === menu.href;
            return (
              <Link
                key={i}
                to={menu.href}
                className={`text-sm font-medium transition-colors lg:text-base ${
                  isActive
                    ? "border-b-2 border-[#2E8A56] pb-1 text-[#2E8A56]"
                    : "text-[#565D6D] hover:text-[#2E8A56]"
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section – Hidden on md: and below */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <InputGroup className="w-40 bg-gray-50 lg:w-56">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
              <SearchIcon size={18} />
            </InputGroupAddon>
          </InputGroup>

          <Bell size={22} className="cursor-pointer text-[#565D6D]" />

          {user ? (
            <Link to={"/profile/user"}>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.avatar || AvatarPlaceholder} />
              </Avatar>
            </Link>
          ) : (
            <Button
              asChild
              className="bg-[#2E8A56] text-sm hover:bg-[#1c7c46] lg:text-base"
            >
              <Link to="/auth/login">Login</Link>
            </Button>
          )}

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[90px] text-xs lg:w-[110px] lg:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="ml">Malayalam</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile/Tablet Menu – Slide In */}
      {isMenuOpen && (
        <>
          {/* Backdrop for better UX */}
          <div
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden"
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            id="mobile-navbar-menu"
            className="fixed inset-x-0 top-0 z-40 max-h-screen overflow-y-auto bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-col gap-4 px-4 py-5 sm:px-6">
              {/* Close button for accessibility */}
              <button
                className="mb-2 self-end rounded-full p-2 focus:ring-2 focus:ring-[#2E8A56] focus:outline-none"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={26} />
              </button>
              {menus.map((menu, i) => {
                const isActive = location.pathname === menu.href;
                return (
                  <Link
                    key={i}
                    to={menu.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium transition-colors ${
                      isActive
                        ? "border-b-2 border-[#2E8A56] pb-1 text-[#2E8A56]"
                        : "text-[#565D6D] hover:text-[#2E8A56]"
                    }`}
                  >
                    {menu.name}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
                <InputGroup className="bg-gray-50">
                  <InputGroupInput placeholder="Search..." />
                  <InputGroupAddon align="inline-end">
                    <SearchIcon size={18} />
                  </InputGroupAddon>
                </InputGroup>

                <div className="flex items-center justify-between">
                  <Bell size={24} className="cursor-pointer text-[#565D6D]" />
                  <Button
                    asChild
                    className="bg-[#2E8A56] hover:bg-[#1c7c46]"
                    size="sm"
                  >
                    <Link to="/auth/login">Login</Link>
                  </Button>
                </div>

                {/* Mobile Language Button */}
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full justify-between">
                    <div className="flex items-center gap-2">
                      <Globe size={18} />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Languages</SelectLabel>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="ml">Malayalam</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
