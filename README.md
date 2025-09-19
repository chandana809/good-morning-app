# Good Morning Form Application

A MERN stack application with a beautiful interactive form to collect user information.

## Project Structure

```
good-morning-app/
├── frontend/           # React frontend
│   └── src/
│       └── components/
│           └── GoodMorningForm/
└── backend/           # Node.js & Express backend
```

## Features

- Interactive form with modern UI/UX
- Animated background effects
- PostgreSQL database integration
- RESTful API endpoints
- Form validation
- Responsive design

## Technologies Used

- Frontend:
  - React.js
  - CSS3 with modern animations
  - Responsive design
  
- Backend:
  - Node.js
  - Express
  - PostgreSQL
  - dotenv for environment variables

## Setup Instructions

### Prerequisites
- Node.js
- PostgreSQL
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your PostgreSQL credentials:
   ```
   PORT=5000
   DB_USER=your_username
   DB_HOST=localhost
   DB_NAME=goodmorning_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

- POST `/api/submit` - Submit form data
- GET `/api/submissions` - Get all submissions
- GET `/health` - Check server health