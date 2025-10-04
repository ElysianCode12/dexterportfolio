"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../nav-bar/navbar";

export default function Page() {
    const [randomFact, setRandomFact] = useState("");
    const [factUrl, setFactUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRandomFact();
    }, []);

    const fetchRandomFact = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://en.wikipedia.org/api/rest_v1/page/random/summary"
            );
            setRandomFact(response.data.extract);
            setFactUrl(response.data.content_urls.desktop.page);
        } catch (error) {
            console.error("Error fetching random fact:", error);
        }
        setLoading(false);
    };

    return (
        <main>
            <Navbar />
            <div className="flex flex-col items-center justify-between p-24">
                <div className="relative flex place-items-center border rounded-lg p-4 border-black">
                    <div className="max-w-screen-lg mx-auto flex items-center">
                        <div className="mr-8">
                            <h1 className="text-4xl font-bold mb-6">Fact Generator</h1>
                            <p>Powered by Wikipedia API</p>
                        </div>
                        <div>
                            <Image src="/Wikipedia-logo-v2.svg" alt="Wikipedia logo" width={144} height={144} className="w-36 h-auto rounded-full" />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <p className="p-6">{randomFact}</p>
                        <div className="flex justify-center">
                            {factUrl && (
                                <a href={factUrl} target="_blank" rel="noopener noreferrer">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                        Read More on Wikipedia
                                    </button>
                                </a>
                            )}
                            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={fetchRandomFact}>
                                Generate New Fact
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="fixed bottom-8">
                <Link href="/">
                    <p className="text-blue-500 hover:text-blue-700 py-100">Go back to home</p>
                </Link>
            </div>
        </main>
    );
}