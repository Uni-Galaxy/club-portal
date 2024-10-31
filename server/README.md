
# Club Portal Backend

This repository contains the backend code for the Club Portal, built with Express.js, MySQL, and Sequelize ORM. The portal manages club events, members, and other relevant details, offering a structured API for data access and management.

## Features

- User authentication with Google OAuth (via Passport.js).
- Management of clubs and events with detailed models for storing relevant data.
- MySQL as the database with Sequelize ORM for schema definition and querying.
- JWT-based authentication for secure API access.
- Support for CRUD operations on events, users, and clubs.

## Prerequisites

Before you begin, ensure you have the following dependencies installed:

- Node.js
- npm
- MySQL

## Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/Uni-Galaxy/club-portal.git
   ```

2. **Install dependencies:**

   ```bash
   cd club-portal/server
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext

   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=club_portal_db
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

## Entry Point

The entry point for the backend server is located at `server/index.js`.

## Running the Application

To start the server, run:

   ```bash
   npm start
   ```

The API will be available at `http://localhost:<PORT>` (default port: 5000).

## Database

This backend uses MySQL for database management with Sequelize ORM for defining models and relationships.

### Database Models

1. **User Model**: Manages user details, including Google OAuth fields.
2. **Club Model**: Stores club information, linked to the `User` model for club presidents.
3. **Event Model**: Stores event details including the hosting club, dates, and times.

## API Endpoints

### Club Endpoints

- **GET /api/clubs** - Retrieves a list of all clubs.
- **POST /api/clubs** - Adds a new club to the database.
- **GET /api/clubs/:id** - Retrieves details of a specific club by ID.
- **PUT /api/clubs/:id** - Updates the details of a specific club.
- **DELETE /api/clubs/:id** - Deletes a club by ID.

### Event Endpoints

- **GET /api/events** - Retrieves a list of all events.
- **POST /api/events** - Creates a new event.
- **GET /api/events/:id** - Retrieves details of a specific event by ID.
- **PUT /api/events/:id** - Updates event details.
- **DELETE /api/events/:id** - Deletes an event by ID.

### Authentication Endpoint

- **POST /api/auth/google** - Google login endpoint for user authentication.

## Middlewares

- **authenticateUser**: Validates JWT for API access and assigns `req.user` with the authenticated user's information.
- **errorHandler**: Centralized error handler to catch and return standardized error responses.

## Using Sequelize ORM

The project uses Sequelize to define and manage models and relationships:

- **User Model**: Defines user details including Google OAuth fields.
- **Club Model**: Stores club information, linked to the `User` model for club presidents.
- **Event Model**: Stores event details including the hosting club, dates, and times.

## Testing

To run the tests for this backend, use the following command:

   ```bash
   npm test
   ```

## WebSocket Integration

For real-time updates, WebSocket integration can be added in future updates to support event notifications and live interactions.

## Contributing

Contributions are welcome! Please submit pull requests or open issues for suggestions or bug reports.

### Frontend Repository

[Frontend Implementation](https://github.com/Uni-Galaxy/club-portal/tree/main/client)
