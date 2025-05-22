#!/usr/bin/env python3
"""
CSV to FlashCard JSON Converter

This script converts a CSV file containing flashcard terms and definitions
into the JSON format used by the FlashCard application.

Usage:
    python3 csv_to_flashcards.py input.csv [output.json]

Input CSV Format:
    term,definition
    "404 Not Found","Error message for missing pages"
    "HTTP","Hypertext Transfer Protocol"

Output:
    Creates a JSON file compatible with the FlashCard application.
"""

import csv
import json
import sys
from pathlib import Path
from typing import List, Dict, Any

def read_csv_file(file_path: str) -> List[Dict[str, str]]:
    """Read terms and definitions from a CSV file.
    
    Args:
        file_path: Path to the input CSV file
        
    Returns:
        List of dictionaries containing 'term' and 'definition' keys
    """
    cards = []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                if len(row) >= 2 and row[0].strip() and row[1].strip():
                    term = row[0].strip()
                    definition = row[1].strip()
                    cards.append({
                        'term': f"What is {term}?" if '?' not in term else term,
                        'definition': definition
                    })
    except Exception as e:
        print(f"Error reading CSV file: {e}", file=sys.stderr)
        sys.exit(1)
    return cards

def create_flashcard_deck(
    cards: List[Dict[str, str]],
    deck_name: str = "My Flashcard Deck",
    description: str = "Generated from CSV",
    search_context: str = ""
) -> Dict[str, Any]:
    """Create a flashcard deck in the required JSON format.
    
    Args:
        cards: List of card dictionaries
        deck_name: Name of the flashcard deck
        description: Description of the deck
        search_context: Context for web searches
        
    Returns:
        Dictionary ready to be serialized to JSON
    """
    return {
        'name': deck_name,
        'description': description,
        'searchContext': search_context,
        'cards': cards
    }

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 csv_to_flashcards.py input.csv [output.json]", file=sys.stderr)
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else 'output.json'
    
    # Generate deck name from input filename
    deck_name = Path(input_file).stem.replace('_', ' ').title()
    
    print(f"Converting {input_file} to FlashCard JSON...")
    
    try:
        # Read and process the CSV file
        cards = read_csv_file(input_file)
        
        if not cards:
            print("No valid cards found in the input file.", file=sys.stderr)
            sys.exit(1)
            
        # Create the flashcard deck
        deck = create_flashcard_deck(
            cards=cards,
            deck_name=deck_name,
            description=f"Generated from {Path(input_file).name}",
            search_context=""
        )
        
        # Write the output file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(deck, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully created {output_file} with {len(cards)} cards.")
        
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
