# PulseMate Server

A robust backend server for the PulseMate dating application that handles user authentication, profile management, and match-finding functionality.

---

## 📖 Overview

PulseMate Server is the backend infrastructure for a dating application that connects users based on their location, age, and shared interests. The server provides secure API endpoints for user registration, authentication, profile management, and match discovery.

---

## ✨ Features

- 🔐 **JWT Authentication**: Secure user authentication using JSON Web Tokens  
- 👤 **User Profiles**: Store and manage user profiles with personal information  
- ❤️ **Match Algorithm**: Find potential matches based on user preferences, location, and interests  
- 🗃️ **MongoDB Integration**: Efficient data storage and retrieval using MongoDB  
- 📡 **RESTful API**: Well-structured API endpoints for client applications  

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB  
- JSON Web Tokens (JWT)  
- Mongoose ODM  

---

## 📁 Project Structure

```
pulse_mate_server/
├── .github/workflows/    # GitHub Actions workflows
├── controllers/          # Request handlers and business logic
├── data/                 # Data models and database utilities
├── middlewares/          # Custom middleware functions
├── models/               # MongoDB schema definitions
├── routes/               # API route definitions
├── service/              # Service layer for business logic
├── connect.js            # Database connection setup
├── index.js              # Application entry point
└── package.json          # Project metadata and dependencies
```

---

## ⚙️ Getting Started

### 📦 Prerequisites

- Node.js
- MongoDB (local instance or MongoDB Atlas)

---

### 🔧 Installation

```bash
# 1. Clone the repository
git clone https://github.com/ezsarthak/pulse_mate_server.git
cd pulse_mate_server

# 2. Install dependencies
npm install
```

---

### ⚙️ Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
DB=your_mongodb_connection_string //MongoDB 
SECRET=your_jwt_secret_key // JWT Secret Key
```

---

### 🟢 Start the Server

```bash
npm start
```

---

## 📘 API Endpoints

### 🔐 Authentication

- `POST /user/signup` - Register a new user  
- `POST /user/login` - Authenticate a user and get token  

---


### ❤️ Matches

- `GET /filter-users` - Get potential matches based on preferences  


---

## 🧾 User Data Model

The application stores the following user information:

- Basic profile (name, email, password)  
- Age  
- Location (coordinates or address)  
- Interests/preferences  


---

## 🤝 Contributing

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "Add some amazing feature"

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 📬 Contact

**Project Link:** [https://github.com/ezsarthak/pulse_mate_server](https://github.com/ezsarthak/pulse_mate_server)
