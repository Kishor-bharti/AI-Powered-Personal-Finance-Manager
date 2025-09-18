# 💸 AI-powered Personal Finance Manager

An intelligent **personal finance manager** web app that helps you **track expenses, set goals, and analyze your financial habits** — all in one place!
Built with **React (Vite) + Node.js + Express + PostgreSQL**, secured using **JWT authentication**, and powered by modern frontend/backend patterns.

---

## 🚀 Features

✅ **User Authentication** – Secure login/register using **JWT tokens + bcrypt**  
✅ **Expense Tracking** – Add, view, and categorize transactions  
✅ **Goal Management** – Set savings or expense goals  
✅ **Financial Insights** – Data-driven analysis with real-time stats (future-ready for AI integration)  
✅ **Protected Routes** – Role-based access with **middleware authentication**  
✅ **Responsive UI** – Built with React + Vite, smooth and fast frontend experience  
✅ **RESTful APIs** – Clean separation between backend and frontend

---

## 🛠️ Tech Stack

**Frontend**  
- ⚡ React (Vite)  
- 🎨 TailwindCSS (optional for styling)  
- 🔄 Axios (API requests)  
- 🛣️ React Router (routing & navigation)  

**Backend**  
- 🟢 Node.js + Express.js  
- 🗄️ PostgreSQL (Relational DB)  
- 🔑 JWT (JSON Web Token for auth)  
- 🧂 bcrypt (password hashing)  
- 🧩 Middleware (custom auth checks)  

**Tools & Environment**  
- 🌍 CORS enabled  
- 📦 npm for dependency management  
- 🧑‍💻 Postman for API testing

---

## 📂 Project Structure

```
finance-manager/
├── backend/
│   ├── routes/        # Auth, Transactions, Goals, Analysis
│   ├── middleware/    # JWT auth middleware
│   ├── config/        # DB connection
│   ├── server.js      # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── pages/     # Login, Register, Dashboard, Transactions
│   │   ├── components/# Header, Footer, Layout
│   │   ├── api.jsx    # Axios setup with JWT interceptor
│   │   └── App.jsx    # Routing
│
└── README.md
```

---

## ⚡ Quick Start

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/finance-manager.git
cd finance-manager
```

### 2️⃣ Setup backend
```bash
cd backend
npm install
```
- Create `.env` file:
```env
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/finance_db
JWT_SECRET=your_super_secret_key
```
- Run DB migrations/seed:
```bash
psql -U postgres -d finance_db -f seed.sql
```
- Start server:
```bash
npm run dev
```

### 3️⃣ Setup frontend
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ Open app  
Visit 👉 `http://localhost:5173`

---

## 🔐 Authentication Flow

- User registers with `name, email, password`  
- Passwords are hashed with **bcrypt** before saving  
- On login, server returns a **JWT token**  
- Token is stored in `localStorage`  
- Axios interceptor attaches token in `Authorization: Bearer <token>` for secure API calls  

---

## 🎯 Roadmap

- [ ] Add AI-powered **spending pattern analysis**  
- [ ] Implement charts/visualizations (Recharts/D3.js)  
- [ ] Export reports (CSV/PDF)  
- [ ] Multi-user budgets and shared goals  
- [ ] Deploy to Render/Netlify

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss.

---

## 📜 License

MIT License © 2025 Kishor Bharti

---

🔥 Keywords: *JWT Authentication, Express Middleware, PostgreSQL Database, React Vite Frontend, Axios Interceptor, AI-powered Financial Insights, Fullstack Finance Tracker*
