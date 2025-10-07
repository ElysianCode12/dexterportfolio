/**
 * UI constants and styling for blackjack game
 * Centralized styling and messaging for consistent UI
 */

export const UI_CONSTANTS = {
    MESSAGES: {
        BLACKJACK: "🎉 BLACKJACK! You Win! 🎉",
        PLAYER_BUST: "You Busted! Dealer Wins!",
        DEALER_BUST: "🎉 Dealer Busted! You Win! 🎉",
        DEALER_WINS: "Dealer Wins!",
        PLAYER_WINS: "🎉 You Win! 🎉",
        PUSH: "Push! It's a Tie!",
        DEALER_PLAYING: "Dealer is playing...",
        START_GAME: "START GAME",
        NEW_GAME: "New Game",
        PLAY_AGAIN: "Play Again",
        PLAY_SOLO: "Play Solo",
        PLAY_WITH_FRIENDS: "Play with Friends",
        HIT: "Hit",
        STAND: "Stand",
        GAME_OVER: "Game Over!",
        OUT_OF_CHIPS: "You're out of chips!"
    },
    
    BUTTON_STYLES: {
        START_GAME: "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl",
        NEW_GAME: "mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg",
        PLAY_AGAIN: "mt-4 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg",
        PLAY_SOLO: "w-64 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-lg text-2xl shadow-lg transform hover:scale-105 transition-all duration-200 hover:shadow-xl whitespace-nowrap",
        PLAY_WITH_FRIENDS: "w-64 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg opacity-60 cursor-not-allowed whitespace-nowrap relative",
        HIT: "bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg",
        STAND: "bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg"
    },
    
    TEXT_STYLES: {
        TITLE: "text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 drop-shadow-2xl animate-bounce",
        HAND_TITLE: "text-white text-2xl font-bold mb-4",
        GAME_OVER: "text-2xl font-bold",
        DEALER_INDICATOR: "text-white text-xl font-bold"
    },
    
    LAYOUT_STYLES: {
        MAIN: "min-h-screen bg-green-900",
        CONTAINER: "text-center py-20",
        GAME_AREA: "mt-12 space-y-8",
        HAND_CONTAINER: "bg-black bg-opacity-30 rounded-lg p-6 mx-4",
        CARDS_CONTAINER: "flex justify-center space-x-4",
        CONTROLS_CONTAINER: "flex justify-center space-x-4",
        DEALER_INDICATOR: "inline-flex items-center space-x-2",
        SPINNER: "animate-spin rounded-full h-6 w-6 border-b-2 border-white"
    },
    
    ANIMATION_TIMINGS: {
        CARD_DEAL: 300,
        DEALER_TURN: 1000,
        FINAL_DELAY: 1000
    }
};
