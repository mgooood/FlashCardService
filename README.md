# FlashCard App

An interactive flashcard web application for learning and memorization. This application allows users to study with digital flashcards, featuring a clean, responsive design with light/dark mode support.

## Features

- Interactive 3D flip animation for cards
- Mobile-first responsive design
- Light/Dark theme with system preference detection
- Shuffled card order for varied study sessions
- "Explain More" button to search terms on Bing
- Keyboard navigation support (arrow keys, space/enter to flip)
- Card counter to track progress
- Clean, accessible UI with smooth animations

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for local development server)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flashcard-app.git
   cd flashcard-app
   ```

2. For local development (optional):
   - Install `http-server` globally:
     ```bash
     npm install -g http-server
     ```
   - Start the local server:
     ```bash
     http-server -p 8080
     ```
   - Open your browser to `http://localhost:8080`

### Using GitHub Pages

1. Push your code to a GitHub repository
2. Go to Repository Settings > Pages
3. Select the `main` branch and save
4. Your app will be available at `https://yourusername.github.io/repository-name`

## How to Use

1. **Select a category** from the dropdown menu
2. **Click on the card** or press the "Flip Card" button to reveal the answer
3. Use the **arrow buttons** or **keyboard arrows** to navigate between cards
4. Click "Explain More" to search the current term on Bing
5. Toggle between light and dark mode using the theme button in the top-right corner

## Adding New Flashcard Decks

1. Create a new JSON file in the `data/` directory
2. Follow this structure:
   ```json
   {
       "name": "Category Name",
       "description": "Brief description of the category",
       "searchContext": "Additional context for web searches (e.g., 'JavaScript programming' or 'web development')",
       "cards": [
           {
               "term": "Term or question",
               "definition": "Definition or answer"
           },
           // Add more cards...
       ]
   }
   ```
3. Add a new option to the category dropdown in `index.html`:
   ```html
   <option value="yourfilename">Category Display Name</option>
   ```

### Search Context Explained

The `searchContext` field in the JSON file is used to provide additional context when users click the "Explain More" button. This ensures that search results are more relevant to the specific subject matter. For example:

- For a JavaScript category: `"searchContext": "JavaScript programming"`
- For a biology category: `"searchContext": "biology term"`

This context is automatically combined with the card's term when performing a web search.

## Code Style & Architecture

### Button System

The application uses a consistent button system with the following features:

- **Base Button Class**: `.btn-base` provides consistent styling for all buttons
- **Icon Buttons**: Use `.btn-icon` for icon-only buttons
- **JavaScript Hooks**: Use `data-js` attributes instead of classes for JavaScript functionality
  - `data-js="nav-prev"`: Previous navigation button
  - `data-js="nav-next"`: Next navigation button
  - `data-js="flip-btn"`: Flip card button
  - `data-js="explain-btn"`: Explain more button
  - `data-js="theme-toggle"`: Theme toggle button

### JavaScript Architecture

- DOM elements are cached at the top of the file
- Event listeners are set up in `setupEventListeners()`
- State is managed in dedicated variables
- Functions are organized by feature

### CSS Organization

- Variables are defined in `:root`
- Base styles come first
- Component styles follow
- Media queries are at the bottom
- Button styles are consolidated in the button system

## Development

### Adding New Buttons

1. Add the button to HTML with appropriate classes and data attributes:
   ```html
   <button class="btn-base" data-js="your-button">Button Text</button>
   ```

2. In JavaScript, reference it using the data attribute:
   ```javascript
   const yourButton = document.querySelector('[data-js="your-button"]');
   ```

### Styling Guidelines

- Use CSS variables for theming
- Keep styles scoped to components
- Follow mobile-first approach
- Use semantic class names

## Browser Support

This app is designed to work on modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

This application includes several accessibility features:
- Keyboard navigation
- ARIA attributes for screen readers
- Sufficient color contrast
- Focus indicators for keyboard users
- Semantic HTML structure

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
