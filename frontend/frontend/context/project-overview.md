# Future Hotel Booking System

## Overview

The Future Hotel Booking System is a robust backend API designed to power modern hospitality platforms. It provides a comprehensive suite of services for travelers to discover rooms, manage reservations, and process secure payments, while offering hotel administrators the tools necessary to manage inventory and oversee operations. The system solves the complexity of real-time availability tracking, secure financial transactions, and user session management in a scalable Node.js environment.

## Goals

1. **Secure Transactions:** Implement industry-standard security for user data and financial transactions using Stripe and JWT.
2. **Reliable Booking Logic:** Ensure high data integrity for room availability and reservation states to prevent double-booking.
3. **Developer Experience:** Provide a clean, versioned REST API with consistent error reporting for easy frontend integration.
4. **Administrative Control:** Empower staff with secure endpoints to manage room inventory and monitor bookings.

## Core User Flow

1. **Authentication:** User registers an account or logs in via secure JWT-based authentication.
2. **Discovery:** User browses and filters available hotel rooms based on specific criteria.
3. **Reservation:** User selects a desired room and creates a pending booking record.
4. **Checkout:** User initiates a secure payment process through Stripe integration.
5. **Confirmation:** Upon successful payment, the booking status is updated, and the user receives confirmation.
6. **Management:** User views their booking history or admins manage global inventory.

## Features

### User & Security
- **Authentication:** Secure signup, login, and logout flows with Refresh Token rotation.
- **Account Recovery:** OTP-based password reset via email delivery.
- **RBAC:** Role-Based Access Control distinguishing between standard users and administrators.

### Room & Inventory
- **Room Management:** CRUD operations for hotel rooms, including pricing, bed types, and descriptions.
- **Availability Tracking:** Logic to manage room status and prevent booking conflicts.

### Booking & Payments
- **Reservation System:** End-to-end booking lifecycle management.
- **Stripe Integration:** Secure payment session creation and transaction handling.
- **Transaction Logging:** Persistent records of all payment activities for audit and history.

## Scope

### In Scope
- Development of the RESTful API using Node.js and Express.
- Database schema design and management using MongoDB/Mongoose.
- Integration of 3rd-party services (Stripe for payments, Nodemailer for transactional emails).
- Security implementation (JWT, password hashing, CORS, input validation).

### Out of Scope
- Client-side application development (Frontend/Mobile).
- Physical hotel hardware integration (e.g., smart locks).
- Real-time chat or support systems.

## Success Criteria

1. **Functional Booking:** A registered user can successfully book a room and complete a payment.
2. **Secure Access:** Protected routes correctly reject unauthorized requests and enforce role permissions.
3. **Reliable API:** All endpoints return predictable JSON responses and handle errors gracefully through a global handler.
4. **Operational DB:** Data persists correctly across server restarts with validated schema constraints.
