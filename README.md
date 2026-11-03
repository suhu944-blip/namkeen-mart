# Namkeen Mart - Full-Stack E-Commerce Platform

A modern, scalable MERN-stack e-commerce web application for authentic Indian savory snacks (namkeen). The application features two decoupled portals:
- **User Side**: Storefront for customers to browse, filter, and buy snacks.
- **Admin Panel**: Operational dashboard for inventory, orders, and customer management.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Axios, Lucide React
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Dotenv, CORS
- **Architecture**: Decoupled Client-Server with ES Modules (`import`/`export`)

---

## 📂 Project Structure

```text
namkeen-mart-app/
├── client/          # Frontend React + Vite application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/          # Backend Express.js REST API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── docs/            # Architecture & specifications
│   ├── PROJECT_OVERVIEW.md
│   ├── TECHNOLOGY_STACK.md
│   └── FOLDER_STRUCTURE.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended; v24 tested)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster URI)
- [npm](https://www.npmjs.com/) (v9 or higher)

---

### 1. Server Setup

Navigate to the `server/` directory:

```bash
cd server
```

Copy the environment file:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Install backend dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The server will start at `http://localhost:5000`.  
Verify health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

### 2. Client Setup

In a new terminal, navigate to the `client/` directory:

```bash
cd client
```

Copy the environment file:
```bash
cp .env.example .env
```
*(On Windows PowerShell: `Copy-Item .env.example .env`)*

Install frontend dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 📋 Available Scripts

### In `server/`:
- `npm start` – Runs the Express server in production mode.
- `npm run dev` – Runs the Express server with `nodemon` for auto-restart on changes.

### In `client/`:
- `npm run dev` – Starts the local Vite development server with HMR.
- `npm run build` – Compiles production assets into `client/dist`.
- `npm run preview` – Locally previews the production build.

---

## 📖 Documentation

Detailed documentation is available in the `docs/` folder:
- [Project Overview](file:///c:/PROJECT/namkeen-mart-app/docs/PROJECT_OVERVIEW.md)
- [Technology Stack](file:///c:/PROJECT/namkeen-mart-app/docs/TECHNOLOGY_STACK.md)
- [Folder Structure](file:///c:/PROJECT/namkeen-mart-app/docs/FOLDER_STRUCTURE.md)

---

## 📌 Phase Status

- **Phase 1 (Initial Setup)**: Completed ✅
- **Phase 2 (Authentication & User Roles)**: Pending next phase prompt ⏳
