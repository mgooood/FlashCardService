import Storage from './storage.js';

/**
 * Favorites module for managing favorite flashcards
 */
const Favorites = {
    /**
     * Add a card to favorites
     * @param {string} category - Category of the card
     * @param {Object} card - Card object with term and definition
     * @returns {boolean} True if the card was added to favorites
     */
    addFavorite(category, card) {
        return Storage.addFavorite(category, card);
    },
    
    /**
     * Check if a card is in favorites
     * @param {string} term - Term to check
     * @returns {boolean} True if the card is in favorites
     */
    isFavorite(term) {
        return Storage.isFavorite(term);
    },
    
    /**
     * Get all favorites grouped by category
     * @returns {Object} Favorites grouped by category
     */
    getFavoritesByCategory() {
        return Storage.getFavoritesByCategory();
    },
    
    /**
     * Check if there are any favorites
     * @returns {boolean} True if there are favorites
     */
    hasFavorites() {
        return Storage.getFavorites().length > 0;
    }
};

export default Favorites;
