"use client";

export default function Footer() {
  return (
    <footer className="bg-[#2E8B57] text-white py-8">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Overview */}
        <div>
          <h2 className="text-lg text-[#FFFF00] font-semibold mb-3">About Amrutam</h2>
          <p className="text-sm text-gray-300 leading-relaxed">
            Amrutam is an Ayurvedic doctor consultation platform where users can 
            discover specialists, book consultations, and manage appointments with ease. 
            Our mission is to make authentic Ayurveda accessible to everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg  text-[#FFFF00]  font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/doctors" className="hover:underline">Find Doctors</a></li>
            <li><a href="/login" className="hover:underline">Login</a></li>
            <li><a href="/register" className="hover:underline">Sign Up</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg text-[#FFFF00]  font-semibold mb-3">Contact Us</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: <a href="mailto:support@amrutam.com" className="hover:underline">support@amrutam.com</a></li>
            <li>Phone: +91-9876543210</li>
            <li>Location: Bhopal, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8  text-[#FFFF00]  border-t border-green-700 pt-4 text-center text-xs">
        © {new Date().getFullYear()} Amrutam. All rights reserved.
      </div>
    </footer>
  );
}
