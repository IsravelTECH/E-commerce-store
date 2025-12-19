<h1 align="center">🛒 BuyBuddy</h1>

<p align="center">
  A full-stack ecommerce platform built with Node.js, Express, MongoDB, and React.
</p>

<p align="center">
  <img src="/frontend/public/Screenshot.png" alt="App Screenshot" width="80%" />
</p>

---

## 🚀 Features

- 🗄️ MongoDB & Redis Integration
- 💳 Stripe Payment Integration
- 🔐 Authentication (JWT - Access & Refresh Tokens)
- 👤 User Signup/Login with Role-based Access
- 🛒 Cart & Wishlist
- 📦 Product & Category Management
- 🏷️ Coupon Code System
- 🛍️ Checkout Process
- 👑 Admin Dashboard
- 📊 Sales Analytics
- 🎨 Tailwind CSS for UI
- 🧾 Order Management
- 🔒 Security & Data Protection

---

## 📁 Project Structure

e-commerce-store/
│
├── frontend/ # React Frontend (User Interface)
├── backend/ # Express Backend (API + Logic)
├── node_modules/ # Dependencies
├── .env # Environment variables
├── package.json # Project Metadata
└── README.md


---

## ⚙️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Redis
- **Authentication:** JWT (Access & Refresh Tokens)
- **Payments:** Stripe
- **Storage:** Cloudinary

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/e-commerce-store.git
cd e-commerce-store

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

### Setup .env file

PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_key


### Run this app locally

# Start backend
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start

## 📺 Demo

🌐 **Live Demo:** [https://e-commerce-store-anqa.onrender.com/](https://e-commerce-store-anqa.onrender.com/)

> Explore BuyBuddy — a full-featured ecommerce experience with cart, checkout, admin dashboard, and more.


Explore the full-stack ecommerce experience with authentication, cart, checkout, admin dashboard, and more.

📄 License
This project is licensed under the MIT License.

---
