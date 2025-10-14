AuraMart: Full-Stack MERN E-commerce Catalog
This is a professional MERN (MongoDB, Express, React, Node.js) stack application demonstrating a complete e-commerce product catalog with user authentication and shopping cart functionality.

🚀 Features
Full CRUD (Read): Displays products fetched from MongoDB.

User Authentication: Secure registration and login using JWT (JSON Web Tokens) and bcryptjs.

Global State: Shopping cart management using React Context API and local storage persistence.

Routing: Dynamic routing for product details (/product/:id).

Modern UI: Attractive dark-mode theme built with modern React styling.

⚙️ Prerequisites
Node.js (v18+)

MongoDB Atlas Account

npm (or yarn/pnpm)

💡 How to Run Locally
1. Setup Environment Variables
Create a file named .env inside the backend folder and add your sensitive credentials:

PORT=5000
MONGO_URI="mongodb+srv://<YourUsername>:<YourPassword>@cluster0.yourcluster.mongodb.net/auramart?retryWrites=true&w=majority"
JWT_SECRET=YourSecretKeyForJWTAuth

NOTE: Replace the placeholder values with your actual MongoDB connection string and a strong secret key.

2. Install Dependencies
Open your terminal in the root AuraMart directory and run the following commands:

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
cd ..

3. Run the Application
You must run the backend and frontend simultaneously in two separate terminal windows.

Terminal 1 (Backend API):

cd backend
npm start

Terminal 2 (Frontend React App):

cd frontend
npm run dev

The frontend application will be accessible at http://localhost:5173/.

4. Database Setup
Ensure you have created a database (e.g., auramart or test) and inserted product documents into the products collection for the app to display content.