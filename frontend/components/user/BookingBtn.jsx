"use client";

import { useRouter, usePathname } from "next/navigation";

export default function BookingBtn() {
 const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/booking") return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 ">
      
      {/* Dot */}
      <span className="absolute  w-3 h-3 z-10 bg-red-500 rounded-full animate-ping"></span>
      <span className="absolute  w-3 h-3 z-50 bg-red-500 rounded-full"></span>

      {/* Button */}
      <button
        onClick={() => router.push("/booking")}
        className="bg-gray-900 backdrop-blur text-blue-500 px-6 py-3 rounded-full shadow-red-500 shadow-md
                   hover:bg-black transition 
                   flex items-center gap-2 
                   text-sm font-medium
                   animate-float"
      >
    Book Appointment
      </button>
    </div>
  );
}

