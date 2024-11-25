document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById("calendar-grid");
    const popup = document.getElementById("date-popup");
    const popupDate = document.getElementById("selected-date");
    const closePopupBtn = document.getElementById("close-popup");

    const slotTableBody = document.querySelector("#slot-table tbody");
    const addSlotBtn = document.getElementById("add-slot-btn");

    const slotDateInput = document.getElementById("slot-date");
    const slotStartTimeInput = document.getElementById("slot-start-time");
    const slotEndTimeInput = document.getElementById("slot-end-time");
    const slotVenueInput = document.getElementById("slot-venue");

    let selectedDate = "";

    // Generate Calendar Days
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayElement = document.createElement("div");
        dayElement.classList.add("day");
        if (i === 0) dayElement.classList.add("current-day");

        const options = { weekday: "short", month: "short", day: "numeric" };
        dayElement.textContent = date.toLocaleDateString("en-US", options);

        // Add click event to open popup
        dayElement.addEventListener("click", () => {
            // Fix date conversion to local date
            selectedDate = date.toLocaleDateString("en-CA"); // en-CA format gives yyyy-mm-dd
            popupDate.textContent = `Selected Date: ${date.toDateString()}`;
            fetchSlots(selectedDate);
            popup.style.display = "flex";

        });

        calendarGrid.appendChild(dayElement);
    }

    // Close Popup
    closePopupBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Fetch Slots
    const fetchSlots = (date) => {
        const url = `http://localhost:8080/availability/${date}`; // Construct URL with date
        fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                renderSlots(data);
            })
            .catch((error) => {
                console.error("Error fetching slots:", error);
            });
    };


    // Render Slots in Table
    const renderSlots = (slots) => {
        slotTableBody.innerHTML = ""; // Clear table
        slots.forEach((slot) => {
            const row = document.createElement("tr");

            const timeCell = document.createElement("td");
            timeCell.textContent = `${slot.startTime} - ${slot.endTime}`;

            const venueCell = document.createElement("td");
            venueCell.textContent = slot.venue;

            row.appendChild(timeCell);
            row.appendChild(venueCell);

            slotTableBody.appendChild(row);
        });
    };

    
});
