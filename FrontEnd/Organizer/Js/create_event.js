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
      posterUrl: posterUrl,
      organizerId:1
    };
  
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
  