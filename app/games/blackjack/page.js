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
    determineWinner,
    calculateChipChange
} from "./logic/gamelogic";
import { delay } from "./logic/animations";
import Card from "./components/Card";
import HandDisplay from "./components/HandDisplay";
import GameControls from "./components/GameControls";
import DealerTurnIndicator from "./components/DealerTurnIndicator";

export default function BlackjackGame() {
    const [gameState, setGameState] = useState(GAME_STATES.ROUND_END);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [deck, setDeck] = useState([]);
    const [deckIndex, setDeckIndex] = useState(0);
    const [chips, setChips] = useState(0);
    const [bet, setBet] = useState(10);
    const [showBetting, setShowBetting] = useState(false);
    const [chipChange, setChipChange] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    
    // Helper function to handle game end logic
    const handleGameEnd = (gameState) => {
        const chipChangeAmount = calculateChipChange(gameState, bet);
        const newChipTotal = chips + chipChangeAmount;
        
        setChipChange(chipChangeAmount);
        setChips(newChipTotal);
        setGameState(gameState);
        
        // Check if player is out of chips
        if (newChipTotal <= 0) {
            setGameOver(true);
        }
    };
    
    const resetGame = () => {
        setGameState(GAME_STATES.IN_PLAY);
        setPlayerHand([]);
        setDealerHand([]);
        setDeckIndex(0);
    };

    const startGame = async () => {
        // Give user 100 chips when starting a new game
        setChips(100);
        setBet(10);
        setShowBetting(true);
        setGameOver(false);
        setChipChange(0);
    };

    const playAgain = async () => {
        setBet(Math.min(bet, chips)); // Adjust bet if needed
        setShowBetting(true);
        setChipChange(0);
    };

    const confirmBet = async () => {
        resetGame();
        
        const newDeck = getDeck();
        setDeck(newDeck);
        
        const { hands, currentIndex } = getInitialHand(0, newDeck, ['player1']);
        
        // Animate card dealing
        await dealCards(hands);
        
        setDeckIndex(currentIndex);
        setShowBetting(false);
        
        // Check for natural blackjack
        const blackjackState = checkPlayerBlackjack(hands.player1);
        if (blackjackState) {
            handleGameEnd(blackjackState);
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
        

    const handleHit = () => {
        const { hand, newIndex } = hitCard(deckIndex, deck, playerHand);
        setPlayerHand(hand);
        setDeckIndex(newIndex);
        
        const bustState = checkPlayerBust(hand);
        if (bustState) {
            handleGameEnd(bustState);
            return;
        }
        
        // Auto-stand if player reaches exactly 21
        if (calculateHandValue(hand) === 21) {
            handleStand();
        }
    };

    const handleStand = async () => {
        setGameState(GAME_STATES.DEALER_TURN);
        await animateDealerTurn();
    };

    const animateDealerTurn = async () => {
        let currentDealerHand = [...dealerHand];
        let currentIndex = deckIndex;
        
        // Use centralized dealer logic
        const { hand: finalDealerHand, newIndex } = playDealerTurn(currentIndex, deck, currentDealerHand);
        
        // Animate the dealer's cards being dealt
        while (currentDealerHand.length < finalDealerHand.length) {
            currentDealerHand.push(deck[currentIndex]);
            currentIndex++;
            
            await delay(1000);
            setDealerHand([...currentDealerHand]);
            setDeckIndex(currentIndex);
        }
        
        await delay(1000);
        const winnerState = determineWinner(playerHand, finalDealerHand);
        handleGameEnd(winnerState);
    };


    return (
        <main className="min-h-screen bg-green-900">
            <Navbar />
            
            <div className="text-center py-20">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-2xl animate-bounce">
                    BLACKJACK
                </h1>
                
                {gameOver && (
                    <div className="mt-12 space-y-8">
                        <div className="bg-red-900 border-2 border-red-500 rounded-lg p-8 mx-4 max-w-md mx-auto">
                            <h2 className="text-white text-3xl font-bold mb-6 text-center">Game Over!</h2>
                            <p className="text-red-300 text-xl text-center mb-6">You&apos;re out of chips!</p>
                            <div className="text-center">
                                <button 
                                    onClick={startGame}
                                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg text-xl"
                                >
                                    Start New Game
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.ROUND_END && !gameOver && (
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

                {showBetting && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-900 border-2 border-yellow-500 rounded-lg p-8 mx-4 max-w-md w-full">
                            <h2 className="text-white text-3xl font-bold mb-6 text-center">Place Your Bet</h2>
                            
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-white text-xl font-semibold">Your Chips:</span>
                                    <span className="text-yellow-400 text-2xl font-bold min-w-16 text-center">{chips}</span>
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <span className="text-white text-xl font-semibold">Bet Amount:</span>
                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={() => setBet(Math.max(10, bet - 10))}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={bet <= 10}
                                        >
                                            -
                                        </button>
                                        <span className="text-green-400 text-2xl font-bold min-w-16 text-center">{bet}</span>
                                        <button 
                                            onClick={() => setBet(Math.min(100, bet + 10))}
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={bet >= 100 || bet >= chips}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                {bet >= chips && chips > 0 && (
                                    <div className="text-center">
                                        <p className="text-yellow-400 text-lg">Maximum bet: {chips} chips</p>
                                    </div>
                                )}
                                
                                <div className="text-center">
                                    <button 
                                        onClick={confirmBet}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-lg text-xl"
                                    >
                                        Confirm Bet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {gameState === GAME_STATES.IN_PLAY && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand */}
                        <HandDisplay 
                            hand={dealerHand}
                            title="Dealer Hand"
                            showValue={false}
                            isDealer={true}
                            gameState={gameState}
                        />

                        {/* Player Hand */}
                        <HandDisplay 
                            hand={playerHand}
                            title="Your Hand"
                            showValue={true}
                            isDealer={false}
                        />

                        {/* Game Controls */}
                        <GameControls 
                            onHit={handleHit}
                            onStand={handleStand}
                        />
                        
                        {/* Chip and Bet Display */}
                        <div className="mt-4 flex justify-end mr-8">
                            <div className="bg-gray-800 border-2 border-yellow-500 rounded-lg p-4 min-w-48">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-lg font-semibold">Chips</span>
                                    <span className="text-yellow-400 text-lg font-bold">{chips}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-white text-lg font-semibold">Bet</span>
                                    <span className="text-green-400 text-lg font-bold">{bet}</span>
                                </div>
                                {chipChange !== 0 && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-white text-lg font-semibold">Result</span>
                                        <span className={`text-lg font-bold ${chipChange > 0 ? 'text-green-400' : chipChange < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                                            {chipChange > 0 ? `+${chipChange}` : chipChange}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.DEALER_TURN && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                        <DealerTurnIndicator />
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_BLACKJACK && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                            <p className="text-green-400 text-lg mt-2">Won {chipChange} chips (2.5x payout)</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_BUST && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                            <p className="text-red-400 text-lg mt-2">Lost {Math.abs(chipChange)} chips</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_CHARLIE && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                                Your Hand - 5 CARD CHARLIE!
                            </h2>
                            <div className="flex justify-center space-x-4">
                                {playerHand.map((card, index) => (
                                    <Card key={index} card={card} />
                                ))}
                            </div>
                        </div>

                        {/* Game Over Message */}
                        <div className="text-center">
                            <p className="text-purple-400 text-2xl font-bold">🎉 5 CARD CHARLIE! You Win! 🎉</p>
                            <p className="text-purple-300 text-lg mt-2">You got 5 cards without busting!</p>
                            <p className="text-green-400 text-lg mt-2">Won {chipChange} chips</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.DEALER_BUST && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)}) - BUST!
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
                            <p className="text-green-400 text-lg mt-2">Won {chipChange} chips</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.DEALER_WINS && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                            <p className="text-red-400 text-lg mt-2">Lost {Math.abs(chipChange)} chips</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PLAYER_WINS && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                            <p className="text-green-400 text-lg mt-2">Won {chipChange} chips</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}

                {gameState === GAME_STATES.PUSH && (
                    <div className="mt-12 space-y-8">
                        {/* Dealer Hand - All cards revealed */}
                        <div className="bg-black bg-opacity-30 rounded-lg p-6 mx-4">
                            <h2 className="text-white text-2xl font-bold mb-4">
                                Dealer Hand ({calculateHandValue(dealerHand, true)})
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
                            <p className="text-yellow-400 text-2xl font-bold">Push! It&apos;s a Tie!</p>
                            <p className="text-yellow-400 text-lg mt-2">Bet returned (no chips won/lost)</p>
                            <button 
                                onClick={playAgain}
                                className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
