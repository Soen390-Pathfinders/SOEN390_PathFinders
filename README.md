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

#### Step 2.1: Windows Setup

If you are using Windows, you first need to follow the instructions provided in this 👉 [trello card](https://trello.com/c/wga7XPGq/12-bug-3-pytest-fail-due-to-docker).

#### Step 2.2: Building the Docker Container

Once Docker is launched on your device, type the following command in the project's root directory:

```bash
docker compose up --build
```

#### Step 2.3: Navigate to the Backend Container

Inside the Docker application, click on the backend_container and then navigate to the Exec tab.

#### Step 2.4: Intialize the Database

Now, write the `python manage.py migrate` command to create the tables in the database.
Then, write the `python manage.py initialize` command to populate the database.
(Note: Currently the information available might be limited)

#### Step 2.5: Clear the database

If you want to clear the database, write in the project's root directory:

```bash
docker compose down -v
```

and then start from the beginning of step 2 to build the database.

### Step 3: Start the Frontend

Navigate to the frontend folder and type the following command:

```bash
npm start
```

The final step should launch the app on a mobile device emulator.

---

## Team Roles

- **Team Leader**: Haifa Janoudi
- **Frontend Development**: Dominique Proulx, Ryan Rebbas, Aman Singh, Hawa-Afnane Said, Hazem Mohamed
- **Backend Development**: Mathieu Phan, Marchelino Habchi, Zineb Alaoui Aziz, Alexandro Coccimiglio

---
