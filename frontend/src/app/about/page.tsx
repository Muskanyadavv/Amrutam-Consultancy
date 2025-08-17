import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col">
      
      {/* Section 1 - Image Left */}
      <section className="flex flex-col md:flex-row items-center p-8 gap-8">
        <div className="flex-1">
          <Image
            src="/unnamed.png" // replace with your image path
            alt="Ayurvedic Healing"
            width={400}
            height={300}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl text-[#FFFF00]  font-bold mb-4">Our Ayurvedic Journey</h2>
          <p className="text-white-700 leading-relaxed">
          Amrutam is a pioneering Ayurvedic wellness brand dedicated to promoting holistic health through authentic, ethically sourced, and scientifically formulated Ayurvedic products. Founded in 2006 in Gwalior, India, by Ashok and Chandrakanta Gupta, 
          and later innovatively transformed into a D2C brand by their children Agnim and Stuti Gupta, Amrutam has grown into a vibrant wellness community.
           We believe in making Ayurveda accessible and effective for everyone, offering a wide range of products alongside a robust telemedicine platform connecting individuals with experienced Ayurvedic doctors. 
          Our mission extends beyond products; it's about fostering a community dedicated to well-being, rooted in the ancient wisdom of Ayurveda.
          </p>
        </div>
      </section>

      {/* Section 2 - Image Right */}
      <section className="flex flex-col md:flex-row-reverse items-center p-8 gap-8 bg-[#e1ddb2]">
        <div className="flex-1">
          <Image
            src="/OIP.webp" // replace with your image path
            alt="Doctor Consultation"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex-1 ">
          <h2 className="text-3xl text-yellow-900  font-bold mb-4">Why Choose Us?</h2>
          <p className="text-black leading-relaxed">
            At Amrutam, we are more than just a team; we are a family – the #AmrutamFamily. Our culture is built on values of authenticity, empathy, innovation, and continuous learning.
             We are a young, dynamic group of individuals, always brimming with ideas and driven by a shared passion for holistic wellness and positive impact.
            Our platform connects you with experienced Ayurvedic doctors who
            understand your unique body constitution. Whether online or
            in-person, we ensure every consultation is personalized, supportive,
            and rooted in ancient healing traditions.
          </p>
        </div>
      </section>

      {/* Section 3 - Image Left Again */}
      <section className="flex flex-col md:flex-row items-center p-8 gap-8">
        <div className="flex-1">
          <Image
            src="/coverimage-1561012354.jpg" // replace with your image path
            alt="Herbal Medicine"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl text-[#FFFF00]  font-bold mb-4">Authentic Remedies</h2>
          <p className="text-white leading-relaxed">
            Every remedy we recommend is backed by centuries of Ayurvedic
            knowledge and crafted from high-quality, natural ingredients. We
            prioritize your well-being above all else.
          </p>
        </div>
      </section>
    </div>
  );
}



