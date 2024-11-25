// URL for fetching events (update the port or path as per your backend setup)
const eventsApiUrl = 'http://localhost:8080/events';

// URL for fetching organizers (update the port or path as per your backend setup)
const organizersApiUrl = 'http://localhost:8080/organizers';

// Function to get organizer details by ID
async function getOrganizerName(organizerId) {
  try {
    const response = await fetch(`${organizersApiUrl}/${organizerId}`);
    if (!response.ok) throw new Error('Failed to fetch organizer details');
    const organizer = await response.json();
    return organizer.name; // Assuming 'name' is a property of the organizer object
  } catch (error) {
    console.error("Error fetching organizer name:", error);
    return "Unknown Organizer"; // Fallback if there's an error
  }
}

// Function to load events and display them in the UI
async function loadEvents() {
  try {
    const response = await fetch(eventsApiUrl);
    if (!response.ok) throw new Error('Failed to fetch events');
    const events = await response.json();

    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = ''; // Clear any existing events

    for (const event of events) {
      const organizerName = await getOrganizerName(event.organizer.id); // Fetch organizer name

      // Create a Date object for formatting
      const eventDate = new Date(event.eventDate);

      // Format the date and time
      const formattedDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // Example: November 20, 2024

      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');

      eventCard.innerHTML = `
        <div class="event-title">
          <h2>${event.eventName}</h2>
          <p class="event-organizer">${organizerName}</p> <!-- Organizer's name -->
        </div>
        <p class="event-date">${formattedDate}</p> <!-- Date and time -->
        <button class="view-details-btn" onclick="viewEventDetails(${event.id})">View Details</button>
      `;

      eventsContainer.appendChild(eventCard);
    }
  } catch (error) {
    console.error('Error loading events:', error);
  }
}


function viewEventDetails(eventId) {
  // Redirect to the Event Details page with eventId as a path variable
  window.location.href = `/Pages/event_details.html?eventId=${eventId}`;
}



// Call loadEvents when the page loads
document.addEventListener('DOMContentLoaded', loadEvents);
