const id=localStorage.getItem('organizerId')
console.log(id)
const token = localStorage.getItem('token');
console.log(token)
document.getElementById('poster-url').addEventListener('input', function() {
    const posterUrl = document.getElementById('poster-url').value;
    const posterPreview = document.getElementById('poster-preview');
    
    if (posterUrl) {
      // Show the image preview and update the src attribute with the poster URL
      posterPreview.style.display = 'block';
      posterPreview.src = posterUrl;
    } else {
      // Hide the image preview if there's no URL
      posterPreview.style.display = 'none';
    }
  });
  
  document.getElementById('submit-event').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
  
    // Collect form values
    const eventName = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;
    const eventDate = document.getElementById('event-date').value;
    const location = document.getElementById('event-venue').value;
    const registrationFee = document.getElementById('registration-fee').value;
    const posterUrl = document.getElementById('poster-url').value;
  
    // Organize the data to match the backend API request body
    const eventData = {
      eventName: eventName,
      description: description,
      eventDate: eventDate,
      location: location,
      registrationFee: parseFloat(registrationFee), 
      organizerId:id,
      posterUrl: posterUrl
    };
    console.log(eventData)
  
    // Send POST request to backend API
    fetch('http://localhost:8080/admin/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData), // Send the event data in JSON format
    })
    .then(response => {
      if (response.ok) {
        alert('Event approval request sent successfully!');
        // You can reset the form or redirect the user to another page if needed
      } else {
        alert('Failed to send event approval request');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while send the event approval request');
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    const authButton = document.getElementById('auth-button');
  
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    //console.log(token)
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
        window.location.href = '/Organizer/Pages/landing_page.html'; // Redirect to homepage
      });
    } else {
      // User is not logged in, ensure the button shows "SignIn/SignUp"
      authButton.textContent = 'SignIn/SignUp';
      authButton.href = '/Pages/login.html'; // Link to the SignIn/SignUp page
    }
  });
  