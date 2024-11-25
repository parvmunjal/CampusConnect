async function loadManageEvents() {
    const organizerId = 1; // Adjust based on your implementation
  
    try {
        const response = await fetch(`http://localhost:8080/events/byorganizer/${organizerId}`);
        if (!response.ok) throw new Error("Failed to load events");

        const events = await response.json();
        const eventsContainer = document.getElementById('manage-events-list');
        eventsContainer.innerHTML = ''; // Clear existing data

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-item');

            const eventDate = new Date(event.eventDate);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',timeZone: 'UTC' });
            eventId=event.id;
            eventCard.innerHTML = `
                <span class="event-name">${event.eventName}</span>
                <span class="event-venue">${event.location}</span>
                <span class="event-date-time">${formattedDate} ${formattedTime}</span>
                <span class="edit-event">
                    <button onclick="showPopup(${JSON.stringify(event).replace(/"/g, '&quot;')})">Manage</button>
                </span>
            `;

            eventsContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error("Error loading events:", error);
        const eventsContainer = document.getElementById('manage-events-list');
        eventsContainer.innerHTML = "<p>Failed to load your events.</p>";
    }
}

function showPopup(event) {
    // Populate the event details into the form fields
    document.getElementById('event-name').value = event.eventName;
    document.getElementById('event-venue').value = event.location;

    // Combine date and time into the datetime-local format
    const eventDate = new Date(event.eventDate);
    const formattedDateTime = eventDate.toISOString().slice(0, 16); // Get date and time in "YYYY-MM-DDTHH:MM" format
    document.getElementById('event-date-time').value = formattedDateTime;

    document.getElementById('event-description').value = event.description || ''; // Set description if available
    document.getElementById('registration-fee').value = event.registrationFee || '0'; // Set registration fee if available
    document.getElementById('poster-url').value = event.posterUrl || ''; // Set poster URL if available
    
    // Show the poster preview if a URL is provided
    const posterUrl = event.posterUrl || '';
    const posterPreview = document.getElementById('poster-preview');
    if (posterUrl) {
        posterPreview.style.display = 'block';
        posterPreview.src = posterUrl;
    } else {
        posterPreview.style.display = 'none';
    }

    // Display the popup
    document.getElementById('event-popup').style.display = 'flex';
  
    // Handle form submission
    document.getElementById('edit-event-form').onsubmit = async (e) => {
        e.preventDefault();

        const updatedEvent = {
            id: event.id,
            eventName: document.getElementById('event-name').value,
            location: document.getElementById('event-venue').value,
            eventDate: document.getElementById('event-date-time').value, // Get the combined datetime value
            description: document.getElementById('event-description').value,
            registrationFee: parseFloat(document.getElementById('registration-fee').value),
            posterUrl: document.getElementById('poster-url').value,
        };

        // Updated request for PUT method with event ID in the URL
        try {
            const response = await fetch(`http://localhost:8080/events/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent), // Send the updated event data as the request body
            });

            if (response.ok) {
                alert('Event updated successfully!');
                document.getElementById('event-popup').style.display = 'none';
                loadManageEvents(); // Reload events after update
            } else {
                alert('Failed to update event');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the event');
        }
    };
}

document.getElementById('popup-close').addEventListener('click', function() {
    document.getElementById('event-popup').style.display = 'none';
});

document.getElementById('poster-url').addEventListener('input', function() {
    const posterUrl = document.getElementById('poster-url').value;
    const posterPreview = document.getElementById('poster-preview');
    
    if (posterUrl) {
        posterPreview.style.display = 'block';
        posterPreview.src = posterUrl;
    } else {
        posterPreview.style.display = 'none';
    }
});


document.getElementById('toggle-view-reg').addEventListener('click', function () {
    const dropdownContainer = this.parentElement; // The parent element of the clicked button
    const dropdownContent = dropdownContainer.querySelector('.dropdown-content');
    const dropdownIcon = this.querySelector('.dropdown-icon');
  
    // Check if the dropdownContent is already visible
    if (dropdownContent.style.display === 'block') {
      
    } else {
      // If it is not visible, show it and change the icon
      dropdownContent.style.display = 'block';
      dropdownIcon.textContent = '-'; // Change icon to '-'
    }
  });
  
document.getElementById('toggle-edit-event').addEventListener('click', function () {
    const dropdownContainer = this.parentElement; // The parent element of the clicked button
    const dropdownContent = dropdownContainer.querySelector('.dropdown-content');
    const dropdownIcon = this.querySelector('.dropdown-icon');
  
    // Toggle dropdown visibility
    if (dropdownContent.style.display === 'block') {
     
    } else {
      dropdownContent.style.display = 'block';
      dropdownIcon.textContent = '-'; // Change icon to '-'
    }
  });
 
  
  
  








  async function loadRegistrations() {
    const registrationDropdown = document.getElementById('registration-dropdown');
    const userList = document.getElementById('user-list');
    const registrationCount = document.getElementById('registration-count');

    try {
        const response = await fetch(`http://localhost:8080/bookings/event/${eventId}`); // Replace with the correct endpoint
        if (!response.ok) throw new Error("Failed to fetch registrations");

        const registrations = await response.json();
        userList.innerHTML = ''; // Clear any existing data
        registrationCount.textContent = registrations.length; // Update the registration count

        registrations.forEach(registration => {
            const listItem = document.createElement('li');
            listItem.textContent = `${registration.user.name} (${registration.user.email})`; // Adjust according to your API response
            userList.appendChild(listItem);
        });

        // Show the dropdown
        registrationDropdown.style.display = 'block';

    } catch (error) {
        console.error("Error loading registrations:", error);
        userList.innerHTML = '<p>Failed to load registrations</p>';
        registrationCount.textContent = '0';
    }
}
  






window.onload = loadManageEvents;



  
  document.getElementById('popup-close').addEventListener('click', function () {
    document.getElementById('event-popup').style.display = 'none';
  });
  
  // Handle form submissions and save edited event data as needed
  
  