# ThoughtVault

A full-stack MERN application for managing personal thoughts securely.
- **Live Demo**: [Start Journaling](https://thoughtvault.onrender.com/)

## Features
- **Authentication**: JWT-based signup/login.
- **CRUD**: Create, Read, Update, Delete thoughts.
- **Mood Tracking**: Tag thoughts with moods.
- **Responsive UI**: Modern interface with Tailwind CSS.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB URI

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository_url>
    cd thoughtvault
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    # Create a .env file
    # PORT=5000
    # MONGO_URI=your_mongodb_uri
    # JWT_SECRET=your_secret_key
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd client
    npm install
    npm run dev
    ```

4.  **Open the App**
    Visit `http://localhost:5173`
