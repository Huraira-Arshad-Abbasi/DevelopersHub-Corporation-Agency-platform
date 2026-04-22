"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Info,
  Briefcase,
  Folder,
  FileText,
  Calendar,
  Mail,
  Menu,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Portfolio", href: "/portfolio", icon: Folder },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Booking", href: "/booking", icon: Calendar },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Briefcase className="text-blue-600" />
          <h1 className="heading text-xl font-bold text-blue-600">
            DevelopersHub
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">

          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={i}>
                <Link
                  href={item.href}
                  className={`group flex items-center gap-1 transition ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  }`}
                >
                  {/* Icon → only on hover OR active */}
                  <span
                    className={`transition-all duration-200 ${
                      isActive ? "inline-block" : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Icon size={16} />
                  </span>

                  {/* Text */}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}

        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* Mobile Menu (unchanged — always show icons) */}
      {isOpen && (
        <ul className="md:hidden bg-white px-4 pb-4 space-y-4 font-medium">

          {navItems.map((item, i) => {
            const Icon = item.icon;

            return (
              <li key={i}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              </li>
            );
          })}

        </ul>
      )}
    </nav>
  );
}