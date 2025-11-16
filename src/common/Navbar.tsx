import { Link } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
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
import { useState } from "react";

const menus = [
  { name: "Home", href: "/" },
  { name: "News", href: "/" },
  { name: "Videos", href: "/" },
  { name: "Tutors", href: "/" },
  { name: "All Features", href: "/all-features" },
];

const Navbar = () => {
  const [language, setLanguage] = useState("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 sm:py-3">
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
          className="flex items-center md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Nav – Hidden on md: and below */}
        <nav className="hidden md:flex md:items-center md:gap-x-5 lg:gap-x-7">
          {menus.map((menu, i) => (
            <Link
              key={i}
              to={menu.href}
              className="text-sm font-medium text-[#565D6D] transition-colors hover:text-[#2E8A56] lg:text-base"
            >
              {menu.name}
            </Link>
          ))}
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

          <Button
            asChild
            className="bg-[#2E8A56] text-sm hover:bg-[#1c7c46] lg:text-base"
          >
            <Link to="/auth/login">Login</Link>
          </Button>

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
        <div className="absolute inset-x-0 top-full z-40 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden">
          <div className="flex flex-col gap-4 px-6 py-5">
            {menus.map((menu, i) => (
              <Link
                key={i}
                to={menu.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-[#565D6D] transition-colors hover:text-[#2E8A56]"
              >
                {menu.name}
              </Link>
            ))}

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
      )}
    </header>
  );
};

export default Navbar;
