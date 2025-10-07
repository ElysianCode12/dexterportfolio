"use client";

import Navbar from "../../../nav-bar/navbar";
import Link from "next/link";

export default function PatchNotesPage() {
    const patchNotes = [
        {
            version: "v1.0.0",
            date: "October 4, 2025",
            changes: [
                "Initial release, took me 2 days to make",
                "So many states, probably need redux?",
                "I thought it would be a lot simpler than it is, or maybe I just want too much"
            ]
        },
        {
            version: "v1.2.0",
            date: "October 6, 2025",
            changes: [
                "Added 5-card charlie",
                "Added betting system",
                "Idk what I'm doing",
            ]
        },
    ];

    return (
        <main className="min-h-screen bg-green-900">
            <Navbar />
            
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-2xl mb-4">
                            Blackjack Notes
                        </h1>
                        <Link 
                            href="/games/blackjack"
                            className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-2 px-6 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                            ← Back to Game
                        </Link>
                    </div>

                    {/* Patch Notes */}
                    <div className="space-y-6">
                        {patchNotes.map((patch, index) => (
                            <div key={index} className="bg-black bg-opacity-30 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-yellow-400 text-2xl font-bold">{patch.version}</h2>
                                    <span className="text-gray-400 text-lg">{patch.date}</span>
                                </div>
                                
                                <div className="space-y-2">
                                    {patch.changes.map((change, changeIndex) => (
                                        <div key={changeIndex} className="flex items-start space-x-3">
                                            <span className="text-yellow-400 text-lg">•</span>
                                            <p className="text-white text-lg">{change}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coming Soon */}
                    <div className="mt-8 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 border border-blue-600">
                        <h2 className="text-blue-300 text-2xl font-bold mb-4">🚀 Coming Soon</h2>
                        <div className="space-y-2">
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-300 text-lg">•</span>
                                <p className="text-white text-lg">🎯 Advanced betting system</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
