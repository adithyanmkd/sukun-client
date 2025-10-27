import { Link } from "react-router-dom";

// import icons
import FacebookIcon from "@assets/icons/facebook.svg";
import TwitterIcon from "@assets/icons/twitter.svg";
import InstagramIcon from "@assets/icons/instagram.svg";
import LinkdinIcon from "@assets/icons/linkedin.svg";
import FooterLogo from "@assets/icons/footerLogo.svg";

interface SocialType {
  name: string;
  icon: string;
  link: string;
}

const socialLinks: SocialType[] = [
  {
    name: "facebook",
    icon: FacebookIcon,
    link: "/",
  },
  {
    name: "twitter",
    icon: TwitterIcon,
    link: "/",
  },
  {
    name: "instagram",
    icon: InstagramIcon,
    link: "/",
  },
  {
    name: "linkdin",
    icon: LinkdinIcon,
    link: "/",
  },
];

interface QuickLink {
  name: string;
  link: string;
}

const quickLinks: QuickLink[] = [
  {
    name: "About Us",
    link: "/",
  },
  {
    name: "Contact",
    link: "/",
  },
  {
    name: "Privacy Policy",
    link: "/",
  },
  {
    name: "Terms of Service",
    link: "/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-4 py-6 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between md:flex-row">
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <div className="mb-2 flex items-center justify-center md:justify-start">
            <span className="text-xl text-green-400">
              <img src={FooterLogo} alt="footer logo" />
            </span>
          </div>
          <p className="max-w-[320px] pt-4 text-sm">
            Your daily companion for an Islamic lifestyle. Learn, discover, and
            grow in your faith.
          </p>
          <div className="mt-2 flex justify-center space-x-4 pt-1 md:justify-start">
            {socialLinks.map((item, index) => (
              <Link key={index} to={item.link}>
                <img src={item.icon} alt={item.name} />
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center md:text-left">
          <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-1 text-sm text-white/70">
            {quickLinks.map(({ link, name }, index) => (
              <li key={index}>
                <a href={link} className="hover:underline">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center text-xs">
        © 2024 SUKUN. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
