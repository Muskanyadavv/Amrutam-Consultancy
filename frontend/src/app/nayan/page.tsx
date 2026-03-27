export default function Nayan() {
  return (
    <div className="bg-[#eeeac2] text-gray-800">
      {/* Hero Section */}
      <section className="text-center py-13 px-6">
        <h1 className="text-4xl font-bold mb-3 text-amber-800">Nayan Kajal</h1>
        <p className="text-lg italic mb-4">“Kajal that heals, not hurts — choose Ayurvedic Kajal.”</p>
        <p className="text-gray-700">@sweta_gupta_ayurvidya</p>
      </section>

      {/* Product Story */}
      <section className="max-w-5xl mx-auto px-6 py-6 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="coverimage-1561012354.jpg"
            alt="Nayan Kajal"
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-amber-800">What is Nayan Kajal</h2>
          <p className="leading-relaxed mb-3">
Ayurvedic Kajal is a natural eye cosmetic made using herbal ingredients - traditionally prepared with soot(lamp black) from ghee lamps, mixed with castor oil, almondoil, triphala, camphor or rose wahter.
 it is not only beatifies the eye but also nourishes, cools, bright and protects them. 
    
          </p>
          <p className="leading-relaxed">
            Completely focused on eye health with the touch of Ayurveda, this Kajal is more than makeup — it’s care for your vision and wellbeing.
          </p>
        </div>
      </section>

      {/* Making Process */}
      <section className="bg-[#eeeac2] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-8 text-center">How Nayan Kajal is Made</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <img
              src="/WhatsApp Image 2025-11-09 at 16.30.21_f022b859.jpg"
              alt="Kajal Making Process"
              className="rounded-lg shadow-md"
            />
            <div>
              <ul className="space-y-3 text-gray-700">
                <li>🌿 Prepared completely based on Ayurvedic principles.</li>
                <li>💧 Produced according to specific astrological date and time for purity.</li>
                <li>🕯️ Crafted using pure oils, herbs, and traditional methods.</li>
                <li>🔥 Hand-finished to ensure smooth texture and safe application.</li>
                 <li>✅Ghee or Cator oil - nourishment</li>
                  <li>✅Triphala - strengthens eyesight</li>
                   <li>✅ Camphot - cooling effect</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold mb-6 text-amber-800">Why Nayan Kajal is Unique</h2>
        <ul className="grid md:grid-cols-2 gap-4 text-left max-w-3xl mx-auto">
          <li>✅ Completely based on Ayurveda</li>
          <li>✅ No side effects</li>
           <li>✅ Cools and soothes tired eyes</li>
            <li>✅ Improves vision(as per Ayurveda)</li>
             <li>✅ Prevents dryness and irritation</li>
              <li>✅ Natural protection against dust and infections</li>
               <li>✅ chemical-free beauty - safe for daily use</li>
          <li>✅ Easy to apply</li>
          <li>✅ Suitable for all ages</li>
          <li>✅ Completely medicated</li>
          <li>✅ Produced on astrological timing</li>
          <li>✅ Deep black — one stroke is enough</li>
        </ul>
        <p className="mt-6 text-gray-700 italic">
          Don’t go for chemical-oriented eye products. Keep your eyes beautiful and cool with <strong>Nayan.</strong>
        </p>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-[#f5f3d8] text-white">
        <h2 className="text-2xl  text-amber-700  font-bold mb-4">Bring Ayurveda to Your Eyes</h2>
        <a
          href="/buy-nayan"
          className="bg-white text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-700 hover:text-white transition"
        >
          Buy Nayan Kajal
        </a>
      </section>
    </div>
  );
}
