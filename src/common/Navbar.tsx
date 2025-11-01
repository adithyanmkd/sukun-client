import { Link } from "react-router-dom";

import Logo from "../assets/icons/logo.svg";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Bell, SearchIcon } from "lucide-react";
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
  {
    name: "Home",
    href: "/",
  },
  {
    name: "News",
    href: "/",
  },
  {
    name: "Videos",
    href: "/",
  },
  {
    name: "Tutors",
    href: "/",
  },
  {
    name: "All Features",
    href: "/all-features",
  },
];

const Navbar = () => {
  const [language, setLanguage] = useState("en");

  return (
    <>
      <header className="border-b border-b-gray-300">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-1">
          <Link to={"/"}>
            <img src={Logo} alt="logo icon" />
          </Link>
          <div>
            <ul className="flex gap-x-7">
              {menus.map((menu, index) => (
                <Link
                  className="font-medium text-[#565D6D]"
                  key={index}
                  to={menu.href}
                >
                  {menu.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-x-4">
            <InputGroup className="bg-gray-50">
              <InputGroupInput placeholder="Search..."></InputGroupInput>
              <InputGroupAddon align={"inline-end"}>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
            <Bell size={35} className="cursor-pointer" />
            <Button asChild className="bg-[#2E8A56] hover:bg-[#1c7c46]">
              <Link to={"/auth/login"}>Login</Link>
            </Button>

            {/* language select */}
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
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
    </>
  );
};

export default Navbar;
