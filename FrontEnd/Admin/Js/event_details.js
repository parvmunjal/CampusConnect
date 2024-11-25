// Get eventId from the URL
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId'); // Using 'eventId' from the query parameter
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

// Function to fetch user details by ID (for user ID 2)
async function getUserDetails() {
  try {
    const response = await fetch(`http://localhost:8080/users/2`);
    if (!response.ok) throw new Error('Failed to fetch user details');

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}



// Function to load event details (including registration fee)
async function loadEventDetails() {
  if (!eventId) {
    console.error("No eventId provided in URL");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/events/${eventId}`);
    if (!response.ok) throw new Error('Failed to fetch event details');

    const event = await response.json();

    // Assuming you have a variable 'event' that contains the event details
    const eventPoster = event.posterUrl || "https://via.placeholder.com/350"; // Fallback if no poster URL is provided
    document.getElementById('event-poster').src = eventPoster;


    // Fetch organizer's name using organizer_id
    const organizerName = await getOrganizerName(event.organizer.id);

    // Render event details
    document.getElementById('event-title').textContent = event.eventName;
    document.getElementById('event-venue').textContent = event.location;

    // Create a Date object from event.eventDate and format it
    const eventDate = new Date(event.eventDate);
    const formattedDate = eventDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' ,timeZone: 'UTC'}); // Example: November 20, 2024
    const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',timeZone: 'UTC' }); // Example: 3:30 PM
    document.getElementById('event-date').textContent = `${formattedDate} ${formattedTime}`;

    // Render organizer name
    const organizerElement = document.getElementById('event-organizer');
    organizerElement.textContent = organizerName;

    // Add click event to the organizer's name to navigate to the club details page
    organizerElement.style.cursor = 'pointer'; // Show pointer cursor for clickable text
    organizerElement.addEventListener('click', () => {
      window.location.href = `/Pages/club_details.html?id=${event.organizer.id}`; // Redirect to club details page
    });
    document.getElementById('event-description').textContent = event.description;

    // Extract the registration fee from the event data
    const registrationFee = event.registrationFee;

    // Check if the registrationFee is null or 0, and display "Free!" instead
    document.getElementById('popup-registration-fee').textContent = registrationFee ? `Registration Fee: Rs ${registrationFee}/-` : "Registration Fee: Free!";

    // Set the event poster image
    document.getElementById('event-poster').src = event.posterUrl || "https://via.placeholder.com/350"; // Placeholder if no poster is set

    // Set up the register button click event
    const registerBtn = document.querySelector('.register-btn');
    registerBtn.addEventListener('click', () => showRegistrationPopup(event, registrationFee));
  } catch (error) {
    console.error("Error loading event details:", error);
    document.getElementById('event-details-container').innerHTML = "<p>Failed to load event details.</p>";
  }
}




// Function to show the registration popup and populate the fields dynamically
async function showRegistrationPopup(event, registrationFee) {
  const user = await getUserDetails();

  if (!user || registrationFee === undefined) {
    alert('Failed to fetch user or event details!');
    return;
  }

  // Set the values in the popup form
  document.getElementById('popup-name').value = user.name;
  document.getElementById('popup-email').value = user.email;
  document.getElementById('popup-phone').value = user.phoneNumber;  
  document.getElementById('popup').style.display = 'block'; // Show the popup
}

// Function to close the popup
function closePopup() {
  document.getElementById('popup').style.display = 'none'; // Hide the popup
}

// Function to handle registration form submission
async function submitRegistrationForm(event) {
  event.preventDefault();

  const name = document.getElementById('popup-name').value;
  const email = document.getElementById('popup-email').value;
  const phone = document.getElementById('popup-phone').value;
  const registrationNumber = document.getElementById('popup-registration-number').value;
  const userId = 2; // Hardcoded for now
  const registrationData = {
    name,
    email,
    phone,
    registrationNumber,
  };

  try {
    const response = await fetch(`http://localhost:8080/events/${eventId}/register/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    alert('Registration successful!');
    closePopup();
  } catch (error) {
    console.error('Error submitting registration:', error);
    alert('Error registering for the event');
  }
}

// Call loadEventDetails when the page loads
document.addEventListener('DOMContentLoaded', loadEventDetails);

// Register form submission event
document.getElementById('registration-form').addEventListener('submit', submitRegistrationForm);
