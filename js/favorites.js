import Storage from './storage.js';

/**
 * Favorites module for managing favorite flashcards
 */
const Favorites = {
    /**
     * Toggle favorite status of a card
     * @param {string} category - Category of the card
     * @param {Object} card - Card object with term and definition
     * @returns {boolean} New favorite status (true if favorited, false if removed)
     */
    toggleFavorite(category, card) {
        const isFav = this.isFavorite(card.term);
        if (isFav) {
            Storage.removeFavorite(card.term);
            return false;
        } else {
            Storage.addFavorite(category, card);
            return true;
        }
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
    },
    
    /**
     * Get all favorites for a specific category
     * @param {string} category - Category to get favorites for
     * @returns {Array} Array of favorite cards
     */
    getFavoritesForCategory(category) {
        const favorites = this.getFavoritesByCategory();
        return favorites[category] || [];
    }
};

export default Favorites;
