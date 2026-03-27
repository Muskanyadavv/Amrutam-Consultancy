"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../context/AuthContet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const goToProfile = () => {
    if (!user) return;
    if (user.role === "doctor") {
      router.push("/docDashboard");
    } else {
      router.push("/UserDashboard");
    }
  };

  return (
    <nav className="bg-[#2E8B57] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-evenly h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#FFFF00]">
              Ayurvidya Ayurveda
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center text-[#FFFF00]">
            <Link href="/" className="hover:text-white">Home</Link>
            <Link href="/appointments" className="hover:text-white">Appointments</Link>
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/nayan" className="hover:text-white">Product</Link>
          </div>

          {/* Right side - Login or Profile */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <Link href="/login" className="hover:text-white text-white">
                Login
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <button onClick={goToProfile} className="relative">
                  <Image
                    src="/Profile-PNG-Photo.png"
                    alt="Profile"
                    width={150}
                    height={150}
                    className="w-9 h-9 rounded-full border-2 border-[#FFFF00]"
                  />
                </button>
                {/* <button
                  onClick={logout}
                  className="text-sm text-white hover:text-[#FFFF00]"
                >
                  Logout
                </button> */}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-[#FFFF00] hover:bg-gray-500 focus:outline-none"
            >
              {isOpen ? (
                // Close Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#2E8B57] shadow-lg">
          <div className="space-y-1 px-4 py-3 text-[#FFFF00]">
            <Link href="/" className="block hover:text-white">Home</Link>
            <Link href="/doctors" className="block hover:text-white">Doctors</Link>
            <Link href="/appointments" className="block hover:text-white">Appointments</Link>
            <Link href="/about" className="block hover:text-white">About</Link>
            {!user ? (
              <Link href="/login" className="block hover:text-white">Login</Link>
            ) : (
              <>
                <button
                  onClick={goToProfile}
                  className="block w-full text-left hover:text-white"
                >
                  My Profile
                </button>
                <button
                  onClick={logout}
                  className="block w-full text-left hover:text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
