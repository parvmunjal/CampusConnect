// Get clubId from the URL
const urlParams = new URLSearchParams(window.location.search);
const clubId = urlParams.get('id'); // Using 'id' as the query parameter

// Function to fetch and display club details
async function loadClubDetails() {
  if (!clubId) {
    console.error("No clubId provided in URL");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/organizers/${clubId}`);
    if (!response.ok) throw new Error('Failed to fetch club details');

    const club = await response.json();

    // Render club details
    document.getElementById('club-name').textContent = club.name;
    document.getElementById('club-email').textContent = club.email;
    document.getElementById('club-phone').textContent = club.phoneNumber;
    document.getElementById('club-description').textContent = club.description;
    document.getElementById('club-logo').src = club.dpUrl || "https://via.placeholder.com/150";

    // Initialize gallery images from comma-separated string
    let galleryImages = club.eventGallery ? club.eventGallery.split(',') : ["https://via.placeholder.com/300"];
    let galleryIndex = 0;

    // Set initial gallery image
    document.getElementById('gallery-image').src = galleryImages[galleryIndex];

    // Event listeners for gallery navigation
    document.getElementById('prev-btn').onclick = () => {
      galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
      document.getElementById('gallery-image').src = galleryImages[galleryIndex];
    };
    document.getElementById('next-btn').onclick = () => {
      galleryIndex = (galleryIndex + 1) % galleryImages.length;
      document.getElementById('gallery-image').src = galleryImages[galleryIndex];
    };
  } catch (error) {
    console.error("Error loading club details:", error);
    document.getElementById('club-details-container').innerHTML = "<p>Failed to load club details.</p>";
  }
}


// Call loadClubDetails when the page loads
document.addEventListener('DOMContentLoaded', loadClubDetails);
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