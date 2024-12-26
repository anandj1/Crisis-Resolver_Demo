
Community Crisis Platform 🌍
A web application designed to help communities manage and respond to crises efficiently. This platform allows users to report issues, track their status, and collaborate for
resolution, fostering stronger and more resilient communities.

🌟 Features
Report Issues: Users can submit issues with details like title, description, location, and priority.
Location Integration: Pinpoint issues using Google Maps integration.
Status Tracking: Monitor the progress of reported issues (e.g., Pending, In Progress, Resolved).
User Authentication: Basic login and signup functionality.
Demo Functionalities Only: Currently supports reporting and listing issues for demonstration purposes.



🚀 Tech Stack
Frontend: React, CSS (Tailwind for styling)
Backend: Node.js, Express.js
Database: MongoDB (hosted on MongoDB Compass)
Others:
Concurrently for running frontend and backend together.
dotenv for environment variable management.


🎯 How to Run Locally
Prerequisites
Node.js and npm installed (Download).
MongoDB cluster setup (or local MongoDB installation).
Clone the Repository
bash
Copy code
git clone https://github.com/<your-username>/community-crisis-platform.git
cd community-crisis-platform
Setup Backend
Navigate to the backend directory:
bash
Copy code
cd backend
Install dependencies:
bash
Copy code
npm install
Create a .env file in the backend folder:
env
Copy code
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
Start the backend server:
bash
Copy code
npm run dev
Setup Frontend
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install dependencies:
bash
Copy code
npm install
Start the frontend development server:
bash
Copy code
npm start

🌐 Deployment
Frontend:
Use Netlify or Vercel for hosting.
