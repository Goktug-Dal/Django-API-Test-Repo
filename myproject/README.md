# Turn-Based Combat Microservice ⚔️

A logic-driven RESTful API that simulates state-based RPG combat. Built with Django REST Framework, fully containerized with Docker, and backed by a production-ready MySQL database.

## 🚀 Tech Stack
* **Backend:** Python 3.13, Django 6.0, Django REST Framework
* **Database:** MySQL 8.0
* **Infrastructure:** Docker, Docker Compose
* **Security:** Token-Based Authentication

## ⚙️ Core Features
* **Custom Combat Engine:** Processes complex algorithms to determine turn-based fight outcomes, calculating damage, health pools, and win states.
* **Granular Battle Logs:** Returns custom-formatted JSON responses detailing every step of the simulation for frontend clients.
* **Role-Based Access:** Public endpoints for simulating fights, with secure, Token-authenticated endpoints for database management (Create/Update/Delete).
* **Containerized Architecture:** Zero-setup local deployment using Docker Compose.

## 📡 API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/leader/` | Public | Returns a leaderboard of all characters sorted by health. |
| `GET/POST` | `/fight/<id1>/<id2>/` | Public | Simulates a battle between two characters and returns the battle log. |
| `POST` | `/add-rpg/` | Public | Adds a new character to the database. |
| `PUT/PATCH`| `/fix/<id>/` | Public | Heals a character back to 100 HP. |
| `DELETE` | `/delete/<id>/` | Token Required | Permanently removes a character from the database. |

## 🛠️ How to Run Locally

1. Clone the repository.
2. Ensure Docker Desktop is running.
3. Build and spin up the containers:
   ```bash
   docker-compose up --build -d