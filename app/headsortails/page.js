"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
    const [currentMoney, setCurrentMoney] = useState(100); // Initial money set to 100
    const [selectedOption, setSelectedOption] = useState("Heads");
    const [result, setResult] = useState(null);
    const [highScore, setHighScore] = useState(100); // Initial high score set to 100

    const handleBet = () => {
        const betAmount = parseInt(document.getElementById("betAmount").value);
        const updatedMoney = currentMoney - betAmount;
        if (updatedMoney >= 0) {
            const randomNumber = Math.random();
            const coinResult = randomNumber < 0.5 ? "Heads" : "Tails";
            setResult(coinResult);
            if (selectedOption === coinResult) {
                const newMoney = updatedMoney + betAmount * 2;
                setCurrentMoney(newMoney);
                if (newMoney > highScore) {
                    setHighScore(newMoney);
                }
            } else {
                setCurrentMoney(updatedMoney);
            }
        } else {
            alert("You don't have enough money to place this bet!");
        }
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        setResult(null); // Reset the result when the option changes
    };

    return (
        <main className="flex flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-4xl font-bold mb-4">Heads Or Tails Game</h1>
            </div>

            <div>
                <img src="coin.jpg" className="w-40 h-auto rounded-lg mb-5"></img>
            </div>

            <div className="flex items-center mb-4">
                <select 
                    value={selectedOption} 
                    onChange={handleSelectChange} 
                    className="mr-2 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                    <option value="Heads">Heads</option>
                    <option value="Tails">Tails</option>
                </select>
                <input 
                    id="betAmount" 
                    type="number" 
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" 
                    placeholder="Enter a number"
                />
                <button 
                    onClick={handleBet} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Bet!
                </button>
            </div>

            <div>
                {result && (
                    <p className={`text-xl font-semibold mb-2 ${selectedOption === result ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedOption === result ? 'You won!' : 'You lost!'}
                    </p>
                )}
            </div>
            
            <div className="flex justify-center m-1">
                <p className="text-xl font-semibold">Current Money: ${currentMoney}</p>
            </div>
            
            <div className="flex justify-center m-1">
                <p className="text-xl font-semibold">High Score: ${highScore}</p>
            </div>

            <div className="fixed bottom-8">
                <Link href="/">
                    <p className="text-blue-500 hover:text-blue-700 py-100">Go back to home</p>
                </Link>
            </div>
        </main>
    );
}
