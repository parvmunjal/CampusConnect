async function loadMyBookings() {
    const userId = localStorage.getItem('userId'); // Hardcoded for now, we'll make it dynamic later

    try {
        const response = await fetch(`http://localhost:8080/bookings/user/${userId}`);
        if (!response.ok) throw new Error("Please login to see your bookings");

        const bookings = await response.json();

        // Get the container to insert the bookings
        const bookingsContainer = document.getElementById('my-bookings-list');
        bookingsContainer.innerHTML = ''; // Clear any previous data

        // Loop through the bookings and display each one
        bookings.forEach(booking => {
            const bookingCard = document.createElement('div');
            bookingCard.classList.add('booking-card');

            // Create a Date object from event.eventDate and format it
            const eventDate = new Date(booking.event.eventDate);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
            }); // Example: November 20, 2024
            const formattedTime = eventDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'UTC'
            }); // Example: 3:30 PM

            // Create the booking item
            bookingCard.innerHTML = `
                <div class="booking-item">
                    <span class="event-name">${booking.event.eventName}</span>
                    <span class="organizer-name">${booking.event.organizer.name}</span>
                    <span class="event-venue">${booking.event.location}</span>
                    <span class="event-date">${formattedDate} ${formattedTime}</span>
                </div>
            `;

            // Append the booking item to the container
            bookingsContainer.appendChild(bookingCard);
        });

    } catch (error) {
        console.error("Error loading bookings:", error);
        const bookingsContainer = document.getElementById('my-bookings-list');
        bookingsContainer.innerHTML = "<p>Please login to see your bookings.</p>";
    }
}

// Call the function to load bookings when the page loads
window.onload = loadMyBookings;
document.addEventListener('DOMContentLoaded', function () {
    const authButton = document.getElementById('auth-button');
  
    // Check if the user is logged in
    const token = localStorage.getItem('token');
  
    if (token) {
      // User is logged in, change button to "Logout"
      authButton.textContent = 'Logout';
      authButton.href = '#'; // Prevent navigation for Logout
      authButton.addEventListener('click', function (e) {
        e.preventDefault();
  
        // Clear localStorage and redirect to home
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        alert('You have been logged out.');
        window.location.href = '/Pages/landing_page.html'; // Redirect to homepage
      });
    } else {
      // User is not logged in, ensure the button shows "SignIn/SignUp"
      authButton.textContent = 'SignIn/SignUp';
      authButton.href = '/Pages/login.html'; // Link to the SignIn/SignUp page
    }
  });