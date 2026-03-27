// import Image from "next/image";

// export default function About() {
//   return (
//     <div className="flex flex-col">
      
//       {/* Section 1 - Image Left */}
//       <section className="flex flex-col md:flex-row items-center p-8 gap-8">
//         <div className="flex-1">
//           <Image
//             src="/unnamed.png" // replace with your image path
//             alt="Ayurvedic Healing"
//             width={400}
//             height={300}
//             className="rounded-lg shadow-lg object-cover"
//           />
//         </div>
//         <div className="flex-1">
//           <h2 className="text-3xl text-[#FFFF00]  font-bold mb-4">Our Ayurvedic Journey</h2>
//           <p className="text-white-700 leading-relaxed">
//           Amrutam is a pioneering Ayurvedic wellness brand dedicated to promoting holistic health through authentic, ethically sourced, and scientifically formulated Ayurvedic products. Founded in 2006 in Gwalior, India, by Ashok and Chandrakanta Gupta, 
//           and later innovatively transformed into a D2C brand by their children Agnim and Stuti Gupta, Amrutam has grown into a vibrant wellness community.
//            We believe in making Ayurveda accessible and effective for everyone, offering a wide range of products alongside a robust telemedicine platform connecting individuals with experienced Ayurvedic doctors. 
//           Our mission extends beyond products; it's about fostering a community dedicated to well-being, rooted in the ancient wisdom of Ayurveda.
//           </p>
//         </div>
//       </section>

//       {/* Section 2 - Image Right */}
//       <section className="flex flex-col md:flex-row-reverse items-center p-8 gap-8 bg-[#e1ddb2]">
//         <div className="flex-1">
//           <Image
//             src="/OIP.webp" // replace with your image path
//             alt="Doctor Consultation"
//             width={500}
//             height={400}
//             className="rounded-lg shadow-lg object-cover"
//           />
//         </div>
//         <div className="flex-1 ">
//           <h2 className="text-3xl text-yellow-900  font-bold mb-4">Why Choose Us?</h2>
//           <p className="text-black leading-relaxed">
//             At Amrutam, we are more than just a team; we are a family – the #AmrutamFamily. Our culture is built on values of authenticity, empathy, innovation, and continuous learning.
//              We are a young, dynamic group of individuals, always brimming with ideas and driven by a shared passion for holistic wellness and positive impact.
//             Our platform connects you with experienced Ayurvedic doctors who
//             understand your unique body constitution. Whether online or
//             in-person, we ensure every consultation is personalized, supportive,
//             and rooted in ancient healing traditions.
//           </p>
//         </div>
//       </section>

//       {/* Section 3 - Image Left Again */}
//       <section className="flex flex-col md:flex-row items-center p-8 gap-8">
//         <div className="flex-1">
//           <Image
//             src="/coverimage-1561012354.jpg" // replace with your image path
//             alt="Herbal Medicine"
//             width={500}
//             height={400}
//             className="rounded-lg shadow-lg object-cover"
//           />
//         </div>
//         <div className="flex-1">
//           <h2 className="text-3xl text-[#FFFF00]  font-bold mb-4">Authentic Remedies</h2>
//           <p className="text-white leading-relaxed">
//             Every remedy we recommend is backed by centuries of Ayurvedic
//             knowledge and crafted from high-quality, natural ingredients. We
//             prioritize your well-being above all else.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }


// app/about/page.jsx
export default function AboutPage() {
  return (
    <div className="bg-[#e1ddb2] text-gray-800">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <img
          src="/WhatsApp Image 2025-11-09 at 00.12.46_f1ba3044.jpg"
          alt="Dr. Sweta"
          className="w-50 h-60 rounded-full mx-auto mb-6 shadow-lg"
        />
        <h1 className="text-3xl text-red-800 font-bold">Dr. Sweta Gupta</h1>
        <p className="text-2xl text- text-red-800 mt-2">B.A.M.S., Ayurvedic Practitioner</p>
        <p className="max-w-2xl mx-auto mt-4">
          Dedicated to holistic healing and authentic Ayurvedic wellness.
        </p>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-6 py-10">
        <h2 className="text-3xl text-red-800 font-semibold mb-4 underline" >My Journey</h2>
        <p className="leading-relaxed mb-4">
From a young age, Dr. Sweta was deeply inspired by the healing traditions of Ayurveda. After earning her B.A.M.S. degree from Bachelor of Ayurvedic Medicine and Surgery from patanjali ayurvedic college, she began her journey to make Ayurveda accessible and practical for modern lifestyles. Her mission is to help people achieve balance through natural remedies, mindful living, and preventive care.
        </p>
        <p>Inspired by the purity of nature, Dr. Sweta also crafts her own range of Ayurvedic products that blend traditional wisdom with modern care. Her first creation, Nayan Kajal, is made from 100% natural ingredients to nurture and protect the eyes—reflecting her belief that beauty and wellness should always come from nature itself.</p>
      </section>

      {/* Qualifications */}
      <section className="bg- py-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl text-red-800 underline font-semibold mb-6">Qualifications & Expertise</h2>
          <h3 className="mb-3">🎓 B.A.M.S. — Bachelor of Ayurvedic Medicine and Surgery from patanjali ayurvedic college
            </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            
            <li>🌿 Certified Panchakarma Specialist</li>
            <li>🩺 2 years of experience</li>
            <li>💚 Specialized in Women’s Health, Skin, Eyes</li>
            <li>🌸Ayurvedic nutrition & lifestyle counseling</li>
            <li>💧 Netra Chikitsa (Eye care through Ayurveda)</li>
            <li>🧘‍♀️Focuses on mind-body-soul balance through Ayurveda</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="text-center py-16">
        <h3 className="text-100px mb-5">“True wellness begins when the mind, body, and soul are in harmony. Ayurveda is not just treatment — it’s a way of life.”</h3>
        <h2 className="text-2xl font-bold mb-4">Explore Natural Wellness</h2>
        <a
          href="/nayan-kajal"
          className="bg-amber-700 text-white px-6 py-3 rounded-full hover:bg-amber-800 transition"
        >
          Discover Nayan Kajal
        </a>
      </section>
    </div>
  ); */}
     {/* Call to Action / Contact Section    f3efe5 [#e1ddb2] */}
      <section className="text-center py-16 bg-[#f5f3d8]">
          <h3 className="text-100px mb-5">“True wellness begins when the mind, body, and soul are in harmony. Ayurveda is not just treatment — it’s a way of life.”</h3>
        <h2 className="text-2xl font-bold mb-4">Let’s Connect</h2>
        <p className="mb-6 text-gray-700">
          Have a health concern or want to explore Ayurvedic care?
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/appointments"
            className="bg-amber-700 text-white px-6 py-3 rounded-full hover:bg-amber-800 transition"
          >
            Book a Consultation
          </a>
          <a
            href="/nayan"
            className="border border-amber-700 text-amber-700 px-6 py-3 rounded-full hover:bg-amber-700 hover:text-white transition"
          >
            Explore Nayan Kajal
          </a>
        </div>
        <p className="mt-6 text-gray-600">
          Follow <a href="https://instagram.com/sweta_gupta_ayurvidya" className="text-amber-700">@sweta_gupta_ayurvidya</a> for Ayurvedic tips.
        </p>
      </section>
    </div>
  );
}

