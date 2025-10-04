/**
 * Blackjack game state constants
 * Used throughout the game to track current state
 */
export const GAME_STATES = {
    ROUND_END: 'round-end',
    IN_PLAY: 'in-play',
    DEALER_TURN: 'dealer-turn',
    PLAYER_BLACKJACK: 'player-blackjack',
    PLAYER_BUST: 'player-bust',
    DEALER_BUST: 'dealer-bust',
    DEALER_WINS: 'dealer-wins',
    PLAYER_WINS: 'player-wins',
    PUSH: 'push'
};

/**
 * Creates and shuffles a standard 52-card deck
 * @returns {Array} Shuffled deck of cards with suit and value properties
 */
export function getDeck() {
     
     const suits = ['♠', '♥', '♦', '♣'];
     const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
     const deck = [];
     
     for (const suit of suits) {
          for (const value of values) {
            deck.push({ suit, value });
          }
     }
     
     for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
     }
    return deck;
}

/**
 * Deals initial cards to dealer and players
 * @param {number} index - Starting deck index
 * @param {Array} deck - Shuffled deck of cards
 * @param {Array} players - Array of player names
 * @returns {Object} Object containing hands and updated deck index
 */
export function getInitialHand(index, deck, players) {
    let currentIndex = index;
    const hands = {};
    
    // Dealer gets first card
    hands.dealer = [deck[currentIndex]];
    currentIndex++;
    
    // Each player gets two cards
    for (const player of players) {
        hands[player] = [deck[currentIndex]];
        currentIndex++;
        hands[player].push(deck[currentIndex]);
        currentIndex++;
    }
    
    // Dealer gets second card
    hands.dealer.push(deck[currentIndex]);
    currentIndex++;
    
    return { hands, currentIndex };
}

/**
 * Adds a card to player's hand
 * @param {number} index - Current deck index
 * @param {Array} deck - Shuffled deck of cards
 * @param {Array} playerHand - Current player hand
 * @returns {Object} Updated hand and new deck index
 */
export function hitCard(index, deck, playerHand) {
    const newCard = deck[index];
    const updatedHand = [...playerHand, newCard];
    return { hand: updatedHand, newIndex: index + 1 };
}

/**
 * Calculates the optimal value of a blackjack hand
 * Handles aces as 1 or 11 to get closest to 21 without busting
 * @param {Array} hand - Array of card objects
 * @returns {number} Hand value (1-21, or >21 if bust)
 */
export function calculateHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    // Count non-ace cards first
    for (const card of hand) {
        if (card.value === 'A') {
            aces++;
        } else if (['J', 'Q', 'K'].includes(card.value)) {
            value += 10;
        } else {
            value += parseInt(card.value);
        }
    }
    
    // Handle aces optimally (11 unless it would cause bust)
    for (let i = 0; i < aces; i++) {
        if (value + 11 > 21) {
            value += 1;
        } else {
            value += 11;
        }
    }
    
    return value;
}

/**
 * Checks if hand is blackjack (21 with exactly 2 cards)
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if blackjack
 */
export function isBlackjack(hand) {
    return hand.length === 2 && calculateHandValue(hand) === 21;
}

/**
 * Checks if hand is bust (over 21)
 * @param {Array} hand - Array of card objects
 * @returns {boolean} True if bust
 */
export function isBust(hand) {
    return calculateHandValue(hand) > 21;
}

/**
 * Determines if player has blackjack and returns appropriate game state
 * @param {Array} playerHand - Player's current hand
 * @returns {string|null} Game state or null
 */
export function checkPlayerBlackjack(playerHand) {
    return isBlackjack(playerHand) ? GAME_STATES.PLAYER_BLACKJACK : null;
}

/**
 * Determines if player busted and returns appropriate game state
 * @param {Array} playerHand - Player's current hand
 * @returns {string|null} Game state or null
 */
export function checkPlayerBust(playerHand) {
    return isBust(playerHand) ? GAME_STATES.PLAYER_BUST : null;
}

/**
 * Simulates dealer's turn (hits until 17 or bust)
 * @param {number} deckIndex - Current deck position
 * @param {Array} deck - Shuffled deck of cards
 * @param {Array} dealerHand - Dealer's current hand
 * @returns {Object} Final dealer hand and updated deck index
 */
export function playDealerTurn(deckIndex, deck, dealerHand) {
    let currentIndex = deckIndex;
    let hand = [...dealerHand];
    
    // Dealer must hit until 17 or bust
    while (calculateHandValue(hand) < 17) {
        hand.push(deck[currentIndex]);
        currentIndex++;
    }
    
    return { hand, newIndex: currentIndex };
}

/**
 * Determines game winner based on hand values
 * @param {Array} playerHand - Player's final hand
 * @param {Array} dealerHand - Dealer's final hand
 * @returns {string} Game state indicating winner
 */
export function determineWinner(playerHand, dealerHand) {
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    
    if (dealerValue > 21) {
        return GAME_STATES.DEALER_BUST;
    } else if (dealerValue > playerValue) {
        return GAME_STATES.DEALER_WINS;
    } else if (playerValue > dealerValue) {
        return GAME_STATES.PLAYER_WINS;
    } else {
        return GAME_STATES.PUSH;
    }
}


