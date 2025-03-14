"use client";

import Link from "next/link";
import Navbar from "../nav-bar/navbar";

export default function Projects() {
    const projects = [
        {
            title: "Heads or Tails Game",
            description: "An interactive betting game where users can test their luck by betting on coin flips. Built with React and features state management for tracking scores and money.",
            image: "/coin.jpg",
            link: "/headsortails",
            technologies: ["React", "Next.js", "Tailwind CSS"],
            features: [
                "Real-time score tracking",
                "High score system",
                "Interactive betting interface",
                "Responsive design"
            ]
        },
        {
            title: "Fact Generator",
            description: "A dynamic fact generation tool that pulls random articles from Wikipedia. Users can discover interesting facts and read more about topics that interest them.",
            image: "/Wikipedia-logo-v2.svg",
            link: "/fact-generator",
            technologies: ["React", "Next.js", "Wikipedia API", "Axios"],
            features: [
                "Random fact generation",
                "Direct Wikipedia integration",
                "Loading state handling",
                "External link support"
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <div className="max-w-6xl mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold mb-8">My Projects</h1>
                
                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                                <div className="p-8 md:w-2/3">
                                    <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    
                                    <div className="mb-4">
                                        <h3 className="font-semibold mb-2">Technologies:</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, i) => (
                                                <span 
                                                    key={i}
                                                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="font-semibold mb-2">Key Features:</h3>
                                        <ul className="list-disc list-inside text-gray-600">
                                            {project.features.map((feature, i) => (
                                                <li key={i}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Link 
                                        href={project.link}
                                        className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
