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
    PLAYER_CHARLIE: 'player-charlie',
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
 * Returns special value -1 for 5-card charlie (only for players, not dealers)
 * @param {Array} hand - Array of card objects
 * @param {boolean} isDealer - Whether this is a dealer hand (no 5-card charlie)
 * @returns {number} Hand value (1-21, or >21 if bust, or -1 for 5-card charlie)
 */
export function calculateHandValue(hand, isDealer = false) {
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
    
    // Check for 5-card charlie only if not busted and not dealer
    if (!isDealer && hand.length >= 5 && value <= 21) {
        return -1; // Special value for 5-card charlie
    }
    
    // For dealers, never return 5-card charlie, just return the actual value
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
 * Determines if player busted or has 5-card charlie and returns appropriate game state
 * @param {Array} playerHand - Player's current hand
 * @returns {string|null} Game state or null
 */
export function checkPlayerBust(playerHand) {
    const handValue = calculateHandValue(playerHand);
    
    // Check for 5-card charlie first
    if (handValue === -1) {
        return GAME_STATES.PLAYER_CHARLIE;
    }
    
    // Check for bust
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
    while (calculateHandValue(hand, true) < 17) {
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
    const dealerValue = calculateHandValue(dealerHand, true);
    
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

/**
 * Calculates chip payout based on game outcome and bet amount
 * @param {string} gameState - Final game state
 * @param {number} betAmount - Amount wagered
 * @returns {number} Chip change (positive for wins, negative for losses, 0 for push)
 */
export function calculateChipChange(gameState, betAmount) {
    switch (gameState) {
        case GAME_STATES.PLAYER_BLACKJACK:
            // Blackjack pays 2.5x bet
            return Math.floor(betAmount * 2.5);
        case GAME_STATES.PLAYER_WINS:
        case GAME_STATES.DEALER_BUST:
        case GAME_STATES.PLAYER_CHARLIE:
            // Regular win pays 1:1
            return betAmount;
        case GAME_STATES.PLAYER_BUST:
        case GAME_STATES.DEALER_WINS:
            // Loss loses the bet
            return -betAmount;
        case GAME_STATES.PUSH:
            // Push returns the bet
            return 0;
        default:
            return 0;
    }
}


