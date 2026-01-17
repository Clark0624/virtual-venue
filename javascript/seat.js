// Get DOM elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
const movieDate = document.getElementById('movie-date');
const movieTime = document.getElementById('movie-time');
const movieVenue = document.getElementById('place');

// Initialize ticket price from selected movie or localStorage
let ticketPrice = +movieSelect.value;

// Populate UI from localStorage when the page loads
document.addEventListener('DOMContentLoaded', populateUI);

// Save selected movie details and price to localStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
  localStorage.setItem('selectedMovieName', movieSelect.options[movieIndex].text); // Movie name
  localStorage.setItem('selectedDate', movieDate.value); // Movie date
  localStorage.setItem('selectedTime', movieTime.value); // Movie time
  localStorage.setItem('selectedVenue', movieVenue.value); // Movie venue
}

// Update selected seats count and total price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  
  // Map selected seats to their indices
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // Save selected seats to localStorage
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // Update count and total in UI
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  const seatTotal = selectedSeatsCount * ticketPrice;
  total.innerText = '₱' + seatTotal.toFixed(2);

  // Save total price to localStorage
  localStorage.setItem('seatTotal', seatTotal.toFixed(2));
}

// Populate UI with data from localStorage
function populateUI() {
  // Load selected seats from localStorage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected'); // Mark seat as selected
      }
    });
  }

  // Load movie details from localStorage
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  const selectedMovieName = localStorage.getItem('selectedMovieName');
  const selectedDate = localStorage.getItem('selectedDate');
  const selectedTime = localStorage.getItem('selectedTime');
  const selectedVenue = localStorage.getItem('selectedVenue');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex; // Set dropdown value
  }

  // Update UI with loaded data
  document.getElementById('movie-name').textContent = selectedMovieName || 'N/A';
  movieDate.value = selectedDate || '';
  movieTime.value = selectedTime || '';
  movieVenue.value = selectedVenue || '';

  // Set ticket price and update count
  ticketPrice = +localStorage.getItem('selectedMoviePrice') || +movieSelect.value;
  updateSelectedCount();
}

// Event listener: Change movie selection
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value; // Update ticket price
  setMovieData(e.target.selectedIndex, e.target.value); // Save movie details
  updateSelectedCount(); // Update seat count and total
});

// Event listener: Select/deselect seats
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected'); // Toggle selection
    updateSelectedCount(); // Update seat count and total
  }
});

// Initialize seat count and total price on page load
updateSelectedCount();
