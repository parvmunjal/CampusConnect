async function loadUsers() {
    try {
        const response = await fetch("http://localhost:8080/users");
        if (!response.ok) throw new Error("Failed to load users");

        const users = await response.json();

        // Get the container to insert user items
        const usersContainer = document.getElementById("users-list");
        usersContainer.innerHTML = ""; // Clear previous data

        // Loop through users and create UI for each
        users.forEach(user => {
            const userCard = document.createElement("div");
            userCard.classList.add("user-item");

            userCard.innerHTML = `
                <span class="user-name">${user.name}</span>
                <span class="user-email">${user.email}</span>
                <span class="user-phone">${user.phoneNumber}</span>
            `;

            usersContainer.appendChild(userCard);
        });

    } catch (error) {
        console.error("Error loading users:", error);
        const usersContainer = document.getElementById("users-list");
        usersContainer.innerHTML = "<p>Failed to load users.</p>";
    }
}

// Call the function to load users when the page loads
window.onload = loadUsers;
