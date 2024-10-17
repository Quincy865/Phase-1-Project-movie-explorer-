# Movie Explorer by Quincy Michael

Movie Explorer is a simple single-page web application that allows users to browse a list of movies, search for movies by title, and filter movies based on their rating. The app interacts with a local API (using `json-server`) to fetch movie data and it updates the page with movie information.

## Features

- **Fetch Movies**: Displays movies loaded from a local API.
- **Search Functionality**: Allows users to search for movies by title.
- **Rating Filter**: Users can filter movies based on their rating.
- **Movie Posters**: Each movie is displayed as a card with its title, poster, rating, release year, and description.

## Getting Started

- You need to have **Node.js** installed to use `json-server`.
  You can download Node.js from (https://nodejs.org/).

### Setup

1. Clone the repository or download the project files to your local machine.

2. Install `json-server` globally if you haven't already:
   ```bash
   npm install -g json-server
