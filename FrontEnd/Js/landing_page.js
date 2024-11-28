// Function to redirect to the View Events page
function loadEvents() {
    // Redirecting to the 'view_events.html' page
    window.location.href = '/Pages/view_events.html'; // Adjust the path based on your project structure
}

// Function to fetch and display the clubs (organizers)
function loadClubs() {
    window.location.href='/Pages/explore_clubs.html';
}

// Function to fetch and display the bookings for the user
function loadBookings() {
    window.location.href='/Pages/user_bookings.html';
}
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
  
