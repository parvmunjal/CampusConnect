// Fetch and display clubs data
async function loadClubs() {
    try {
      const response = await fetch("http://localhost:8080/organizers"); // Replace with your backend endpoint
      const clubs = await response.json();
  
      const clubsContainer = document.getElementById('clubs-container');
      clubsContainer.innerHTML = ''; // Clear existing content
  
      clubs.forEach(club => {
        const clubCard = document.createElement('div');
        clubCard.className = 'club-card';
  
        // Club image
        const clubImage = document.createElement('div');
        clubImage.className = 'club-image';
        clubImage.style.backgroundImage = `url(${club.dpUrl || "https://economictimes.indiatimes.com/thumb/msid-106775052,width-1600,height-900,resizemode-4,imgsize-69266/mclaren-750s-launched-in-india-at-rs-5-91-crore-what-makes-it-so-expensive.jpg?from=mdr"})`; // Placeholder if no image
        clubImage.style.backgroundSize = 'cover';
        clubImage.style.backgroundPosition = 'center';
        clubCard.appendChild(clubImage);
  
        // Club name
        const clubName = document.createElement('h2');
        clubName.className = 'club-name';
        clubName.textContent = club.name;
        clubCard.appendChild(clubName);
  
        // Club description
        const clubDescription = document.createElement('p');
        clubDescription.className = 'club-description';
        clubDescription.textContent = club.description;
        clubCard.appendChild(clubDescription);
  
        // View Details button
        const viewDetailsBtn = document.createElement('button');
        viewDetailsBtn.className = 'view-details-btn';
        viewDetailsBtn.textContent = 'View Details';
        viewDetailsBtn.onclick = () => {
          window.location.href = `/Pages/club_details.html?id=${club.id}`; // Redirect to club details page with club ID
        };
        clubCard.appendChild(viewDetailsBtn);
  
        clubsContainer.appendChild(clubCard);
      });
    } catch (error) {
      console.error("Error loading clubs:", error);
    }
  }
  
  // Load clubs on page load
  document.addEventListener('DOMContentLoaded', loadClubs);
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