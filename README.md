# Namkeen Mart - Full-Stack E-Commerce Platform

A modern, full-stack MERN e-commerce web application for authentic Indian savory snacks (namkeen). The application features two decoupled portals:
- **Customer Storefront**: Browse categories, filter/search snacks, view details, register and log in.
- **Admin Management Panel**: Dashboard analytics, product CRUD, category CRUD with assignment protection, and inventory visibility.

---

## 🛠️ Technology Stack

- **Frontend**: React 19 (`.jsx`), Vite, Tailwind CSS v4, React Router DOM v7, Axios, Lucide React, Context API (`AuthContext`)
- **Backend**: Node.js, Express.js (`.js`), MongoDB, Mongoose, JWT Authentication, bcryptjs, Dotenv, CORS
- **Architecture**: Strict MVC (`React → API Route → Controller → Service → Model → MongoDB`) with ES Modules (`import`/`export`)

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Portal |
| :--- | :--- | :--- | :--- |
| **Store Administrator** | `admin@namkeenmart.com` | `AdminPassword123!` | `/admin/login` |
| **Demo Customer** | `customer@namkeenmart.com` | `Customer123!` | `/login` |

*(A convenient **"Auto-Fill"** button is also available on both login pages for rapid evaluation!)*

---

## 📂 Project Structure

```text
namkeen-mart-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Sticky nav, brand, search, cart placeholder & auth
│   │   │   ├── Footer.jsx           # Heritage story, quick links & contact
│   │   │   ├── ProductCard.jsx      # Snack card with pricing, badges & quick view
│   │   │   └── CategoryCard.jsx     # Curated category cards with image zoom
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state, JWT storage & user roles
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx       # Customer portal shell
│   │   │   └── AdminLayout.jsx      # Admin sidebar & topbar navigation shell
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Hero, dynamic categories, featured & about sections
│   │   │   ├── Products.jsx         # Full catalog with search, category & sort filters
│   │   │   ├── Login.jsx            # Customer sign in with validation
│   │   │   ├── Register.jsx         # Customer registration with validation
│   │   │   └── admin/
│   │   │       ├── AdminLogin.jsx       # Dedicated admin entrance with security guard
│   │   │       ├── Dashboard.jsx        # Live statistics & quick actions
│   │   │       ├── ManageProducts.jsx   # Product CRUD with live status & featured toggles
│   │   │       └── ManageCategories.jsx # Category CRUD with product assignment safety check
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx        # Customer & protected admin route definitions
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance with JWT interceptor
│   │   │   ├── authService.js       # Customer & Admin auth endpoints
│   │   │   ├── productService.js    # Product catalog endpoints
│   │   │   └── categoryService.js   # Category management endpoints
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js                # Mongoose connection with fallback safety
│   ├── controllers/             # HTTP request/response handlers
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification & admin role check
│   │   └── errorMiddleware.js   # 404 & global error formatter
│   ├── models/                  # Mongoose data schemas
│   │   ├── User.js              # Name, email, mobile, password, role, isActive
│   │   ├── Category.js          # Name, description, image, isActive
│   │   └── Product.js           # Name, description, category, price, stock, isFeatured
│   ├── routes/                  # Express REST routes
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   ├── adminRoutes.js
│   │   └── health.routes.js
│   ├── services/                # Business logic & database operations
│   │   ├── authService.js
│   │   ├── categoryService.js
│   │   ├── productService.js
│   │   ├── adminService.js
│   │   └── mockStore.js         # Zero-config initial seed & fallback store
│   ├── utils/
│   │   └── seed.js              # Standalone / startup seed script
│   ├── app.js                   # Express pipeline & CORS config
│   ├── server.js                # HTTP listener
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── PROJECT_OVERVIEW.md
│   ├── TECHNOLOGY_STACK.md
│   └── FOLDER_STRUCTURE.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Backend (Server)

```bash
cd server
npm install
npm run dev
```

- Server URL: `http://localhost:5000`
- Health check: [http://localhost:5000/api/health](http://localhost:5000/api/health)
- API Index: [http://localhost:5000/](http://localhost:5000/)

### 2. Frontend (Client)

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

- Customer Store: [http://localhost:5173/](http://localhost:5173/)
- Admin Portal: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🔌 API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` – Public customer registration (saves role as `customer`)
- `POST /api/auth/login` – Customer or Admin login (returns JWT token)
- `GET /api/auth/me` – Authenticated user profile

### Categories (`/api/categories`)
- `GET /api/categories` – Public active categories
- `GET /api/categories/:id` – Public single category
- `POST /api/categories` – Protected Admin add category
- `PUT /api/categories/:id` – Protected Admin edit category
- `DELETE /api/categories/:id` – Protected Admin delete category (blocks deletion if products are assigned)

### Products (`/api/products`)
- `GET /api/products` – Public catalog with `?search=...`, `?category=...`, `?sort=...`
- `GET /api/products/featured` – Public featured products for home page spotlight
- `GET /api/products/category/:categoryId` – Public products for specific category
- `GET /api/products/:id` – Public product details
- `POST /api/products` – Protected Admin add product
- `PUT /api/products/:id` – Protected Admin edit product
- `DELETE /api/products/:id` – Protected Admin delete product

### Admin (`/api/admin`)
- `GET /api/admin/dashboard` – Protected Admin dashboard statistics & recent products
- `GET /api/admin/products` – Protected Admin full products list with filters
- `GET /api/admin/categories` – Protected Admin full categories list with product counts

---

## 📌 Phased Roadmap

- **Phase 1 (Initial Setup)**: Completed ✅
- **Phase 2 (Home Page, Authentication & Admin Product Management)**: Completed ✅
- **Phase 3 (Shopping Cart, Checkout, Orders, Payments)**: Pending next phase prompt ⏳
