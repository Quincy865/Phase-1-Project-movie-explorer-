// fetching from an external API
function fetchNairobiTime() {
    fetch('http://worldtimeapi.org/api/timezone/Africa/Nairobi')
        .then(response => response.json())
        .then(data => {
            const timeElement = document.getElementById('time');
            const datetime = new Date(data.datetime);
            const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            timeElement.textContent = datetime.toLocaleTimeString('en-US', options);
        })
        
}

// Fetch and display the time when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchNairobiTime();
    // this is to update time every second
    setInterval(fetchNairobiTime, 1000);

    // Fetch movies and watch list on page load
    fetchMovies();
    displayWatchList();
});

const API_URL = 'http://localhost:3000/movies';

// Fetch movies from the API
function fetchMovies() {
    fetch(API_URL)
        .then(response => response.json())
        .then(movies => {
            displayMovies(movies); // Display movies immediately
        })
        
}

// Display movies in the container
function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-list');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie';
        movieCard.innerHTML = `
            <img src="${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p><strong>Rating:</strong> ${movie.vote_average} / 10</p>
            <p><strong>Release Year:</strong> ${movie.release_year}</p>
            <p>${movie.description}</p>
            <button class="add-to-watchlist-btn" data-id="${movie.id}">Add to Watch List</button>
        `;
        movieContainer.appendChild(movieCard);
    });

    // Add event listeners for all "Add to Watch List" buttons
    document.querySelectorAll('.add-to-watchlist-btn').forEach(button => {
        button.addEventListener('click', function () {
            const movieId = this.getAttribute('data-id');
            addToWatchList(movieId);
        });
    });
}

// Add movie to the watch list
function addToWatchList(movieId) {
    fetch(`${API_URL}/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            fetch('http://localhost:3000/watchlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movie)
            })
                .then(() => displayWatchList())
               
        });
}

// Display the movies in the watch list
function displayWatchList() {
    fetch('http://localhost:3000/watchlist')
        .then(response => response.json())
        .then(movies => {
            const watchListContainer = document.getElementById('watch-list');
            watchListContainer.innerHTML = '';

            movies.forEach(movie => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    ${movie.title}
                    <button class="remove-from-watchlist-btn" data-id="${movie.id}">Remove</button>
                `;
                watchListContainer.appendChild(listItem);
            });

            // Add event listeners for all "Remove" buttons
            document.querySelectorAll('.remove-from-watchlist-btn').forEach(button => {
                button.addEventListener('click', function () {
                    const movieId = this.getAttribute('data-id');
                    removeFromWatchList(movieId);
                });
            });
        });
}

// Remove movie from the watch list
function removeFromWatchList(movieId) {
    fetch(`http://localhost:3000/watchlist/${movieId}`, {
        method: 'DELETE'
    })
        .then(() => displayWatchList())
        
}

// Event listener for search button click
document.getElementById('search-btn').addEventListener('click', function () {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    filterMovies(searchTerm);
});

// Event listener for filter selection change
document.getElementById('rating-filter').addEventListener('change', function () {
    const selectedRating = parseFloat(this.value);
    filterByRating(selectedRating);
});

// Filter movies based on search input
function filterMovies(searchTerm) {
    fetch(API_URL)
        .then(response => response.json())
        .then(movies => {
            const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
            displayMovies(filteredMovies);
        })
        
}

// Filter movies by rating
function filterByRating(minRating) {
    fetch(API_URL)
        .then(response => response.json())
        .then(movies => {
            const filteredMovies = movies.filter(movie => movie.vote_average >= minRating);
            displayMovies(filteredMovies);
        })
        
}
