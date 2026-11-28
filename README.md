# BookMe – Service Booking Platform

BookMe is a full-stack service booking platform built using the **MERN stack**. It allows users to explore available services, check availability, and book services online. It also provides an admin dashboard to manage users, services, bookings, and other platform activities.

The project aims to simplify the service booking process through an intuitive interface and a centralized management system.

## 🚀 Features

### User Features
- User registration and login
- Browse and explore available services
- Check service availability
- Book services online
- Manage bookings
- Secure authentication using JWT

### Admin Features
- Admin authentication
- Dashboard for monitoring platform activity
- Manage users and services
- View and manage bookings
- Manage withdrawal requests and wallet transactions

### Integrations
- **MongoDB Atlas** – Cloud database
- **Cloudinary** – Image and media management
- **Stripe** – Payment integration
- **Google Calendar API** – Calendar integration
- **Email service** – Email-related functionality

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Payments | Stripe |
| Media Storage | Cloudinary |
| Calendar Integration | Google Calendar API |
| API Communication | Axios |
| Version Control | Git, GitHub |

## 📁 Project Structure

```text
BookMe/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── config/
│   ├── index.js
│   └── package.json
│
└── README.md
```

*The structure above is a representative overview; adjust folder names to match your actual repository.*

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/iamnileshpr/BookMe.git
cd BookMe
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Add other required credentials
# according to your backend configuration
```

Configure your Stripe, Cloudinary, Google Calendar, and email credentials if those integrations are enabled.

### 4. Start the Backend

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure Frontend Environment Variables

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure this matches the actual API URL and port configured in your backend.

### 7. Start the Frontend

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔐 Environment Variables

Keep all API keys, database credentials, and secrets in environment variables.

**Never commit `.env` files or expose private credentials on GitHub.**

Add the following to your `.gitignore`:

```gitignore
node_modules/
.env
.env.local
dist/
```

## 🌐 Deployment

The project is designed to support deployment using:

- **Frontend:** book-me-five-rho.vercel.app
- **Backend:** https://bookme-xgmh.onrender.com
- **Database:** MongoDB Atlas

Deployment configuration and environment variables may vary depending on the hosting provider.

## 📌 Future Improvements

- Improve booking and scheduling workflows
- Enhance payment and transaction handling
- Add notifications and booking reminders
- Improve dashboard analytics
- Strengthen application security and performance

## 👨‍💻 Author

**Nilesh Rajak**

- GitHub: [iamnileshpr](https://github.com/iamnileshpr)

---

⭐ If you find this project interesting, consider giving it a star on GitHub!