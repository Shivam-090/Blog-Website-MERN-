# Blog Platform  

This is a full-stack blog application built with **MERN stack** (MongoDB, Express, React, Node.js). The platform allows users to create, read, and interact with blogs, while providing an **admin panel** to manage blogs, comments, and users.
This project uses MongoDB Atlas for database storage. Make sure to create a cluster and get your connection string for the .env file

The project is divided into two parts:  
- **Frontend** (React + Tailwind CSS)  
- **Backend** (Node.js + Express + MongoDB)  

---

## 🚀 Features  

### User Side  
- View published blogs with images and descriptions.  
- Add comments on blogs (requires admin approval).  
- Responsive UI with clean design.  

### Admin Side  
- Dashboard with recent blogs and comments.  
- Add, update, publish/unpublish, and delete blogs.  
- Approve or delete comments.  
- Manage data directly through an admin panel.  

---

## ⚙️ Tech Stack  

- **Frontend**: React, Tailwind CSS, Axios, React Router DOM, React Hot Toast  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer, ImageKit, Gemini AI API  
- **Other Tools**:  
  - ImageKit (for blog image hosting)  
  - Gemini API (for AI-powered features, e.g., generating blog summaries/titles)  

---

## 📂 Project Setup  

### Backend Setup  
1. Navigate to the backend folder:  
   ```bash
   cd backend
   npm install
   ```  

2. Update the `.env` file in `backend/` with the following:  
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string

   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

   GEMINI_API_KEY=your_gemini_api_key
   ```  

3. Start the backend:  
   ```bash
   npm run server
   ```  

---

### Frontend Setup  
1. Navigate to the frontend folder:  
   ```bash
   cd frontend
   npm install
   ```  

2.  Update `.env` file as needed in `frontend/` like this or leave it as it:  
   ```env
   VITE_BASE_URL=http://localhost:3000
   ```  

3. Start the frontend:  
   ```bash
   npm run dev
   ```  

---

## 🔑 Environment Variables  

### Backend  
- **MONGO_URI** → MongoDB connection string.  
- **IMAGEKIT_PUBLIC_KEY / PRIVATE_KEY / URL_ENDPOINT** → Required for uploading and serving blog images.  
- **GEMINI_API_KEY** → API key for Google Gemini (AI features).  

### Frontend  
- **VITE_BASE_URL** → Backend server URL (default: `http://localhost:3000`).  

---

## 📜 Scripts  

### Backend  
- `npm run server` → Run backend in development mode with nodemon.  

### Frontend  
- `npm run dev` → Run frontend in development mode.  
- `npm run build` → Build frontend for production.  

---

## ✅ Requirements  

- Node.js >= 18  
- MongoDB Atlas or local MongoDB instance  
- ImageKit account for image hosting  
- Gemini API key (from Google AI Studio)  

---

## 📌 Notes  

- Make sure to approve comments from the admin panel before they appear on the blog.  
- Images are uploaded to ImageKit and referenced in MongoDB.  
- Admin routes are secured in the backend (can be extended with authentication).
