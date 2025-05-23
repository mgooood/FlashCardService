/**
 * Storage utility for handling favorites in localStorage
 */

const Storage = {
    /**
     * Get all favorites from localStorage
     * @returns {Array} Array of favorite cards
     */
    getFavorites() {
        return JSON.parse(localStorage.getItem('flashcardFavorites') || '[]');
    },
    
    /**
     * Save favorites to localStorage
     * @param {Array} favorites - Array of favorite cards to save
     */
    saveFavorites(favorites) {
        localStorage.setItem('flashcardFavorites', JSON.stringify(favorites));
    },
    
    /**
     * Clear all favorites from localStorage
     */
    clearAll() {
        localStorage.removeItem('flashcardFavorites');
    },
    
    /**
     * Add a card to favorites
     * @param {string} category - Category of the card
     * @param {Object} card - Card object with term and definition
     * @returns {Array} Updated favorites array
     */
    addFavorite(category, card) {
        const favorites = this.getFavorites();
        if (!this.isFavorite(card.term)) {
            favorites.push({ 
                category, 
                term: card.term, 
                definition: card.definition 
            });
            this.saveFavorites(favorites);
        }
        return favorites;
    },
    
    /**
     * Remove a card from favorites by term
     * @param {string} term - Term of the card to remove
     * @returns {Array} Updated favorites array
     */
    removeFavorite(term) {
        const favorites = this.getFavorites().filter(fav => fav.term !== term);
        this.saveFavorites(favorites);
        return favorites;
    },
    
    /**
     * Check if a card is in favorites
     * @param {string} term - Term to check
     * @returns {boolean} True if the card is in favorites
     */
    isFavorite(term) {
        return this.getFavorites().some(fav => fav.term === term);
    },
    
    /**
     * Get all favorites grouped by category
     * @returns {Object} Favorites grouped by category
     */
    getFavoritesByCategory() {
        return this.getFavorites().reduce((acc, fav) => {
            if (!acc[fav.category]) acc[fav.category] = [];
            acc[fav.category].push({
                term: fav.term,
                definition: fav.definition
            });
            return acc;
        }, {});
    }
};

export default Storage;
