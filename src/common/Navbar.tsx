import { Link } from "react-router-dom";

import Logo from "../assets/icons/logo.svg";

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
];

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <img src={Logo} alt="logo icon" />
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
      </div>
    </>
  );
};

export default Navbar;
