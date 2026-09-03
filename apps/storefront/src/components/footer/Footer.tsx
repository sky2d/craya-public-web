import { aboutLinks, contactDetails, infoLinks } from "@/constants/NavigationLinks";
import Logo from "components/src/icons/iconFiles/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white w-full snap-end bg-brand-color1 p-6">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between">
        {/* Logo Section */}
        <div className="flex w-full justify-center sm:justify-start">
          <Image src={Logo} draggable={false} alt="Craya Logo" width={200} height={40} />
        </div>

        {/* Grid Layout for Links */}
        <div className="mt-6 grid w-full grid-cols-2 gap-6 sm:mt-0 lg:grid-cols-3">
          {/* Info Section */}
          <div>
            <h3 className="mb-4 font-bold text-white-light4">INFO</h3>
            <ul className="w-full space-y-1 text-sm">
              {" "}
              {infoLinks.map(({ label, path }) => (
                <li key={path} className="w-full">
                  <Link href={path} className="block w-full truncate text-white-light4 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="mb-4 font-bold text-white-light4">ABOUT</h3>
            <ul className="space-y-1 text-sm">
              {aboutLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link href={path} className="text-white-light4 hover:underline">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-4 font-bold text-white-light4">CONTACT US</h3>
            {contactDetails.map((detail, index) => {
              if (detail.includes("@")) {
                // Email link
                return (
                  <a key={index} href={`mailto:${detail}`} className="block text-sm text-white-light4 hover:underline">
                    {detail}
                  </a>
                );
              } else if (detail.match(/^\+?\d[\d\s-]{7,}$/)) {
                // WhatsApp link
                const phone = detail.replace(/\D/g, ""); // remove non-numeric chars
                return (
                  <a
                    key={index}
                    href={`https://wa.me/${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-white-light4 hover:underline"
                  >
                    {detail}
                  </a>
                );
              } else {
                // Address
                return (
                  <span key={index} className="block text-sm text-white-light4">
                    {detail}
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 flex flex-col items-center justify-between border-t border-white-light3 pt-4 sm:flex-row">
        <p className="text-sm text-white-light4">© 2025 — Copyright</p>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <FaInstagram className="hover:text-gray-300 cursor-pointer text-2xl text-white-light4" />
          <FaFacebook className="hover:text-gray-300 cursor-pointer text-2xl text-white-light4" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
