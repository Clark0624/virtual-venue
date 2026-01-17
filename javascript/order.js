// Initialize variables
let skipClickCount = 0;

// Update Seat Total in Local Storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const ticketPrice = +localStorage.getItem('selectedMoviePrice') || 0;
  const seatTotal = selectedSeatsCount * ticketPrice;

  // Save seat total in localStorage
  localStorage.setItem('seatTotal', seatTotal);

  // Display count and total if elements exist
  const count = document.getElementById('count');
  const total = document.getElementById('total');
  if (count && total) {
    count.innerText = selectedSeatsCount;
    total.innerText = '₱' + seatTotal.toFixed(2);
  }
}

// Food Ordering Functions
function increaseQuantity(id) {
    let quantityInput = document.getElementById(id + '-quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateTotalPrice();
}

function decreaseQuantity(id) {
    let quantityInput = document.getElementById(id + '-quantity');
    if (parseInt(quantityInput.value) > 0) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
        updateTotalPrice();
    }
}

// Update Food Total and Combined Total
function updateTotalPrice() {
    let total = 0;
    const items = document.querySelectorAll('.combo-item');
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    items.forEach(item => {
        const quantity = parseInt(item.querySelector('input[type="text"]').value) || 0;
        const price = parseFloat(item.getAttribute('data-price'));
        const itemId = item.querySelector('input[type="text"]').id;

        if (quantity > 0) {
            cart[itemId] = { quantity, price };
        } else if (cart[itemId]) {
            delete cart[itemId];
        }
    });

    for (const itemId in cart) {
        const item = cart[itemId];
        total += item.quantity * item.price;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('foodTotal', total);

    const seatTotal = parseFloat(localStorage.getItem('seatTotal') || 0);
    const combinedTotal = seatTotal + total;
    const totalPriceDisplay = document.getElementById('total-price');
    if (totalPriceDisplay) {
        totalPriceDisplay.innerText = 'Total: ₱' + combinedTotal.toFixed(2);
    }
}

// Calculate and Display Total from Storage
function calculateTotalFromStorage() {
    let foodTotal = parseFloat(localStorage.getItem('foodTotal') || 0);
    let seatTotal = parseFloat(localStorage.getItem('seatTotal') || 0);
    let combinedTotal = seatTotal + foodTotal;

    const totalPriceDisplay = document.getElementById('total-price');
    if (totalPriceDisplay) {
        totalPriceDisplay.innerText = 'Total: ₱' + combinedTotal.toFixed(2);
    }
}

// Clear Cart and Reset Totals
function clearCart() {
    localStorage.removeItem('cart');
    localStorage.removeItem('foodTotal');
    localStorage.setItem('seatTotal', 0);

    const totalPriceDisplay = document.getElementById('total-price');
    if (totalPriceDisplay) {
        totalPriceDisplay.innerText = 'Total: ₱0.00';
    }

    const items = document.querySelectorAll('.combo-item input[type="text"]');
    items.forEach(input => input.value = 0);
}

// Skip Button Functionality
function handleSkipButtonClick() {
    skipClickCount += 1;

    if (skipClickCount === 1) {
        clearCart();
    } else if (skipClickCount === 2) {
        window.location.href = 'checkout.html';
    }
}

// Proceed to Checkout
function proceedToCheckout() {
    window.location.href = 'checkout.html';
}

// Display Summary on Checkout Page
function displayCheckoutSummary() {
    const seatTotal = parseFloat(localStorage.getItem('seatTotal') || 0);
    const foodTotal = parseFloat(localStorage.getItem('foodTotal') || 0);
    const combinedTotal = seatTotal + foodTotal;

    const summaryTotal = document.getElementById('summary-total');
    if (summaryTotal) {
        summaryTotal.innerText = 'Total: ₱' + combinedTotal.toFixed(2);
    }
}

// Event Listeners for Seat Selection
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const movieSelect = document.getElementById('movie');

    if (movieSelect) {
        movieSelect.addEventListener('change', (e) => {
            setMovieData(e.target.selectedIndex, e.target.value);   
            updateSelectedCount();
        });
    }

    if (container) {
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
                e.target.classList.toggle('selected');
                updateSelectedCount();
            }
        });
    }

    // Initialize totals from storage when the page loads
    calculateTotalFromStorage();
});
