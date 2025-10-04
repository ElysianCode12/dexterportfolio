/**
 * Utility functions for blackjack game
 * Contains timing constants and helper functions
 */

/**
 * Creates a delay for animations
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Animation timing constants for consistent UX
 * All values in milliseconds
 */
export const ANIMATION_TIMINGS = {
    CARD_DEAL: 300,      // Delay between card deals
    DEALER_TURN: 1000,   // Delay between dealer hits
    FINAL_DELAY: 1000    // Delay before showing final result
};
