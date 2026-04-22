"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-2">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">

        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">
            DevelopersHub Corporation
          </h2>
          <p className="text-gray-400">
            We build modern web solutions to help businesses grow digitally.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Service</Link></li>
            <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/booking" className="hover:text-white">Booking</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
          
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>

          <div className="space-y-3 text-gray-400">

            <p className="flex items-center gap-2">
              <Mail size={16} />
              info@developershub.com
            </p>

            <p className="flex items-center gap-2">
              <Phone size={16} />
              +92 300 1234567
            </p>

            <p className="flex items-center gap-2">
              <MapPin size={16} />
              Pakistan
            </p>

          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} DevelopersHub. All rights reserved.
      </div>
    </footer>
  );
}