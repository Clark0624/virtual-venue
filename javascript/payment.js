document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        window.location.href = 'ticket.html';
    });
});

// Function to return to homepage
function returnToHomepage() {
    window.location.href = '/html/home.html';
}