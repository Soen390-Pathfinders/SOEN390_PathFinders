# Concordia Campus Navigation App -- version 0.0.1 [![.github/workflows/ci.yml](https://github.com/Pathfinders-Soen-390/SOEN390-Project-winter2025/actions/workflows/ci.yml/badge.svg)](https://github.com/Pathfinders-Soen-390/SOEN390-Project-winter2025/actions/workflows/ci.yml)

## Project Overview

The **Concordia Campus Guide** is a mobile application designed to help Concordia's students, faculty, and visitors navigate through campus buildings and rooms efficiently. Inspired by Google Maps, this app provides a user-friendly interface for locating your current position on campus and finding the shortest path to any desired location.

This project aims to simplify campus navigation, reduce confusion for newcomers, and improve accessibility for everyone on campus.

---

## Features

- **Real-Time Location Tracking**: Pinpoint your current building and room on campus.
- **Shortest Path Calculation**: Quickly find the most efficient route between two locations.
- **Search Functionality**: Easily search for rooms, buildings, or facilities.
- **Interactive Map**: A dynamic map interface for clear and intuitive navigation.

---

## Tech Stack

- **Frontend**: React Native – for building a cross-platform mobile application.
- **Backend**: Django - for handling API requests and backend logic.
- **Database**: PostgreSQL – ensuring data consistency and reliability.

---

## Installation

### Prerequisites

Before you can run the project, make sure you have installed **Docker**, PostgreSQL and all required dependencies

### Step 1: Clone the Repository

You can use the following command to clone the repo:

```bash
git clone https://github.com/Pathfinders-Soen-390/SOEN390-Project-winter2025.git
```

### Step 2: Run the Backend

Once Docker is launched on your device, type the following command in the project's root directory:

```bash
docker compose up --build
```

### Step 3: Start the Frontend

Navigate to the frontend folder and type the following command:

```bash
npm start
```

The final step should launch the app on a mobile device emulator.

---

### Step 3.1: Connection to the backend through the frontend (Temporary)

Locate your IPv4 address on your computer (Open CMD, type ipconfig)

Before building the Docker container, modify settings.py in the backend directory:
Change ALLOWED_HOSTS = [] --> ALLOWED_HOSTS = ['*']

In /frontend/api/api.js, modify the API_BASE_URL to correspond to your own IPv4 address. For example, the current directory is http://192.168.47.56:8000/api, but your local machine might be http://192.168.47.90:8000/api.

## Team Roles

- **Team Leader**: Haifa Janoudi
- **Frontend Development**: Dominique Proulx, Ryan Rebbas, Aman Singh, Hawa-Afnane Said, Hazem Mohamed
- **Backend Development**: Mathieu Phan, Marchelino Habchi, Zineb Alaoui Aziz, Alexandro Coccimiglio

---
