/**
 * Game control buttons for hit and stand actions
 * @param {Function} onHit - Callback for hit action
 * @param {Function} onStand - Callback for stand action
 */
import { UI_CONSTANTS } from '../constants/constants';

const GameControls = ({ onHit, onStand }) => {
    return (
        <div className={UI_CONSTANTS.LAYOUT_STYLES.CONTROLS_CONTAINER}>
            <button 
                onClick={onHit}
                className={UI_CONSTANTS.BUTTON_STYLES.HIT}
            >
                {UI_CONSTANTS.MESSAGES.HIT}
            </button>
            <button 
                onClick={onStand}
                className={UI_CONSTANTS.BUTTON_STYLES.STAND}
            >
                {UI_CONSTANTS.MESSAGES.STAND}
            </button>
        </div>
    );
};

export default GameControls;
