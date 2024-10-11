Assignment Submission Portal

This project is a backend system for an assignment submission portal where users (students) can upload assignments and admins can review them. Admins can either accept or reject the assignments based on the provided task.

Features :-

User functionalities:
Register and log in.
Upload assignments and specify an admin to review the task.
View a list of all available admins.

Admin functionalities:

Register and log in.
View all assignments assigned to them.
Accept or reject assignments.
Authentication:

JWT-based authentication for secure user/admin login.
Technologies Used
Backend Framework: Node.js with Express.js
Database: MongoDB
Authentication: JWT (JSON Web Token)
API Testing Tool: Postman (for testing API endpoints)
Project Setup and Installation
Prerequisites
Before you begin, ensure you have the following installed:

Node.js (v14 or higher)
MongoDB
A code editor like Visual Studio Code
Step-by-Step Setup Guide
Clone the Repository:

Clone this project to your local machine using the following command:

bash
Copy code
git clone https://github.com/anant23888/backend-assignment_portal.git

Navigate to the Project Directory:

bash
Copy code
Install Dependencies:

Use the following command to install the required npm packages:

bash
Copy code
npm install
Environment Variables:

Create a .env file in the root directory. Add the following environment variables:

makefile
Copy code
PORT=5000
MONGO_URI=your_mongoDB_connection_string
JWT_SECRET=your_secret_key
PORT: The port on which the server will run.
MONGO_URI: The MongoDB connection string.
JWT_SECRET: A secret key for signing JWT tokens (you can generate a random one).
Start the Server:

Run the application using the following command:

bash
Copy code
npm start
The server should now be running on http://localhost:5000.

Testing the API:

You can use tools like Postman or cURL to test the various API endpoints.

API Endpoints
User Endpoints
Register a New User

Endpoint: POST /api/users/register
Description: Register a new user.
Request Body:
json
Copy code
{
  "username": "student1",
  "password": "password123"
}
Login as a User

Endpoint: POST /api/users/login
Description: Log in as a user.
Request Body:
json
Copy code
{
  "username": "student1",
  "password": "password123"
}
Response: Returns a JWT token.
Upload Assignment

Endpoint: POST /api/users/upload
Description: Upload an assignment. The user must specify the admin's username.
Request Headers: Authorization: Bearer <token>
Request Body:
json
Copy code
{
  "task": "Complete the Node.js project",
  "admin": "admin1"
}
View All Admins

Endpoint: GET /api/users/admins
Description: Fetch a list of all available admins.
Admin Endpoints
Register a New Admin

Endpoint: POST /api/admins/register
Description: Register a new admin.
Request Body:
json
Copy code
{
  "username": "admin1",
  "password": "adminpassword"
}
Login as an Admin

Endpoint: POST /api/admins/login
Description: Log in as an admin.
Request Body:
json
Copy code
{
  "username": "admin1",
  "password": "adminpassword"
}
Response: Returns a JWT token.
View Assignments

Endpoint: GET /api/admins/assignments
Description: View all assignments tagged to the logged-in admin.
Request Headers: Authorization: Bearer <token>
(token can be accessed while login)
Accept Assignment

Endpoint: POST /api/admins/assignments/:id/accept
Description: Accept an assignment using its unique ID.
Request Headers: Authorization: Bearer <token>
Reject Assignment

Endpoint: POST /api/admins/assignments/:id/reject
Description: Reject an assignment using its unique ID.
Request Headers: Authorization: Bearer <token>
Project Structure
plaintext
Copy code
.
├── config/                # Configuration files
│   └── db.js              # MongoDB connection configuration
├── controllers/           # Route handlers (controllers)
│   ├── adminController.js
│   └── userController.js
├── middleware/            # Custom middleware functions
│   ├── authMiddleware.js  # JWT authentication middleware
├── models/                # Mongoose models
│   ├── Assignment.js
│   └── User.js
├── routes/                # Express routes
│   ├── adminRoutes.js
│   └── userRoutes.js
├── .env                   # Environment variables
├── server.js              # Main server entry point
├── package.json           # NPM dependencies and scripts
└── README.md              # Documentation

Security Considerations
JWT Token: Ensure that your JWT secret is long and random enough for secure signing. Never expose the JWT_SECRET to the public.
Sensitive Data: If you're storing sensitive data like API keys or credentials in the .env file, be cautious when pushing the file to public repositories.
OAuth 2.0 (Optional): You can integrate OAuth 2.0 with services like Google for enhanced security and third-party authentication.
Deployment
MongoDB Atlas: You can use MongoDB Atlas for cloud-hosted MongoDB.
Heroku or Vercel: These are great platforms for deploying your Node.js app. Be sure to configure the environment variables properly during deployment.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contributing
Contributions are welcome! Please open an issue or create a pull request if you have any suggestions or improvements.

Email: anantchaturvedi889@gmail.com
GitHub: Anant Chaturvedi(https://github.com/anant23888/backend-assignment_portal)