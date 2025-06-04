"use client";

import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-white px-6 py-10 mt-12 rounded">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        {/* Column 1: About / Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:text-gray-400">About</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            <li><a href="/careers" className="hover:text-gray-400">Careers</a></li>
            <li><a href="/privacy" className="hover:text-gray-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 2: Explore / Sections */}
        <div>
          <h3 className="font-semibold mb-3">Explore</h3>
          <ul className="space-y-2">
            <li><a href="/trending" className="hover:text-gray-400">Trending</a></li>
            <li><a href="/genres" className="hover:text-gray-400">Genres</a></li>
            <li><a href="/reviews" className="hover:text-gray-400">Reviews</a></li>
            <li><a href="/recommendations" className="hover:text-gray-400">Recommendations</a></li>
          </ul>
        </div>

        {/* Column 3: Social + Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Stay Connected</h3>
          <p className="mb-2">Email: <span className="text-gray-300">recommendo115@gmail.com</span></p>
          <div className="flex gap-4 mb-4">
            <a
              href="https://www.instagram.com/recommendo.insta"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-400"
            >
              <FaInstagram size={16} />
              <span>@recommendo.insta</span>
            </a>
            <a
              href="https://x.com/recommendo.x"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-gray-400"
            >
              <FaXTwitter size={16} />
              <span>@recommendo.x</span>
            </a>
          </div>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="px-3 py-1 rounded bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold py-1 rounded hover:bg-gray-300 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="text-center text-xs mt-10 border-t border-gray-700 pt-4 text-gray-400">
        © {new Date().getFullYear()} Recommendo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
