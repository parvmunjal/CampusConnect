# 🎓 Campus Connect – Backend

Welcome to the **Campus Connect Backend**! This Spring Boot application serves as the robust backend for a platform designed to revolutionize campus life by streamlining event management, simplifying club discovery, and fostering seamless interactions between students and organizers.

---

## ✨ Features

Campus Connect offers a comprehensive set of features to enhance campus engagement:

* **🔐 Secure Authentication:** Implements **JWT-based authentication** for both students and organizers, ensuring secure access and data protection.
* **📅 Dynamic Event Management:** Provides full CRUD (Create, Read, Update, Delete) capabilities for events, along with a smooth **registration system** for students.
* **🧑‍🎓 Centralized Club & Organizer Management:** Efficiently manage campus clubs and the organizers associated with them.
* **✉️ Real-time Notifications:** Keeps users informed with **email notifications** powered by SMTP, for event updates, registrations, and more.
* **📊 Organizer Dashboard & Analytics:** Offers a dedicated dashboard for organizers with valuable **analytics** to track event performance and engagement.
* **🏫 Venue Management:** Includes **venue availability tracking** and **conflict detection** to prevent scheduling overlaps for campus facilities.

---

## 🛠️ Tech Stack

This project leverages a powerful and modern tech stack to deliver a scalable and maintainable backend:

| Category        | Technologies                              |
| :-------------- | :---------------------------------------- |
| **Language** | Java 17                                   |
| **Framework** | Spring Boot, Spring Security (with JWT)   |
| **ORM** | Spring Data JPA                           |
| **Database** | MySQL                                     |
| **Email Service** | JavaMailSender                            |
| **Utilities** | Lombok, Maven                             |

---

## ⚙️ Setup Instructions

Follow these simple steps to get the Campus Connect backend up and running on your local machine.

### 1. Clone the Repository

Begin by cloning the project repository to your local system:

```bash
git clone [https://github.com/yourusername/campus-connect-backend.git](https://github.com/yourusername/campus-connect-backend.git)
cd campus-connect-backend
2. Configure application.properties

Create or modify the src/main/resources/application.properties file with your database and email service configurations.

Properties
# ===== Database Configuration =====
spring.datasource.url=jdbc:mysql://localhost:3306/campus_connect
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# ===== Mail Configuration =====
# Note: For Gmail, you might need to generate an "App Password"
# if you have 2-Factor Authentication enabled.
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=youremail@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
Important: For the spring.mail.password, if you're using Gmail with 2-Factor Authentication, you'll need to generate an App Password instead of using your regular Gmail password. You can do this in your Google Account Security settings.

3. Run the Application

You have a couple of options to start the Spring Boot application:

Using Maven Wrapper (CLI):
./mvnw spring-boot:run


📬 API Testing – Postman Collection
Explore and test all the available API endpoints using our comprehensive Postman collection.

🔗 Campus Connect – Postman Collection
