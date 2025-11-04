import { Link } from "react-router-dom";
import Logo from "../assets/icons/logo.svg";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Bell, SearchIcon, Menu } from "lucide-react";
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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2 md:py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="logo icon"
            className="h-10 w-auto md:h-12" // prevent touching & scale with screen
          />
        </Link>

        {/* Hamburger menu for small screens */}
        <button
          className="block md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={28} />
        </button>

        {/* Menu Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 z-40 w-full bg-white px-6 py-4 shadow-md md:static md:block md:w-auto md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-x-7">
            {menus.map((menu, index) => (
              <Link
                className="font-medium text-[#565D6D] transition-colors hover:text-[#2E8A56]"
                key={index}
                to={menu.href}
                onClick={() => setIsMenuOpen(false)} // close on click (mobile)
              >
                {menu.name}
              </Link>
            ))}
          </ul>
        </nav>

        {/* Right section */}
        <div className="hidden items-center gap-x-3 md:flex">
          <InputGroup className="bg-gray-50">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon align="inline-end">
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>

          <Bell size={28} className="cursor-pointer" />

          <Button asChild className="bg-[#2E8A56] hover:bg-[#1c7c46]">
            <Link to="/auth/login">Login</Link>
          </Button>

          {/* Language select */}
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Language" />
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
    </header>
  );
};

export default Navbar;
