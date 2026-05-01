# Code Standards

## General

- **Language:** JavaScript (ES6+). No TypeScript is used in this project.
- **Module System:** CommonJS (`require`/`module.exports`) is the standard for the entire backend.
- **Variable Declaration:** Use `const` for all declarations that won't be reassigned. Use `let` only when necessary. Avoid `var`.
- **Naming Conventions:** 
    - **Directories:** PascalCase for core folders (`Controllers`, `Models`, `Routers`).
    - **Files:** PascalCase for controllers, models, and routers (e.g., `AuthController.js`, `User.js`).
    - **Variables/Functions:** camelCase for everything else.

## Express & Async Logic

- **Async Wrappers:** Every asynchronous route handler must be wrapped with `CatchAsync` to ensure errors are automatically passed to the global error handler.
- **Error Handling:** Use the `AppError` class for all operational errors. Specify a descriptive message and an appropriate HTTP status code.
- **Global Error Handler:** Never send error responses directly from controllers. Always use `next(new AppError(...))` to let `ErrorController.js` handle the response formatting.

## Models & Database

- **Mongoose Schemas:** Define all data logic and validation inside the `Models/` directory.
- **Data Integrity:** Use the `validator` package within Mongoose schemas for complex validations (e.g., email format).
- **Security Hooks:** Use Mongoose `pre('save')` hooks for password hashing to ensure consistency across the application.
- **Data Leakage:** Always exclude sensitive fields like `password`, `__v`, and `refreshToken` from the final API response.

## API Design

- **RESTful Routes:** Follow standard REST principles. Use nouns for resource paths and HTTP verbs for actions.
- **Response Shape:** Maintain a consistent JSON response structure:
  - Success: `{ status: 'success', data: { ... } }`
  - Error/Fail: `{ status: 'error', message: '...' }`
- **Versioning:** All API endpoints must be prefixed with `/api/v1/`.

## Security Standards

- **Password Hashing:** Use `bcryptjs` with a cost factor (salt rounds) of 12.
- **Token Management:** Deliver JWTs (Access and Refresh) via HTTP-only cookies to mitigate XSS risks.
- **Input Sanitization:** Sanitize and validate all incoming `req.body` data before processing business logic.

## File Organization

- `Controllers/` — Contains the implementation logic for each route. Keep these functions focused on handling the request and returning a response.
- `Models/` — Contains Mongoose schema definitions. This is the source of truth for the data structure.
- `Routers/` — Contains the definition of API endpoints. Use these files to map HTTP methods to controller functions and apply middleware.
- `Utili/` — Contains reusable helper functions like `AppError`, `CatchAsync`, and `Email`.
