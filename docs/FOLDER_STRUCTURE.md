# Folder Structure: Namkeen E-Commerce Application

This document outlines the organization and purpose of each directory and configuration file in the project.

---

## 1. Root Layout

```text
namkeen-mart-app/
├── client/          # Frontend React SPA (Customer storefront & Admin panel)
├── server/          # Backend Express.js REST API & Database models
├── docs/            # Architecture, specifications, and setup documentation
├── .gitignore       # Root Git exclusion rules
└── README.md        # Getting started guide and project index
```

---

## 2. Frontend Structure (`client/`)

```text
client/
├── public/              # Static assets directly served (favicons, manifest, etc.)
├── src/
│   ├── assets/          # Brand logos, static banners, namkeen graphics
│   ├── components/      # Shared, reusable UI widgets (Buttons, Modals, Badges)
│   ├── pages/           # View components mapped to routes (Home, Product, Cart, Admin)
│   ├── layouts/         # Layout wrappers (CustomerLayout, AdminLayout, AuthLayout)
│   ├── routes/          # Route definitions and protected route wrappers
│   ├── services/        # Axios API clients, base HTTP configurations, and endpoints
│   ├── hooks/           # Custom React hooks (useAuth, useCart, useFetch)
│   ├── context/         # React Context state management (AuthContext, CartContext)
│   ├── utils/           # Helper functions, formatters (currency, dates, validation)
│   ├── App.jsx          # Root application entry component
│   ├── main.jsx         # React DOM mount point
│   └── index.css        # Tailwind CSS imports and global styling rules
├── .env.example         # Template for client-side environment variables
├── .gitignore           # Client-specific Git ignores
├── index.html           # HTML template container
├── package.json         # Frontend dependencies and npm scripts
└── vite.config.js       # Vite configuration with React and Tailwind plugins
```

---

## 3. Backend Structure (`server/`)

```text
server/
├── config/              # Configuration files (Database connection, third-party services)
├── controllers/         # Request handling logic, input validation, and responses
├── models/              # Mongoose data schemas (User, Product, Order, Category)
├── routes/              # Express API route declarations (auth, products, orders, health)
├── services/            # Business logic and external service integrations
├── middleware/          # Custom middleware (authentication checks, error handlers, rate limiting)
├── utils/               # Utility functions (logger, tokens, helpers)
├── app.js               # Express application setup, middleware pipeline, and route mounts
├── server.js            # Entry point: environment loader, DB connection, and HTTP listener
├── .env.example         # Template for backend environment variables
├── .gitignore           # Server-specific Git ignores
└── package.json         # Backend dependencies and npm scripts
```

---

## 4. Documentation Structure (`docs/`)

```text
docs/
├── PROJECT_OVERVIEW.md  # Business scope, key portals, and phased roadmap
├── TECHNOLOGY_STACK.md  # Detailed breakdown of frontend and backend technologies
└── FOLDER_STRUCTURE.md  # Comprehensive structural breakdown and directory guidelines
```
