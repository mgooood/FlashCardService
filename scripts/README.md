# FlashCard Service Scripts

This directory contains utility scripts for the FlashCard application.

## CSV to JSON Converter

Convert CSV files into the FlashCard JSON format.

### Prerequisites

- Python 3.6 or higher
- No additional packages required (uses standard library only)

### Usage

1. Prepare your CSV file with this format:
   ```
   Term,Definition
   404 Not Found,An error message you might see on websites
   HTTP,Hypertext Transfer Protocol
   ```

2. Run the converter:
   ```bash
   python3 scripts/csv_to_flashcards.py input.csv output.json
   ```

### Arguments

- `input.csv`: Path to your CSV file (required)
- `output.json`: Path for the output JSON file (optional, defaults to `output.json` in current directory)

### Example

```bash
# Basic usage
python3 scripts/csv_to_flashcards.py ~/Downloads/terms.csv data/new_deck.json

# Using default output filename
python3 scripts/csv_to_flashcards.py terms.csv
```

### Notes

- The script automatically adds "What is" to terms that aren't questions
- Empty lines are skipped
- The output is formatted for readability with 2-space indentation
