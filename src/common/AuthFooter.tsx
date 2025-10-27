import FacbookIcon from "@assets/icons/authFacebook.svg";
import TwitterIcon from "@assets/icons/authTwitter.svg";
import InstragramIcon from "@assets/icons/authInstagram.svg";
import LinkdinIcon from "@assets/icons/authLinkdin.svg";

interface Link {
  href: string;
  text: string;
}

const leftLinks: Link[] = [
  { href: "#", text: "Qibla Direction" },
  { href: "#", text: "Solutions" },
  { href: "#", text: "Tutorials" },
];

const middleLinks: Link[] = [
  { href: "#", text: "About" },
  { href: "#", text: "Careers" },
  { href: "#", text: "Press" },
  { href: "#", text: "Partners" },
];

const rightLinks: Link[] = [
  { href: "#", text: "Blog" },
  { href: "#", text: "Newsletter" },
  { href: "#", text: "Help center" },
  { href: "#", text: "API" },
];

interface Social extends Link {
  icon: string;
}

const socialLinks: Social[] = [
  { text: "facebook", href: "#", icon: FacbookIcon },
  { text: "instagram", href: "#", icon: InstragramIcon },
  { text: "twitter", href: "#", icon: TwitterIcon },
  { text: "linkdin", href: "#", icon: LinkdinIcon },
];

const AuthFooter = () => {
  return (
    <div>
      <footer className="border-t border-gray-200 bg-white py-6 text-gray-600">
        <div className="container mx-auto px-4">
          {/* Main content */}
          <div className="flex flex-col items-center justify-between text-center md:flex-row md:text-left">
            {/* Left Section */}
            <div className="mb-2 md:mb-0">
              {leftLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="mr-2 hover:text-gray-800"
                >
                  {link.text}
                </a>
              ))}
            </div>

            {/* Middle Section */}
            <div className="mb-2 md:mb-0">
              {middleLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="mr-2 hover:text-gray-800"
                >
                  {link.text}
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="mb-2 md:mb-0">
              {rightLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="mr-2 hover:text-gray-800"
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-x-2 pt-4">
            {socialLinks.map((item, index) => (
              <a key={index} href={item.href} className="hover:text-gray-800">
                <span className="sr-only">Facebook</span>
                <img src={item.icon} alt={item.text} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-4 text-center">
            <p>© 2023 Sukun, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthFooter;
