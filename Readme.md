# Role-Based Access Control API

This project is a Node.js application that implements role-based access control (RBAC) using Express. The API allows users with different roles (Admin, Moderator, User) to access specific routes based on their roles. The routes and permissions("read","update","create") are protected using JSON Web Tokens (JWT), ensuring secure and controlled access to the system.

## Features

- **Role-Based Authorization**: Protects routes based on user roles.
  - **Admin Route**: Accessible only to users with the "admin" role.
  - **Moderator Route**: Accessible to users with "admin" or "moderator" roles.
  - **User Route**: Accessible to all authenticated users.
- **JWT Authentication**: Secures endpoints using JWT tokens to ensure that only authenticated users can access protected routes.
- **Logging**: Uses a Winston based custom logging system to track user access and activities.
- **Database Integration**: Connects to a MongoDB database to store user data (like roles).

## Routes

The following routes are available:

### Admin Route

`POST /api/request/admin`  
Accessible only by users with the "admin" role.  
Returns a message confirming admin access with the user’s name and role.

### Moderator Route

`POST /api/request/moderator`  
Accessible by both "admin" and "moderator" users.  
Returns a message confirming moderator access with the user’s name and role.

### User Route

`POST /api/request/user`  
Accessible by all authenticated users.  
Returns a message confirming user access with the user’s name.

### User Permission Route

`POST /api/request/permission`  
Verifies whether the user has the required permission to access a specific route.
![image](https://github.com/user-attachments/assets/90be1d92-d5a5-4824-b21e-cd957606b02c)

Returns a success message confirming user permission.

## Installation

Follow these steps to set up the project locally:

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- MongoDB (for local development)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/role-based-authorization.git
   ```

2. Navigate to the project directory:

   ```bash
   cd role-based-authorization
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret_key
   PORT=3010
   ```
5. Generate JWT secret key
   Open cmd and type - node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   it will generate a secret key similar to this
   ebae5b8d2c54ad8547cfbfa44b7ab451dffdc2d0e91f88e6bfee1f440492d23g
6. Run the server:

   ```bash
   npm start
   ```

7. Test the API using Postman or any API testing tool by sending requests to the routes with appropriate JWT tokens.

## Testing

To run the tests:

```bash
npm run test
```

This will run the test suite using Jest to ensure the routes and authorization logic are working as expected.

### Test Coverage

Tests are written using Jest and cover the following aspects:

- Authentication and JWT token verification.
- Role-based access control for each route.
- Logging and error handling.
