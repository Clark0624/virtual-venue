document.addEventListener('DOMContentLoaded', () => {
    // Fetching data from localStorage
    const movieName = localStorage.getItem('selectedMovieName');
    const movieDate = localStorage.getItem('selectedDate');
    const movieTime = localStorage.getItem('selectedTime');
    const movieVenue = localStorage.getItem('selectedVenue');
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const seatCount = selectedSeats.length;
    const seatTotal = parseFloat(localStorage.getItem('seatTotal')) || 0; // Retrieve seat total
    const foodTotal = parseFloat(localStorage.getItem('foodTotal')) || 0; // Retrieve food total
    const foodSummary = JSON.parse(localStorage.getItem('cart')) || {};

    // Debugging output to check if the values are correctly fetched
    console.log("Movie Name:", movieName);
    console.log("Movie Date:", movieDate);
    console.log("Movie Time:", movieTime);
    console.log("Movie Venue:", movieVenue);
    console.log("Selected Seats:", selectedSeats);

    // Set movie details (with default values if missing)
    document.getElementById('movie-name').textContent = movieName || 'N/A';
    document.getElementById('movie-date').textContent = movieDate || 'N/A'; // Check if this element exists
    document.getElementById('movie-time').textContent = movieTime || 'N/A'; // Check if this element exists
    document.getElementById('movie-venue').textContent = movieVenue || 'N/A'; // Display venue

    // Set seat details
    document.getElementById('seat-count').textContent = seatCount || 0;
    document.getElementById('seat-total').textContent = '₱' + seatTotal.toFixed(2); // Display seat total

    // Set food details 
    let foodSummaryHtml = '';
    if (foodSummary && Object.keys(foodSummary).length > 0) {
        for (const itemId in foodSummary) {
            const item = foodSummary[itemId];
            foodSummaryHtml += `<p>${itemId}: ${item.quantity} x ₱${item.price.toFixed(2)}</p>`;
        }
    }
    document.getElementById('food-summary').innerHTML = foodSummaryHtml;
    document.getElementById('food-total').textContent = '₱' + foodTotal.toFixed(2);

    // Calculate the combined total (Seat total + Food total)
    const combinedTotal = seatTotal + foodTotal;
    document.getElementById('total-price').textContent = '₱' + combinedTotal.toFixed(2);
});

// Confirm Order Event Listener
document.getElementById('confirm-order').addEventListener('click', () => {
    // Proceed to the payment or confirmation page
    window.location.href = 'payment.html'; // Replace with your actual payment page URL
});

// Cancel Order Event Listener
document.getElementById('cancel-order').addEventListener('click', () => {
    // Go back to the home or movie selection page
    window.location.href = 'order.html'; // Replace with your actual homepage URL
});