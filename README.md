# DevelopersHub Corporation — Full-Stack Agency Platform

---

## 📌 Description

DevelopersHub Agency Platform is a full-stack web application designed to manage a digital agency's operations. It provides dynamic content management, service handling, and seamless client interaction through features like bookings, leads, blogs, and portfolio management.

The platform includes both a public-facing website for users and a secure admin dashboard for managing all core resources.

---

## 🚀 Core Features

- Dynamic service listings (stored in database)
- Admin dashboard to manage:
  - Services
  - Portfolio
  - Blog
  - Leads & Bookings
- Client inquiry system (store leads in database)
- Booking system with time slot selection
- Blog, Portfolio, and Services with full CRUD functionality
- Authentication & authorization (JWT-based)
- Image upload using Cloudinary

---

## 🛠️ Tech Stack

### Frontend
- [Next.js](https://nextjs.org/)
- [lucide-react](https://lucide.dev/)
- [axios](https://axios-http.com/)

### Backend
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [multer](https://github.com/expressjs/multer)
- [multer-storage-cloudinary](https://github.com/affanshahid/multer-storage-cloudinary)
- [Cloudinary](https://cloudinary.com/)
- [dotenv](https://github.com/motdotla/dotenv)
- [cors](https://github.com/expressjs/cors)
- [cookie-parser](https://github.com/expressjs/cookie-parser)

---

## 📁 Project Structure

Monorepo structure:

```
DevelopersHub-Corporation-Agency-platform/
│
├── backend/                        # Express.js / Node.js
│   ├── controllers/                # Request handlers (blog, services, leads, etc.)
│   ├── models/                     # Mongoose schemas (Service, Blog, Lead, Booking, User)
│   ├── routes/                     # API endpoints + image upload (Cloudinary)
│   ├── middleware/                 # Auth (JWT), validation
│   ├── config/                     # DB connection, Cloudinary config
│   ├── server.js                   # Express app entry point
│   ├── .env                        # Backend environment variables
│   ├── package.json
│   └── package-lock.json
│
├── frontend/                       # Next.js App
│   ├── app/                        # App Router
│   │   ├── (user)/                 # Public pages
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   ├── blog/
│   │   │   ├── portfolio/
│   │   │   ├── booking/
│   │   │   ├── contact/
│   │   │   ├── page.jsx
│   │   │   └── layout.js
│   │   ├── admin/
│   │   │   ├── (dashboard)/        # Admin dashboard
│   │   │   │   ├── dashboard/
│   │   │   │   ├── services/
│   │   │   │   ├── portfolio/
│   │   │   │   ├── blog/
│   │   │   │   ├── leads/
│   │   │   │   ├── booking/
│   │   │   │   └── layout.js
│   │   │   └── login/
│   │   ├── layout.js               # Root layout
│   │   └── globals.css
│   ├── components/
│   │   ├── user/
│   │   ├── admin/
│   │   └── shared/
│   ├── lib/                        # API config (axios)
│   ├── public/                     # Static assets
│   ├── .env.local                  # Frontend environment variables
│   ├── next.config.mjs
│   ├── eslint.config.mjs
│   ├── package.json
│   └── package-lock.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account

---

### 1. Clone the Repository

```bash
git clone https://github.com/Huraira-Arshad-Abbasi/DevelopersHub-Corporation-Agency-platform.git
cd DevelopersHub-Corporation-Agency-platform
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000` by default.

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:3000` by default.

---

## 🔐 Authentication

Authentication is handled via **JWT (JSON Web Tokens)**. Tokens are stored in HTTP-only cookies for security. The admin dashboard is protected and only accessible to authenticated users.

---

## 📡 API Overview

## 📡 API Overview

| Method | Endpoint                  | Description                          |
|--------|---------------------------|--------------------------------------|
| POST   | `/api/auth/login`         | Admin login                          |
| GET    | `/api/auth/me`            | Get current admin                    |
| GET    | `/api/services`           | Get all services                     |
| GET    | `/api/services/:id`       | Get single service                   |
| POST   | `/api/services`           | Create a service (admin)             |
| PUT    | `/api/services/:id`       | Update service (admin)               |
| DELETE | `/api/services/:id`       | Delete service (admin)               |
| GET    | `/api/blog`               | Get all blog posts                   |
| GET    | `/api/blog/:id`           | Get single blog                      |
| POST   | `/api/blog`               | Create blog (admin)                  |
| PUT    | `/api/blog/:id`           | Update blog (admin)                  |
| DELETE | `/api/blog/:id`           | Delete blog (admin)                  |
| GET    | `/api/portfolio`          | Get all portfolio items              |
| POST   | `/api/portfolio`          | Create portfolio (admin)             |
| PUT    | `/api/portfolio/:id`      | Update portfolio (admin)             |
| DELETE | `/api/portfolio/:id`      | Delete portfolio (admin)             |
| POST   | `/api/contact`            | Submit a client inquiry              |
| GET    | `/api/contact`            | Get all leads (admin)                |
| POST   | `/api/booking`            | Create a booking                     |
| GET    | `/api/booking`            | Get all bookings (admin)             |
| PUT    | `/api/booking/:id`        | Update booking status (admin)        |

> Full API documentation can be added here or linked to a separate file.

---

## 🌐 Environment Variables Summary

| Variable                  | Location         | Description                        |
|---------------------------|------------------|------------------------------------|
| `PORT`                    | `backend/.env`   | Port for the Express server        |
| `MONGO_URI`               | `backend/.env`   | MongoDB connection string          |
| `JWT_SECRET`              | `backend/.env`   | Secret key for JWT signing         |
| `JWT_EXPIRES_IN`          | `backend/.env`   | JWT token expiry duration          |
| `FRONTEND_URL`            | `backend/.env`   | Allowed origin for CORS            |
| `CLOUDINARY_CLOUD_NAME`   | `backend/.env`   | Cloudinary cloud name              |
| `CLOUDINARY_API_KEY`      | `backend/.env`   | Cloudinary API key                 |
| `CLOUDINARY_API_SECRET`   | `backend/.env`   | Cloudinary API secret              |
| `NEXT_PUBLIC_API_URL`     | `frontend/.env.local` | Base URL for frontend API calls |

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 👤 Author

**Huraira Arshad Abbasi**
- GitHub: [@Huraira-Arshad-Abbasi](https://github.com/Huraira-Arshad-Abbasi)