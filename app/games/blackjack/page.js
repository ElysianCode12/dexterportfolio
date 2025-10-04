"use client";

import Navbar from "../../nav-bar/navbar";
import { useState } from "react";
import Link from "next/link";
import { 
    GAME_STATES, 
    getDeck, 
    getInitialHand, 
    hitCard, 
    calculateHandValue, 
    checkPlayerBlackjack, 
    checkPlayerBust, 
    playDealerTurn, 
    determineWinner 
} from "./logic/gamelogic";
import Card from "./components/Card";

export default function BlackjackGame() {
    const [gameState, setGameState] = useState(GAME_STATES.ROUND_END);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [deck, setDeck] = useState([]);
    const [deckIndex, setDeckIndex] = useState(0);
    
    const resetGame = () => {
        setGameState(GAME_STATES.IN_PLAY);
        setPlayerHand([]);
        setDealerHand([]);
        setDeckIndex(0);
    };

    const startGame = async () => {
        resetGame();
        
        const newDeck = getDeck();
        setDeck(newDeck);
        
        const { hands, currentIndex } = getInitialHand(0, newDeck, ['player1']);
        
        // Animate card dealing
        await dealCards(hands);
        
        setDeckIndex(currentIndex);
        
        // Check for natural blackjack
        const blackjackState = checkPlayerBlackjack(hands.player1);
        if (blackjackState) {
            setGameState(blackjackState);
        }
    };

    const dealCards = async (hands) => {
        // Deal dealer's first card
        setDealerHand([hands.dealer[0]]);
        await delay(300);
        
        // Deal player's first card
        setPlayerHand([hands.player1[0]]);
        await delay(300);
        
        // Deal player's second card
        setPlayerHand([...hands.player1]);
        await delay(300);
        
        // Deal dealer's second card
        setDealerHand([...hands.dealer]);
    };
        
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleHit = () => {
        const { hand, newIndex } = hitCard(deckIndex, deck, playerHand);
        setPlayerHand(hand);
        setDeckIndex(newIndex);
        
        const bustState = checkPlayerBust(hand);
        if (bustState) {
            setGameState(bustState);
        }
    };

    const handleStand = async () => {
        setGameState(GAME_STATES.DEALER_TURN);
        await animateDealerTurn();
    };

    const animateDealerTurn = async () => {
        let currentDealerHand = [...dealerHand];
        let currentIndex = deckIndex;
        
        while (calculateHandValue(currentDealerHand) < 17) {
            currentDealerHand.push(deck[currentIndex]);
            currentIndex++;
            
            await delay(1000);
            setDealerHand([...currentDealerHand]);
            setDeckIndex(currentIndex);
        }
        
        await delay(1000);
        const winnerState = determineWinner(playerHand, currentDealerHand);
        setGameState(winnerState);
    };


    return (
        <main className="min-h-screen bg-green-900">
            <Navbar />
            
            <div className="text-center py-20">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-2xl animate-bounce">
                    BLACKJACK
                </h1>
                
                {gameState === GAME_STATES.ROUND_END && (
                    <div className="mt-12 space-y-4">
                        <div className="flex flex-col gap-4 justify-center items-center">
                            <button 
                                onClick={startGame}
                                className="w-64 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl whitespace-nowrap"
                            >
                                Play Solo
                            </button>
                            <button 
                                onClick={() => {}}
                                className="w-64 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg opacity-60 cursor-not-allowed whitespace-nowrap relative"
                                disabled
                                title="Coming Soon - Multiplayer feature in development"
                            >
                                Play with Friends
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                    Soon
                                </span>
                            </button>
                            <Link 
                                href="/games/blackjack/notes"
                                className="w-64 bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-gray-700 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl whitespace-nowrap inline-block text-center"
                            >
                                Notes
                            </Link>
                        </div>
                    </div>
                )}
                
                {gameState === GAME_STATES.IN_PLAY && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">Dealer Hand</h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card 
                                        key={index} 
                                        card={card} 
                                        isFaceDown={index === 1 && gameState === GAME_STATES.IN_PLAY}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Controls */}
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={handleHit}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Hit
                            </button>
                            <button 
                                onClick={handleStand}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Stand
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.DEALER_TURN && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Dealer Turn Indicator */}
                        <div className="text-center">
                            <div className="inline-flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                <p className="text-white text-xl font-bold">Dealer is playing...</p>
                            </div>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_BLACKJACK && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)}) - BLACKJACK!
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-yellow-400 text-2xl font-bold">🎉 BLACKJACK! You Win! 🎉</p>
                            <button 
                                onClick={startGame}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                New Game
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_BUST && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)}) - BUST!
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-red-400 text-2xl font-bold">You Busted! Dealer Wins!</p>
                            <button 
                                onClick={startGame}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                New Game
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.DEALER_BUST && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)}) - BUST!
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-green-400 text-2xl font-bold">🎉 Dealer Busted! You Win! 🎉</p>
                            <button 
                                onClick={startGame}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                New Game
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.DEALER_WINS && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-red-400 text-2xl font-bold">Dealer Wins!</p>
                            <button 
                                onClick={startGame}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                New Game
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_WINS && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-green-400 text-2xl font-bold">🎉 You Win! 🎉</p>
                            <button 
                                onClick={startGame}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                New Game
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PUSH && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {dealerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Player Hand */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Your Hand ({calculateHandValue(playerHand)})
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-yellow-400 text-2xl font-bold">Push! It's a Tie!</p>
                            <button 
                                onClick={startGame}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                New Game
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
