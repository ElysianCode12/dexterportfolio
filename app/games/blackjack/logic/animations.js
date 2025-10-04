/**
 * Animation logic for blackjack game
 * Handles card dealing and dealer turn animations
 */
import { delay, ANIMATION_TIMINGS } from '../utils/utils';

/**
 * Animates the initial card dealing sequence
 * @param {Object} hands - Object containing dealer and player hands
 * @param {Function} setDealerHand - State setter for dealer hand
 * @param {Function} setPlayerHand - State setter for player hand
 */
export const dealCards = async (hands, setDealerHand, setPlayerHand) => {
    setDealerHand([hands.dealer[0]]);
    await delay(ANIMATION_TIMINGS.CARD_DEAL);
    
    setPlayerHand([hands.player1[0]]);
    await delay(ANIMATION_TIMINGS.CARD_DEAL);
    
    setPlayerHand([...hands.player1]);
    await delay(ANIMATION_TIMINGS.CARD_DEAL);
    
    setDealerHand([...hands.dealer]);
};

/**
 * Animates dealer's turn with delays between each card
 * @param {Array} dealerHand - Current dealer hand
 * @param {Array} deck - Shuffled deck of cards
 * @param {number} deckIndex - Current deck position
 * @param {Function} setDealerHand - State setter for dealer hand
 * @param {Function} setDeckIndex - State setter for deck index
 * @param {Function} calculateHandValue - Function to calculate hand value
 * @param {Function} determineWinner - Function to determine winner
 * @param {Array} playerHand - Player's final hand
 * @param {Function} setGameState - State setter for game state
 */
export const animateDealerTurn = async (
    dealerHand, 
    deck, 
    deckIndex, 
    setDealerHand, 
    setDeckIndex, 
    calculateHandValue, 
    determineWinner, 
    playerHand, 
    setGameState
) => {
    let currentDealerHand = [...dealerHand];
    let currentIndex = deckIndex;
    
    while (calculateHandValue(currentDealerHand) < 17) {
        currentDealerHand.push(deck[currentIndex]);
        currentIndex++;
        
        await delay(ANIMATION_TIMINGS.DEALER_TURN);
        setDealerHand([...currentDealerHand]);
        setDeckIndex(currentIndex);
    }
    
    await delay(ANIMATION_TIMINGS.FINAL_DELAY);
    const winnerState = determineWinner(playerHand, currentDealerHand);
    setGameState(winnerState);
};
