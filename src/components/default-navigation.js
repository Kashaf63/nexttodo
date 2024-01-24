"use client";

import { navlinks } from "@/lib/default-nav-svg-array";
import NavLinks from "./nav-links";



function DefaultNavigation() {
  return (
    <nav className=" px-4 py-5 pt-1">
      <ul className="text-gray-300">
        {navlinks.map((link) => (
          <NavLinks
            key={link.path}
            text={link.text}
            path={link.path}
            icon={link.icon}
          />
        ))}
      </ul>
    </nav>
  );
}

export default DefaultNavigation;
