# AuthX: Ultimate Authentication System

AuthX is a simple and flexible system for handling user logins and signups. It comes with the basic features you need, like creating accounts, logging in, verifying emails, resetting passwords, and giving users access to certain areas using JWT. 

It’s a great starting point if you need to set up full authentication for your app. The frontend is made with **React**, the backend runs on **Express**, and **MongoDB** is used as the database. You can easily change or add features to fit your project.

## Tech Stack

[![AuthX](https://skillicons.dev/icons?i=react,express,nodejs,mongodb,js,vercel,postman,md,npm,git,github,vscode&perline=6)](https://github.com/ramxcodes)

**Frontend**: 
- React for the user interface and state management.

**Backend**: 
- Express for handling server-side logic and API routes.
- MongoDB for database storage and Mongoose for data modeling.
- Mailtrap for email services (email verification, password reset).

**Security**:
- JWT for authentication and secure token management.
- Bcrypt for password hashing.

**Other Tools**:
- Dotenv for managing environment variables.
- Cookie-parser for handling cookies in requests.

## Features

- **User Registration**: Users can sign up with email and password.
- **User Login**: Secure login functionality with hashed passwords and JWT.
- **Email Verification**: Users receive a verification email to verify their account.
- **Password Reset**: Allows users to reset their password via email link.
- **Token-based Authentication**: Protects routes with JWT token verification.
- **User Logout**: Handles secure token invalidation.
- **Authentication Middleware**: Ensures protected routes are only accessible to authenticated users.

## Getting Started

### Prerequisites

- Node.js installed on your system.
- MongoDB instance (local or cloud, such as MongoDB Atlas).
- Mailtrap account for email services.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramxcodes/AuthX.git
   ```
   
2. Navigate into the project directory:
   ```bash
   cd AuthX
   ```

3. Install server dependencies:
   ```bash
   npm install
   ```

4. Install front end dependencies:
   ```bash
   cd frontend
   npm install
   cd ..
   ```

5. Create a `.env` file in the root directory and add the following environment variables:
   ```bash
    MONGO_URI = MONGO_URL
    PORT = 5000/3000
    JWT_SECRET= YOUR_SECRET
    NODE_ENV= DEVELOPMENT/PRODUCTION
    MAILTRAP_TOKEN= YOUR_MAILTRAP_TOKEN
    CLIENT_URL= YOUR_LOCAL/ONLINE_URL (http://localhost:5173)
   ```

### Running the Application

1. Start the backend server:
   ```bash
   npm start
   ```

2. Start the React frontend:
   ```bash
   cd client
   npm start
   ```

3. Visit your app at `http://localhost:5173` (for frontend) and the API is accessible at `http://localhost:5000/api`.

## API Endpoints

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login an existing user.
- **POST /api/auth/logout**: Logout the current user.
- **POST /api/auth/verify-email**: Verify user's email using a token.
- **POST /api/auth/forgot-password**: Request a password reset email.
- **POST /api/auth/reset-password/:token**: Reset password using the reset token.
- **GET /api/auth/check-auth**: Check user authentication status (requires token).

## License

This project is licensed under the MIT License.

---

## Creator

- **Name**: Ramkrishna Swarnkar
- **GitHub**: [@ramxcodes](https://github.com/ramxcodes)
- **LinkedIn**: [@ramxcodes](https://www.linkedin.com/in/ramxcodes)
- **Twitter**: [@ramxcodes](https://twitter.com/ramxcodes)
