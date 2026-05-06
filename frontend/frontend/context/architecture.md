# Architecture Context

## Stack

| Layer     | Technology                  | Role   |
| --------- | --------------------------- | ------ |
| Framework | Node.js + Express.js        | Backend server and API framework |
| Database  | MongoDB + Mongoose          | NoSQL data storage and object modeling |
| Auth      | Custom JWT + bcryptjs       | Secure authentication and token management |
| Payments  | Stripe API                  | Payment processing and transaction management |
| Email     | Nodemailer                  | Transactional emails and OTP delivery |
| Utilities | validator + dotenv          | Data validation and environment configuration |

## System Boundaries

- `Controllers/` — Implements business logic and handles incoming HTTP requests/responses.
- `Models/` — Defines data schemas and manages interactions with MongoDB collections.
- `Routers/` — Defines API endpoints and maps them to corresponding controller functions.
- `Utili/` — Provides reusable utility functions, error handling, and cross-cutting helpers.
- `context/` — Maintains project documentation and architectural context.

## Storage Model

- **MongoDB (Atlas)**: Stores all persistent application data, including:
  - User profiles and credentials
  - Room inventory and details
  - Booking records and statuses
  - Payment transaction history
- **Environment Config**: Sensitive keys and connection strings managed via `.env` files (e.g., `config.env`).

## Auth and Access Model

- **Authentication**: Implements a secure dual-token system using JWT (short-lived Access Tokens and long-lived Refresh Tokens).
- **Token Delivery**: Tokens are primarily delivered via HTTP-only cookies to protect against XSS attacks.
- **RBAC**: Role-Based Access Control with `user` and `admin` roles defined in the User model.
- **Password Security**: Passwords are salted and hashed using `bcryptjs` before storage.
- **Account Recovery**: OTP-based password reset flow using email delivery and hashed verification codes.

## Invariants

1. **Error Handling**: All asynchronous and synchronous errors must be passed to the global error handling middleware via `next(new AppError(...))`.
2. **Data Privacy**: Sensitive fields like passwords and refresh tokens must never be included in API responses (set to `undefined` or excluded in schema).
3. **Database Integrity**: The application must not start or process requests unless a successful connection to MongoDB is established.
4. **Validation**: All incoming request data must be validated against Mongoose schema definitions and custom validator logic before processing.
5. **Session Safety**: Refresh tokens in the database must match those provided by the client to maintain a valid session.
