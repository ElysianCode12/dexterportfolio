/**
 * Reusable component for displaying a hand of cards
 * @param {Array} hand - Array of card objects
 * @param {string} title - Hand title to display
 * @param {boolean} showValue - Whether to show hand value
 * @param {boolean} isDealer - Whether this is dealer's hand
 * @param {string} gameState - Current game state
 * @param {boolean} isFaceDown - Whether cards should be face down
 */
import Card from './Card';
import { calculateHandValue } from '../logic/gamelogic';
import { UI_CONSTANTS } from '../constants/constants';

const HandDisplay = ({ 
    hand, 
    title, 
    showValue = true, 
    isDealer = false, 
    gameState, 
    isFaceDown = false 
}) => {
    const handValue = calculateHandValue(hand);
    const displayValue = showValue ? ` (${handValue})` : '';
    
    return (
        <div className={UI_CONSTANTS.LAYOUT_STYLES.HAND_CONTAINER}>
            <h2 className={UI_CONSTANTS.TEXT_STYLES.HAND_TITLE}>
                {title}{displayValue}
            </h2>
            <div className={UI_CONSTANTS.LAYOUT_STYLES.CARDS_CONTAINER}>
                {hand.map((card, index) => (
                    <Card 
                        key={index} 
                        card={card} 
                        isFaceDown={isDealer && index === 1 && gameState === 'in-play'}
                    />
                ))}
            </div>
        </div>
    );
};

export default HandDisplay;
