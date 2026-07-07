# 📚 BookHub - Library Management System

A full-stack Library Management System built using the MERN Stack. Users can browse books, buy, rent, or borrow them securely, while administrators can manage the entire book inventory.

---

## 🚀 Features

### 👤 User

- User Registration & Login
- JWT Authentication using HttpOnly Cookies
- Browse available books
- View detailed information about each book
- Buy Books
- Rent Books
- Borrow Books
- Unique Return Code generated for every transaction
- Return books using Return Code
- My Books page
- Copy Return Code to Clipboard
- Transaction History
- Protected Routes

### 👨‍💼 Admin

- Admin Login
- Add Books
- Edit Books
- Delete Books
- View all books
- Manage Library Inventory

---

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- CSS3

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cookie Parser
- CORS

---

## 📂 Project Structure

```
BookHub/
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 📖 Pages

- Login
- Signup
- Dashboard
- Book Details
- My Books
- History
- Admin Dashboard
- About
- Contact

---

## 🔐 Authentication

- JWT Authentication
- HttpOnly Cookies
- Protected Routes
- Role-Based Access (Admin/User)

---

## 📚 Book Features

- View Books
- Buy Books
- Rent Books
- Borrow Books
- Book Availability Status
- Return Books using Secure Return Code

---

## 📜 Transaction Features

- Purchase History
- Borrow History
- Rent History
- Return Code Generation
- Copy Return Code
- Return Verification

---

## 💾 Database Collections

### User

- Name
- Email
- Password
- Role

### Book

- Title
- Author
- Category
- Description
- Image
- Buy Price
- Rent Price
- Status
- Owner
- Action

### Transaction

- User
- Book
- Type
- Amount
- Borrow Date
- Due Date
- Return Code
- Returned

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/BookHub.git
```

### Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run Server

```bash
node server
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/
    login.png
    dashboard.png
    mybooks.png
    history.png
    admin.png
```

---

## 🌟 Future Improvements

- Book Search & Filters
- Admin Analytics Dashboard

---

## 👨‍💻 Author

**Smeet Patel**

GitHub: https://github.com/smeet7648

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
