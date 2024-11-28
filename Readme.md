# Role-Based Access Control API

This project is a Node.js application that implements role-based access control (RBAC) using Express. The API allows users with different roles (Admin, Moderator, User) to access specific routes based on their roles. The routes and permissions("read","update","create") are protected using JSON Web Tokens (JWT), ensuring secure and controlled access to the system.

## Features

- **Role-Based Authorization**: Protects routes based on user roles.
  - **Admin Route**: Accessible only to users with the "admin" role.
  - **Moderator Route**: Accessible to users with "admin" or "moderator" roles.
  - **User Route**: Accessible to all authenticated users.
- **Role-Permissions**: Certain permissions are assigned to users.
  - **Admin Route**: `["create", "read", "update", "delete"]`
  - **Moderator Route**: `["read", "update", "moderate"]`
  - **User Route**: `["read", "update"]`
- **JWT Authentication**: Secures endpoints using JWT tokens to ensure that only authenticated users can access protected routes.
- **Bcrypt**: Hashes password to store safely in a database.
- **Logging**: Uses a Winston based custom logging system to track user access and activities.
- **Database Integration**: Connects to a MongoDB database to store user data (like roles).

## Authentication Routes
### Register Route 
 `POST /api/auth/register`


### Login Route
`POST /api/auth/login`
![image](https://github.com/user-attachments/assets/77da86d9-eb65-40ce-9fdb-9e439c2960fa)

A JWT token will be received by user which can used to execute further requests.

### LOGOUT Route
`POST /api/auth/logout`
![image](https://github.com/user-attachments/assets/d94b3ea7-59af-412d-94c0-0f2eebf64723)
Mandatory thing while requiest logout from server; is to provide jwt token as key value pair   `Authorization :  Bearer jwt_token`

## Role Routes


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

### User Permission Routes
Verifies whether the user has the required permission to access a specific route.

Permission Check Controller Function 
![image](https://github.com/user-attachments/assets/be52f456-02d6-49b7-956c-e4cd37f59cef)


`POST /api/request/permissionRead`  
![image](https://github.com/user-attachments/assets/5792637a-2f28-46ca-ae3f-2989c0c0e325)


`POST /api/request/permissionDelete


![image](https://github.com/user-attachments/assets/0b61af5b-8bb8-4d22-b255-40da2c310e15)


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
   Open cmd and type -
   ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   it will generate a secret key similar to this
   `ebae5b8d2c54ad8547cfbfa44b7ab451dffdc2d0e91f88e6bfee1f440492d23g`
7. Run the server:

   ```bash
   npm start
   ```

8. Test the API using Postman or any API testing tool by sending requests to the routes with appropriate JWT tokens.

## Testing
Jest and Supertest has been used for testing purpose.

To run the tests:

```bash
npm run test
```

This will run the test suite using Jest to ensure the routes and authorization logic are working as expected and would show output as:
![image](https://github.com/user-attachments/assets/79e6c336-3b28-4f5c-ad06-6c3f682fd901)


### Test Coverage

Tests are written using Jest and cover the following aspects:

- Authentication and JWT token verification.
- Role-based access control for each route.
- Logging and error handling.

  ## Logging
  Winston library has been used to maintain a record of activity by all accounts.
  `info` , `warn` and `error` are the types of logs.
  
  ![image](https://github.com/user-attachments/assets/8440dbb3-8200-48d0-909c-81513b214714)


  ## ADDED SECURITY:  Logout from All Devices Functionality
To enhance security, the application includes a logout-from-all-devices feature that invalidates all active tokens for a user, ensuring they are logged out from all devices. This is implemented using a tokenVersion field stored in the database.
- **Storing the tokenVersion**: Each user record in the database includes a tokenVersion field.
- **Token Generation**: When a user logs in, their JWT token includes the current tokenVersion as part of the payload.
- **Logout from All Devices**: When a user chooses to log out from all devices, the server increments the tokenVersion in the database.All previously issued tokens become invalid because they contain the old tokenVersion.



