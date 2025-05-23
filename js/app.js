// DOM Elements
const flashcard = document.querySelector('.flashcard');
const flashcardFront = document.querySelector('.flashcard-front p');
const flashcardBack = document.querySelector('.flashcard-back p');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const flipBtn = document.getElementById('flipBtn');
const explainMoreBtn = document.getElementById('explainMore');
const cardCounter = document.getElementById('cardCounter');
const categorySelect = document.getElementById('category');
const themeToggle = document.getElementById('themeToggle');

// State
let currentDeck = [];
let currentCardIndex = 0;
let isFlipped = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    
    // Set up event listeners
    setupEventListeners();
    
    // Auto-select and load the first category if available
    if (categorySelect.options.length > 1) {  // First option is the default "Select a category"
        categorySelect.selectedIndex = 1;  // Select first actual category
        categorySelect.dispatchEvent(new Event('change'));  // Trigger the change event
    }
});

function setupEventListeners() {
    // Category selection
    categorySelect.addEventListener('change', handleCategoryChange);
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousCard);
    nextBtn.addEventListener('click', showNextCard);
    
    // Card interaction
    document.querySelector('.flashcard').addEventListener('click', toggleCard);
    flipBtn.addEventListener('click', toggleCard);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
}

// Handle category selection
async function handleCategoryChange(event) {
    const category = event.target.value;
    if (!category) return;
    
    try {
        const response = await fetch(`data/${category}.json`);
        if (!response.ok) throw new Error('Failed to load category');
        
        const data = await response.json();
        
        // Store the category data in the option element for later use
        // Commented out search context functionality
        // const option = categorySelect.options[categorySelect.selectedIndex];
        // option.dataset.jsonData = JSON.stringify({
        //     searchContext: data.searchContext || ''
        // });
        
        currentDeck = shuffleArray([...data.cards]);
        currentCardIndex = 0;
        isFlipped = false;
        
        updateCardDisplay();
        updateNavigationButtons();
        explainMoreBtn.style.display = 'inline-block';
        flipBtn.disabled = false;
        
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
        document.querySelector('.flashcard-front p').textContent = 'No cards available in this category.';
        document.querySelector('.flashcard-back p').textContent = '';
        return;
    }

    const currentCard = currentDeck[currentCardIndex];
    // Commented out category data retrieval for search context
    // const currentCategory = categorySelect.options[categorySelect.selectedIndex];
    // const categoryData = currentCategory.dataset.jsonData ? JSON.parse(currentCategory.dataset.jsonData) : {};
    
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
    
    // Update the Explain More button to open Bing Copilot
    const searchTerm = encodeURIComponent(currentCard.term.replace(/^What is |\?$/g, ''));
    // Commented out search context from the URL
    // const searchContext = categoryData.searchContext ? ` ${encodeURIComponent(categoryData.searchContext)}` : '';
    explainMoreBtn.href = `https://copilot.microsoft.com/?q=${searchTerm}`;
    explainMoreBtn.target = '_blank';
    explainMoreBtn.rel = 'noopener noreferrer';
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
    prevBtn.disabled = currentCardIndex === 0;
    nextBtn.disabled = currentCardIndex === currentDeck.length - 1;
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
            if (!prevBtn.disabled) showPreviousCard();
            break;
        case 'ArrowRight':
            if (!nextBtn.disabled) showNextCard();
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
    themeToggle.querySelector('.theme-icon').textContent = icon;
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
