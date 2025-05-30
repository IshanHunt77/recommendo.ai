"use client";

import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-black border-t border-white py-4 px-6 mt-12 rounded">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-white text-sm">
        <div className="mb-2 sm:mb-0">email: recommendo115@gmail.com</div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/recommendo.insta"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-black"
          >
            <FaInstagram size={16} />
            <span>@recommendo.insta</span>
          </a>
          <a
            href="https://x.com/recommendo.x"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-black"
          >
            <FaXTwitter size={16} />
            <span>@recommendo.x</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
