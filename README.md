# JWT Authentication API

A simple **JWT-based authentication API** built with **Node.js**, **TypeScript**, **Express**, and **Prisma (SQLite)**.

The project implements a complete flow for:

- Signing up users
- Signing in and issuing JWT access tokens
- Protecting routes using a JWT authentication middleware

---

## Features

- **User registration (Sign Up)**

  - Endpoint: `POST /sign-up`
  - Creates an `Account` with `name`, `email`, and `password`
  - Passwords are hashed using `bcryptjs`
  - Request body validation using `zod`

- **User authentication (Sign In)**

  - Endpoint: `POST /sign-in`
  - Validates `email` and `password`
  - Verifies password hash using `bcryptjs`
  - Returns a **JWT access token** generated with `jsonwebtoken`
  - Handles invalid credentials with a specific domain error

- **Protected resource**

  - Endpoint: `GET /leads`
  - Protected by a custom `AuthenticationMiddleware`
  - Expects a `Bearer <token>` in the `Authorization` header
  - Rejects missing or invalid tokens with HTTP `401 Unauthorized`

- **JWT service**
  - Encapsulated in `JwtService`
  - `generateToken(userId)`: Signs a token with `{ sub: userId }`, uses `process.env.JWT_SECRET`, expiration: `1d`
  - `verifyToken(token)`: Validates the `Bearer` token format, verifies signature and expiration

---

## Tech Stack

- **Runtime / Language**

  - Node.js
  - TypeScript (v5.9.3)

- **Web Framework**

  - Express (v5.1.0)

- **Authentication**

  - JSON Web Token (`jsonwebtoken` v9.0.2)

- **Data Access**

  - Prisma ORM (v6.19.0)
  - SQLite database with `@prisma/adapter-better-sqlite3`

- **Security**

  - `bcryptjs` (v3.0.3) for password hashing

- **Validation**

  - `zod` (v4.1.12) for schema-based validation

- **Development Tools**
  - `tsx` (v4.20.6) for TypeScript runtime
  - ESLint + TypeScript ESLint
  - Prisma CLI

---

## Project Structure

```
src/
├── index.ts                          # Application entrypoint
├── server/
│   ├── index.ts                      # Express app setup & routes
│   └── adapters/
│       ├── route-adapter.ts          # Controller → Express route adapter
│       └── middleware-adapter.ts     # Middleware → Express middleware adapter
├── application/
│   ├── controller/
│   │   ├── sign-in-controller.ts     # Sign-in HTTP handler
│   │   ├── sign-up-controller.ts     # Sign-up HTTP handler
│   │   └── schemas/
│   │       └── sign-in-schema.ts     # Zod validation schema
│   ├── usecases/
│   │   ├── signin-usecase.ts         # Sign-in business logic
│   │   └── signup-usecase.ts         # Sign-up business logic
│   ├── services/
│   │   ├── jwt-service.ts            # JWT generation & verification
│   │   └── password-hasher.ts        # Password hashing & verification
│   ├── middlewares/
│   │   └── authentication-middleware.ts  # JWT validation middleware
│   ├── interface/
│   │   ├── IController.ts            # Controller contract
│   │   └── IMiddleware.ts            # Middleware contract
│   ├── errors/
│   │   └── invalid-credentials.ts    # Domain error
│   ├── constants/
│   │   └── status-code.ts            # HTTP status codes
│   └── libs/
│       └── prisma-client.ts          # Prisma client instance
├── factories/
│   ├── make-sign-in-usecase.ts       # Assemble SignInUseCase
│   ├── make-sign-in-controller.ts    # Assemble SignInController
│   ├── make-sign-up-usecase.ts       # Assemble SignUpUseCase
│   ├── make-sign-up-controller.ts    # Assemble SignUpController
│   ├── make-authentication-middleware.ts  # Assemble AuthenticationMiddleware
│   ├── make-list-leads-controller.ts # Assemble ListLeadsController
│   └── make-jwt-service.ts           # Assemble JwtService
└── @types/
    └── express.ts                    # Express type augmentation

prisma/
└── schema.prisma                     # Database schema

generated/
└── prisma/                           # Generated Prisma client
```

### Key Components

**`Account` Model (Prisma)**

- `id` (String, CUID)
- `name` (String)
- `email` (String, unique)
- `password` (String, hashed)

**Controllers**

- Implement `IController` interface
- Handle HTTP request/response
- Validate input with `zod`
- Map domain errors to HTTP status codes

**Use Cases**

- Encapsulate business logic
- Orchestrate services and data access
- Return domain objects or throw domain errors

**Services**

- `JwtService`: Token generation and verification
- `PasswordHasher`: Password hashing and comparison

**Middlewares**

- `AuthenticationMiddleware`: Validates JWT tokens from `Authorization` header

**Factories**

- Dependency injection pattern
- Assemble controllers, use cases, services, and middlewares
- Centralized configuration

---

## API Endpoints

### 1. Sign Up

**Request**

```http
POST /sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure-password-123"
}
```

**Success Response (201 Created)**

```json
{
  "id": "clx1a2b3c4d5e6f7g8h9i0j1k",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error Response (400 Bad Request)**

```json
[
  {
    "message": "Invalid email",
    "path": "email"
  }
]
```

---

### 2. Sign In

**Request**

```http
POST /sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure-password-123"
}
```

**Success Response (200 OK)**

```json
{
  "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401 Unauthorized)**

```json
{
  "error": "InvalidCredentialsException",
  "message": "Invalid credentials"
}
```

---

### 3. Get Leads (Protected)

**Request**

```http
GET /leads
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200 OK)**

```json
[
  {
    "id": "lead-1",
    "name": "Lead Name",
    "email": "lead@example.com"
  }
]
```

**Error Response (401 Unauthorized)**

```json
{
  "error": "Invalid access token."
}
```

---

## Authentication Flow

1. **User Sign Up**

   - POST `/sign-up` with name, email, password
   - Password is hashed with `bcryptjs`
   - Account is stored in the database

2. **User Sign In**

   - POST `/sign-in` with email and password
   - System retrieves account by email
   - Password is compared with stored hash
   - JWT token is generated with user ID as `sub` claim
   - Token is returned to client

3. **Access Protected Resource**
   - Client sends GET `/leads` with `Authorization: Bearer <token>`
   - `AuthenticationMiddleware` validates token
   - If valid, `accountId` is extracted and passed to the controller
   - If invalid, request is rejected with `401 Unauthorized`

---

## Error Handling

The API uses domain-driven error handling:

- **`InvalidCredentialsException`**: Thrown when email or password is invalid

  - HTTP Status: `401 Unauthorized`
  - Response: `{ error: "InvalidCredentialsException", message: "Invalid credentials" }`

- **`ZodError`**: Thrown when request body validation fails

  - HTTP Status: `400 Bad Request`
  - Response: Array of validation errors with `message` and `path`

- **Invalid Token**: Thrown by `JwtService` when token is missing, malformed, or expired
  - HTTP Status: `401 Unauthorized`
  - Response: `{ error: "Invalid access token." }`

---

## Security Considerations

- **Password Hashing**: Passwords are hashed using `bcryptjs` with salt rounds (default: 10)
- **JWT Secret**: Must be a strong, random string stored in environment variables
- **Token Expiration**: Access tokens expire after 1 day
- **Bearer Token Format**: Tokens must be prefixed with `Bearer ` in the `Authorization` header
- **HTTPS**: In production, always use HTTPS to protect tokens in transit
- **CORS**: Configure CORS appropriately for your frontend domain
