# Admin Panel - Booking System Frontend

## Overview
This project is a full-stack application developed as part of a Full Stack Developer Assessment Test. It's a comprehensive booking system with user management capabilities, featuring an admin panel for CRUD operations on users and booking items.

## Live Demo
- **Frontend:** [https://mindsynccon-frontend.vercel.app](https://mindsynccon-frontend.vercel.app)
- **Backend API:** [https://mindsynccon-backend.onrender.com](https://mindsynccon-backend.onrender.com)

## Features

### User Authentication
- User registration with username, email, and password (passwords are hashed)
- Login functionality with JWT token generation
- Logout functionality that clears JWT from localStorage
- Display of user information and avatar on dashboard

### Browse Items for Booking
- Display of available booking items (rooms, vehicles, services) with:
  - Title
  - Description
  - Price
  - Availability status
  - Image

### Booking Functionality
- Date/time selection for bookings
- Total price calculation based on duration
- Booking confirmation with summary page

### User Dashboard
- Display of current and past bookings
- Booking cancellation option
- Booking modification (date/time, items)

### Admin Panel
- Manage Booking Items:
  - Create new items
  - View list of items in a table
  - Update existing item details
  - Delete items
- Manage Users:
  - View all system users
  - Create new users
  - Update user details
  - Delete users

## Technologies Used
- **Frontend**:
  - React.js
  - Redux for state management
  - React Router for navigation
  - Tailwind for styling
  - Axios for API calls
- **Backend**:
  - Express.js
  - MongoDB for database
  - JWT for authentication
  - bcrypt for password hashing

## Database Structure
- **Collections**:
  - Users
  - Items
  - Bookings

## Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm (v6.x or higher) or yarn (v1.22.x or higher)
- MongoDB (or access to MongoDB Atlas)

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Hisam-94/mindsynccon-frontend.git
cd mindsynccon-frontend
```

### 2. Install dependencies
```bash
npm install
# or with yarn
yarn install
```

### 3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000
```

### 4. Start the development server
```bash
npm start
# or with yarn
yarn start
```
The application will be available at `http://localhost:3000`.

## Backend Setup
The backend repository can be found at [https://github.com/Hisam-94/mindsynccon-backend](https://github.com/Hisam-94/mindsynccon-backend).

Follow the README instructions in the backend repository to set up the API server locally. The backend should include:
- Express.js server
- MongoDB database connection
- User authentication with JWT
- Role-based access control
- API endpoints for users, items, and bookings

## Database Setup
1. Set up MongoDB (locally or using MongoDB Atlas)
2. Collections needed:
   - **Users**: Contains user information (username, email, hashed password, role, etc.)
   - **Items**: Contains booking item details (title, description, price, availability, etc.)
   - **Bookings**: Contains booking records (userId, itemId, start/end times, total price, etc.)

## Deployment
The frontend is deployed on Vercel and the backend on Render.

### Frontend Deployment Steps
1. Create a Vercel account if you don't have one
2. Connect your GitHub repository to Vercel
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Set up environment variables in the Vercel dashboard
5. Deploy!

### Backend Deployment Steps
1. Create a Render account
2. Connect your GitHub backend repository
3. Configure as a Web Service
4. Set up environment variables (MongoDB connection string, JWT secret, etc.)
5. Deploy and note the URL for connecting the frontend

## Security Features
- Password hashing using bcrypt
- JWT for secure authentication
- Protected routes using middleware
- Role-based access control for admin functionality

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
- Project Maintainer: [Hisam-94](https://github.com/Hisam-94)
- Project Link: [https://github.com/Hisam-94/mindsynccon-frontend](https://github.com/Hisam-94/mindsynccon-frontend)