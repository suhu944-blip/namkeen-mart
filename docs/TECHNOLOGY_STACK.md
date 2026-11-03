# Technology Stack: Namkeen E-Commerce Application

This document provides a detailed overview of the tools, frameworks, and libraries powering the Namkeen Mart platform.

---

## 1. Frontend (Client)

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **React.js (v19)** | UI Library | Component-based, reactive user interface development for both customer and admin portals. |
| **Vite** | Build Tool & Dev Server | Ultra-fast Hot Module Replacement (HMR) and optimized modern JavaScript bundling. |
| **Tailwind CSS (v4)** | CSS Styling | Utility-first styling engine providing responsive, modern, and rapid design implementation. |
| **React Router DOM (v7)** | Client-Side Routing | Multi-page SPA navigation, nested layouts, and route guards. |
| **Axios** | HTTP Client | Promise-based asynchronous HTTP client for consuming RESTful APIs with interceptors. |
| **Lucide React** | Iconography | Lightweight, customizable, and modern SVG icon pack. |

---

## 2. Backend (Server)

| Technology | Purpose | Description |
| :--- | :--- | :--- |
| **Node.js (v24 LTS)** | Runtime Environment | Asynchronous event-driven server runtime environment. |
| **Express.js (v4)** | Web Application Framework | Minimalist and flexible web framework for building RESTful endpoints and middleware. |
| **MongoDB** | Database Engine | Scalable, document-oriented NoSQL database for product catalogs, user accounts, and orders. |
| **Mongoose (v8)** | ODM (Object Data Modeling) | Schema validation, business logic hooks, and query helpers for MongoDB. |
| **dotenv** | Environment Configuration | Secure configuration management via isolated `.env` variables. |
| **cors** | Cross-Origin Resource Sharing | Securely allows frontend client origins to communicate with backend APIs. |
| **nodemon** | Development Utility | Automatically restarts the Node server upon code changes during local development. |

---

## 3. Tooling & Best Practices

- **Package Manager**: `npm`
- **Module System**: Standard ES Modules (`import` / `export`) throughout both client and server.
- **Code Separation**: Complete decoupling between frontend and backend.
- **Environment Isolation**: Separate `.env.example` configurations without hardcoded secrets.
- **Version Control**: Git with comprehensive multi-layer `.gitignore`.
