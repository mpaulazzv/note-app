# NoteApp

For this test, I developed a full-stack note-taking. This project features a robust Spring Boot backend, a fast React frontend, and a containerized PostgreSQL database.

---

## 🎯 User Stories

**Phase 1: Core Features**

**CRUD Operations:** As a user, I want to be able to create, edit, and delete notes.
**Status Management:** As a user, I want to archive/unarchive notes.

**Filtering:** As a user, I want to list my active/archived notes.

**Phase 2: Categorization**
Tagging: As a user, I want to be able to add or remove categories to my notes for better organization.

Note: I didn't have enough time to develop the filtering use case for the categories


## 🛠 Tech Stack

### **Frontend**
* **React 19** with **Vite** for a high-performance development experience.
* **TypeScript** for static typing and improved code quality.
* **Tailwind CSS** for responsive and modern styling.
* **Lucide React** for lightweight and scalable icons.
* **SweetAlert2** for interactive and accessible user notifications.

### **Backend**
* **Java 21** & **Spring Boot 4.0.5**.
* **Spring Security** + **JWT (JSON Web Tokens)** for secure, stateless authentication.
* **Spring Data JPA** for seamless Object-Relational Mapping.
* **Maven** for build automation and dependency management.
* **Lombok** to reduce boilerplate code.

### **Database & Infrastructure**
* **PostgreSQL**: Reliable relational storage for user notes and data.
* **Docker**: Containerized database deployment to ensure environment consistency.

---

## 📋 Prerequisites

Ensure you have the following versions installed on your machine:

| Tool | Recommended Version |
| :--- | :--- |
| **Java (JDK)** | 21 |
| **Node.js** | 20.x or higher |
| **Maven** | 3.9+ |
| **Docker** | Latest |
| **Linux/WSL** | Required for `.sh` script execution |

---

## 🚀 Execution

### **Automated Setup (Linux)**
The project includes a shell script to automate the deployment of the database container and the execution of both the backend and frontend.

1. Give execution permissions to the script:
   ```bash
   chmod +x script.sh

## 🧐 Improvement points

 - Improve Frontend components  
 - Contenerize the 3 applications and deploy them
 - Live deply