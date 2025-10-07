/**
 * Animation utilities for blackjack game
 * Handles timing and visual effects only
 */
import { UI_CONSTANTS } from '../constants/constants';

/**
 * Simple delay utility
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Animation timing constants (re-exported from UI_CONSTANTS)
 */
export const ANIMATION_TIMINGS = UI_CONSTANTS.ANIMATION_TIMINGS;
