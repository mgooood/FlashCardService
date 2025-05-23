// DOM Elements
const flashcard = document.querySelector('.flashcard');
const flashcardFront = document.querySelector('.flashcard-front p');
const flashcardBack = document.querySelector('.flashcard-back p');
const cardCounter = document.getElementById('cardCounter');
const categorySelect = document.getElementById('category');

// Cache DOM elements with data-js attributes
const elements = {
  prevBtn: document.querySelector('[data-js="nav-prev"]'),
  nextBtn: document.querySelector('[data-js="nav-next"]'),
  flipBtn: document.querySelector('[data-js="flip-btn"]'),
  explainMoreBtn: document.querySelector('[data-js="explain-btn"]'),
  themeToggle: document.querySelector('[data-js="theme-toggle"]')
};

// State
let currentDeck = [];
let currentCardIndex = 0;
let isFlipped = false;
let data = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    
    // Set up event listeners
    setupEventListeners();
    
    // Auto-select and load the first category if available
    if (categorySelect.options.length > 1) {
        categorySelect.selectedIndex = 1;
        categorySelect.dispatchEvent(new Event('change'));
    }
});

/**
 * Sets up all event listeners for the application
 */
function setupEventListeners() {
    // Category selection
    categorySelect?.addEventListener('change', handleCategoryChange);
    
    // Navigation buttons
    elements.prevBtn?.addEventListener('click', showPreviousCard);
    elements.nextBtn?.addEventListener('click', showNextCard);
    
    // Card interaction
    flashcard?.addEventListener('click', toggleCard);
    elements.flipBtn?.addEventListener('click', toggleCard);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Theme toggle
    elements.themeToggle?.addEventListener('click', toggleTheme);
}

// Handle category selection
async function handleCategoryChange(event) {
    const category = event.target.value;
    if (!category) return;
    
    try {
        const response = await fetch(`data/${category}.json`);
        if (!response.ok) throw new Error('Failed to load category');
        
        data = await response.json();
        
        currentDeck = shuffleArray([...data.cards]);
        currentCardIndex = 0;
        isFlipped = false;
        
        updateCardDisplay();
        updateNavigationButtons();
        elements.explainMoreBtn.style.display = 'inline-block';
        elements.flipBtn.disabled = false;
        
        // Reset card to front when changing categories
        if (flashcard.classList.contains('flipped')) {
            flashcard.classList.remove('flipped');
        }
    } catch (error) {
        console.error('Error loading category:', error);
        alert('Failed to load the selected category. Please try again.');
    }
}

// Update the card display with current card data
function updateCardDisplay() {
    if (currentDeck.length === 0) {
        flashcardFront.textContent = 'No cards available in this category.';
        flashcardBack.textContent = '';
        return;
    }

    const currentCard = currentDeck[currentCardIndex];
    
    // Update front and back of the card
    flashcardFront.textContent = currentCard.term;
    flashcardBack.textContent = currentCard.definition;
    
    // Reset card to front when changing cards
    if (isFlipped) {
        flashcard.classList.add('flipped');
    } else {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
    
    // Update card counter
    cardCounter.textContent = `${currentCardIndex + 1}/${currentDeck.length}`;
    
    // Update the Explain More button to open Bing Copilot with search context
    const searchTerm = currentCard.term.replace('?', '');
    const searchContext = data.searchContext ? ` ${data.searchContext}` : '';
    elements.explainMoreBtn.href = `https://copilot.microsoft.com/?q=${encodeURIComponent(searchTerm + searchContext)}`;
    elements.explainMoreBtn.target = '_blank';
    elements.explainMoreBtn.rel = 'noopener noreferrer';
}

// Reset card to front view
function resetCardState() {
    if (isFlipped) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
}

// Navigation functions
function showNextCard() {
    resetCardState();
    if (currentCardIndex < currentDeck.length - 1) {
        currentCardIndex++;
        updateCardDisplay();
        updateNavigationButtons();
    }
}

function showPreviousCard() {
    resetCardState();
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateCardDisplay();
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    elements.prevBtn.disabled = currentCardIndex === 0;
    elements.nextBtn.disabled = currentCardIndex === currentDeck.length - 1;
}

// Toggle card flip
function toggleCard() {
    const flashcard = document.querySelector('.flashcard');
    flashcard.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

// Handle keyboard navigation
function handleKeyDown(event) {
    if (currentDeck.length === 0) return;
    
    switch(event.key) {
        case 'ArrowLeft':
            if (!elements.prevBtn.disabled) showPreviousCard();
            break;
        case 'ArrowRight':
            if (!elements.nextBtn.disabled) showNextCard();
            break;
        case ' ':
        case 'Enter':
            event.preventDefault();
            toggleCard();
            break;
    }
}

// Theme functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = theme === 'dark' ? '☀️' : '🌓';
    elements.themeToggle.querySelector('.theme-icon').textContent = icon;
}

// Utility function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}
