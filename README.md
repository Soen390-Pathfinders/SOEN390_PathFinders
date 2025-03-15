# Concordia Campus Navigation App -- version 0.0.1 [![.github/workflows/ci.yml](https://github.com/Soen390-Pathfinders/SOEN390_PathFinders/actions/workflows/ci.yml/badge.svg)](https://github.com/Soen390-Pathfinders/SOEN390_PathFinders/actions/workflows/ci.yml)
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
git clone https://github.com/Soen390-Pathfinders/SOEN390_PathFinders.git
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


### Step 4: Connection from Frontend to Backend
Assuming Windows OS:
1. Open your command prompt and type ipconfig, take note of your Wireless LAN IPv4 Address (Should look something like 192.168.xxx.xxx)
2. Modify /frontend/api/api.js variable API_BASE_URL from "http://localhost:8000/api" to "http://{YOUR_IPv4_ADDRESS}:8000/api", something like "http://192.168.0.126:8000/api"
3. Modify /backend/backend/settings.py variable ALLOWED_HOSTS = [] to ALLOWED_HOSTS = ["*"]
4. Rebuild docker container if one is already active (Docker compose down -v  /// Docker compose up --build)

At this point it should work if you are using mobile data, if you are using WIFI:

5. Open Windows Defender Firewall
6. Click advanced settings on the left
7. Click inbound rules tab on the left
8. Click New rule on the right
9. Choose TCP --> Specific local ports : 8000 --> Allow --> Next --> Name it whatever you want (I named it SOEN390DockerConnection)



---

## Team Roles

- **Team Leader**: Haifa Janoudi
- **Frontend Development**: Dominique Proulx, Ryan Rebbas, Aman Singh, Hawa-Afnane Said, Hazem Mohamed
- **Backend Development**: Mathieu Phan, Marchelino Habchi, Zineb Alaoui Aziz, Alexandro Coccimiglio

---
