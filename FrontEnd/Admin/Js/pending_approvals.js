document.addEventListener("DOMContentLoaded", () => {
    const eventsListContainer = document.getElementById("manage-events-list");
  
    // Fetch events data from the backend
    fetch("http://localhost:8080/admin/events")
      .then(response => response.json())
      .then(events => {
        events.forEach(event => {
          const eventItem = document.createElement("div");
          eventItem.classList.add("event-item");

          const eventDate = new Date(event.eventDate);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
            });
            const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
  
          eventItem.innerHTML = `
            <div class="event-name">${event.eventName}</div>
            <div class="event-venue">${event.location}</div>
            <div class="event-date-time">${formattedDate} ${formattedTime}</div>
            <div class="edit-event">
              <button onclick="manageEvent(${event.id})">Manage</button>
            </div>
          `;
  
          eventsListContainer.appendChild(eventItem);
        });
      })
      .catch(error => {
        console.error("Error fetching events:", error);
      });
  });
  
  // Function to handle Manage button click
  function manageEvent(eventId) {
    id=eventId
    // Fetch specific event details and populate the popup for management
    fetch(`http://localhost:8080/admin/events/${eventId}`)
      .then(response => response.json())
      .then(event => {

        // Combine date and time into the datetime-local format
    const eventDate = new Date(event.eventDate);
    const formattedDateTime = eventDate.toISOString().slice(0, 16); // Get date and time in "YYYY-MM-DDTHH:MM" format
    document.getElementById('event-date-time').value = formattedDateTime;

        // Populate the event management form with the selected event data
        document.getElementById("event-name").value = event.eventName;
        document.getElementById("event-venue").value = event.location;
        document.getElementById("event-description").value = event.description;
        document.getElementById("registration-fee").value = event.registrationFee;
        document.getElementById("poster-url").value = event.posterUrl;
        document.getElementById("poster-preview").src = event.posterUrl;
  
        // Open the popup
        document.getElementById("event-popup").style.display = "flex";
      })
      .catch(error => {
        console.error("Error fetching event details:", error);
      });
  }
  // Function to handle Approve Event
document.getElementById("approve-event-btn").addEventListener("click", () => {

    // Send a POST request to approve the event
    fetch(`http://localhost:8080/admin/events/approve/${id}`, {
      method: 'POST', // Approving event using POST
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (response.ok) {
        alert('Event Approved');
        // Close the popup or refresh event list
        document.getElementById("event-popup").style.display = "none";
        location.reload();  // Reload the page to reflect changes
      } else {
        alert('Error approving event');
      }
    })
    .catch(error => {
      console.error("Error approving event:", error);
    });
});

// Function to handle Reject Event
document.getElementById("reject-event-btn").addEventListener("click", () => {

    // Send a DELETE request to reject the event
    fetch(`http://localhost:8080/admin/events/delete/${id}`, {
      method: 'DELETE', // Rejecting event using DELETE
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (response.ok) {
        alert('Event Rejected');
        // Close the popup or refresh event list
        document.getElementById("event-popup").style.display = "none";
        location.reload();  // Reload the page to reflect changes
      } else {
        alert('Error rejecting event');
      }
    })
    .catch(error => {
      console.error("Error rejecting event:", error);
    });
});

  // Close the popup
  document.getElementById("popup-close").addEventListener("click", () => {
    document.getElementById("event-popup").style.display = "none";
  });
