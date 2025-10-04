/**
 * Game over message component with new game button
 * @param {string} message - Message to display
 * @param {Function} onNewGame - Callback for new game action
 * @param {string} messageColor - CSS class for message color
 */
import { UI_CONSTANTS } from '../constants/constants';

const GameOverMessage = ({ message, onNewGame, messageColor = "text-yellow-400" }) => {
    return (
        <div className="text-center">
            <p className={`${UI_CONSTANTS.TEXT_STYLES.GAME_OVER} ${messageColor}`}>
                {message}
            </p>
            <button 
                onClick={onNewGame}
                className={UI_CONSTANTS.BUTTON_STYLES.NEW_GAME}
            >
                {UI_CONSTANTS.MESSAGES.NEW_GAME}
            </button>
        </div>
    );
};

export default GameOverMessage;
