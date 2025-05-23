# FlashCard App

A simple, effective flashcard web application for focused studying and memorization. Create your own flashcard decks to study any subject with a clean, distraction-free interface.

## Features

- Simple, clean interface for focused studying
- Mobile-friendly design for studying anywhere
- Light/Dark theme with system preference detection
- Shuffled card order for better retention
- Quick web search for more information
- Keyboard navigation (arrow keys, space/enter to flip)
- Track your progress with card counter
- No signup or installation required

## Quick Start

1. **Fork this repository** to your GitHub account
2. **Add your flashcard decks** as JSON files in the `/data` directory (see below for format)
3. **Deploy to GitHub Pages** or any static hosting service

## Creating Flashcard Decks

1. Create a new JSON file in the `/data` directory
2. Use this simple format:
   ```json
   {
     "name": "My Study Deck",
     "description": "Brief description of these flashcards",
     "searchContext": "Optional subject for web searches",
     "cards": [
       {
         "term": "Question or term to study",
         "definition": "The answer or definition"
       },
       {
         "term": "Another question",
         "definition": "Another answer"
       }
     ]
   }
   ```

3. Your new deck will automatically appear in the category dropdown

## Running Locally

For testing your decks before deploying:

1. Install a simple HTTP server:
   ```bash
   npm install -g http-server
   ```
2. Start the server:
   ```bash
   http-server -p 8080
   ```
3. Open `http://localhost:8080` in your browser

## Deploying Your Study App

### GitHub Pages (Easiest)
1. Push your repository to GitHub
2. Go to Settings > Pages
3. Select the `main` branch and click Save
4. Your study app will be available at `yourusername.github.io/your-repo-name`

### Other Hosting
This is a static web app, so it can be hosted anywhere that serves HTML/CSS/JS:
- Netlify
- Vercel
- Cloudflare Pages
- Any web hosting service

## Tips for Effective Studying

- Keep cards focused on one concept
- Use the shuffle feature to test recall in different orders
- The "Explain More" button opens Bing for additional context
- Study in short, frequent sessions for best retention

## Example Decks

Included example decks:
- Technical Support Fundamentals
- Computer Networking Basics

## License

MIT Licensed. Use this app to create study materials for any subject.
