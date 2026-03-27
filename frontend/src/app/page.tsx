"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    image: "/WhatsApp Image 2025-11-05 at 13.28.14_4f2bdf93.jpg",
    title: "Welcome to Nayan",
    subtitle: " Kajal that heal, not hurt - choose Ayurvedic Kajal. Completely focus on eye health with the touch of Ayurveda"
  },
  {
    image: "/img2.jpg",
    title: "Expert Ayurvedic Doctor",
    subtitle: "🌸 Get guidance from certified specialists for your health, Holistic Wellness, Naturally Discover authentic, ethically sourced solutions for a healthier, happier you."
  },
  {
    image: "/img3.jpg",
    title: "Natural Healing",
    subtitle: "💚 Trusted by 50,000+ Women Worldwide, experiencing the benefits of our Nari Sondarya Malt, Empowering women through natural remedies and holistic Ayurvedic care."
  }
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Sliding Background Images */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: current === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}

      {/* Text Content (changes with slide) */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1
          key={slides[current].title} // ✅ re-trigger animation on text change
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {slides[current].title.split(" ")[0]}{" "}
          <span className="text-[#FFFF00]">
            {slides[current].title.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        <motion.p
          key={slides[current].subtitle} // ✅ re-trigger animation on text change
          className="text-lg md:text-xl max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {slides[current].subtitle}
        </motion.p>

        <motion.button
          className="mt-8 px-6 py-3 bg-green-500 text-[#FFFF00] font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/login">Book an Appointment</Link>
        </motion.button>
      </div>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-4 h-4 rounded-full ${
              current === idx ? "bg-yellow-400" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
