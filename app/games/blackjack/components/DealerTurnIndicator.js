/**
 * Loading indicator for dealer's turn
 * Shows spinner and "Dealer is playing..." message
 */
import { UI_CONSTANTS } from '../constants/constants';

const DealerTurnIndicator = () => {
    return (
        <div className="text-center">
            <div className={UI_CONSTANTS.LAYOUT_STYLES.DEALER_INDICATOR}>
                <div className={UI_CONSTANTS.LAYOUT_STYLES.SPINNER}></div>
                <p className={UI_CONSTANTS.TEXT_STYLES.DEALER_INDICATOR}>
                    {UI_CONSTANTS.MESSAGES.DEALER_PLAYING}
                </p>
            </div>
        </div>
    );
};

export default DealerTurnIndicator;
