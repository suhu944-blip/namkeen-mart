# Project Overview: Namkeen E-Commerce Application (Namkeen Mart)

## 1. Introduction

The **Namkeen E-Commerce Application** is a specialized, full-stack digital storefront engineered for authentic savory snacks (namkeen, mixtures, fafda, sev, bhujia, mathri, dry-fruit mixes, etc.). The platform delivers a fast, responsive, and delightful shopping experience for consumers while giving store administrators full operational control.

## 2. Core Portals

The application is architected into two primary sections:

### 2.1 Customer Website (Storefront)
- **Product Exploration**: Browse categories, filter by taste/spice level, search by ingredients, and view product details.
- **Cart & Ordering**: Smooth add-to-cart, cart quantity adjustments, address selection, and secure checkout.
- **Customer Account**: Profile management, order history tracking, and order status updates.

### 2.2 Admin Panel (Management)
- **Catalog & Inventory**: Manage products, flavors, weights, batches, packaging sizes, pricing, and stock levels.
- **Order Processing**: Review incoming orders, dispatch batches, update delivery states, and handle invoices.
- **Customer Insights & Reports**: View buyer activity, popular snack trends, and revenue metrics.

## 3. High-Level Architecture

The system follows a clean **MERN Stack** decoupled architecture:

```
┌────────────────────────────────┐         ┌────────────────────────────────┐
│   Customer Web Application     │         │       Admin Dashboard          │
│   (React + Vite + Tailwind)    │         │   (React + Vite + Tailwind)    │
└───────────────┬────────────────┘         └───────────────┬────────────────┘
                │                                          │
                └───────────────────┬──────────────────────┘
                                    │ HTTP / JSON REST APIs
                                    ▼
                        ┌───────────────────────┐
                        │    Express.js API     │
                        │    (Node.js Server)   │
                        └───────────┬───────────┘
                                    │ Mongoose ODM
                                    ▼
                        ┌───────────────────────┐
                        │   MongoDB Database    │
                        └───────────────────────┘
```

## 4. Development Roadmap

- **Phase 1 (Current)**: Foundation & Scaffolding (Folder structure, independent client & server configuration, CORS, health endpoint, base documentation).
- **Phase 2**: Authentication & User/Admin authorization (JWT, secure cookies, role checks).
- **Phase 3**: Product & Category management (Schemas, CRUD endpoints, filtering).
- **Phase 4**: Shopping Cart & Address management.
- **Phase 5**: Orders & Payment gateway integration.
- **Phase 6**: Admin operations, stock alerts & reporting.
