/**
 * Card component for displaying playing cards
 * @param {Object} card - Card object with suit and value
 * @param {boolean} isFaceDown - Whether to show card back
 */
const Card = ({ card, isFaceDown = false }) => {
    if (isFaceDown) {
        return (
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-4 shadow-2xl border-2 border-red-400 min-w-[100px] h-[140px] flex flex-col justify-center items-center relative transform hover:scale-105 transition-all duration-200 animate-deal">
                <div className="text-white text-3xl font-bold opacity-90">🂠</div>
                <div className="text-white text-lg font-bold opacity-70 mt-1">CASINO</div>
            </div>
        );
    }

    const isRed = card.suit === '♥' || card.suit === '♦';
    const colorClass = isRed ? 'text-red-600' : 'text-black';
    
    return (
        <div className="bg-white rounded-xl p-4 shadow-2xl border-2 border-gray-300 min-w-[100px] h-[140px] flex flex-col justify-between relative transform hover:scale-105 transition-all duration-200 animate-deal">
            <div className="absolute top-2 left-2 text-lg font-bold">
                <div className={colorClass}>{card.value}</div>
                <div className={`text-sm ${colorClass}`}>{card.suit}</div>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
                <div className={`text-6xl ${colorClass}`}>{card.suit}</div>
            </div>
            
            <div className="absolute bottom-2 right-2 text-lg font-bold transform rotate-180">
                <div className={colorClass}>{card.value}</div>
                <div className={`text-sm ${colorClass}`}>{card.suit}</div>
            </div>
        </div>
    );
};

export default Card;
