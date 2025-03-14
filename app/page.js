import Link from "next/link";
import Navbar from "./nav-bar/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Hi, I'm Dexter Balino
              <span className="block text-gray-600 mt-2">Software Developer</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              I build modern applications with a focus on clean code and great user experience.
            </p>
            <div className="space-x-4">
              <a href="#projects" className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                View My Work
              </a>
              <a href="#contact" className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Get in Touch
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="/dexter.jpg" 
              alt="Dexter Balino" 
              className="w-64 h-64 rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/headsortails">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-48">
                  <img 
                    src="/coin.jpg" 
                    alt="Heads or Tails Game" 
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Heads or Tails Game</h3>
                  <p className="text-gray-600">
                    An interactive game built with modern web technologies.
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/fact-generator">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative h-48">
                  <img 
                    src="/Wikipedia-logo-v2.svg" 
                    alt="Fact Generator" 
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Fact Generator</h3>
                  <p className="text-gray-600">
                    A tool that generates interesting facts using wikipedia api.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-600 mb-8">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <a 
            href="mailto:balino_dexter@yahoo.com" 
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition inline-block"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
