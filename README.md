# 🗒️ NodeJS Notes

A minimal, elegant, and responsive **note-taking web application** built using **Node.js, Express, EJS, and MongoDB**.  
Includes **Google OAuth authentication**, **smooth UI transitions**, and **clean, responsive layouts** — perfect for personal productivity or as a showcase full-stack project.

---

## 🚀 Features

- 🔐 **Google OAuth 2.0 Login** (via Passport.js)
- 📓 **Create, View, Update, Delete (CRUD)** personal notes
- 🧠 **Clean and Intuitive Layouts** using EJS + express-ejs-layouts
- 🎨 **Homepage with Fixed SVG Visuals** and aligned buttons
- 🌐 **Fully Responsive** — optimized for all devices
- 🎭 **Smooth Fade Transitions** between pages
- 🗄️ **MongoDB Integration** for persistent data storage

---

## 🛠️ Tech Stack

| Layer        | Technology            |
|-------------|---------------------|
| **Backend** | Node.js, Express.js |
| **Frontend**| EJS, CSS            |
| **Database**| MongoDB (Mongoose) |
| **Auth**    | Passport.js + Google OAuth 2.0 |
| **Styling** | Custom CSS, Responsive Layouts |
| **Templating** | express-ejs-layouts |

---

## 📁 Project Structure

```bash
NODEJS-NOTES
├── images/                 # Static images (SVGs, icons)
├── public/                 # Public assets (CSS, img)
│   └── css/
│   └── img/
├── servers/                # Server-side logic
│   ├── config/             # Database & Passport config
│   ├── Controllers/        # App controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models (Notes, User)
│   └── routes/             # Express routes
├── views/                  # EJS templates
│   ├── dashboard/          # Dashboard pages
│   ├── layouts/            # Page layouts
│   └── partials/           # Reusable components (header, footer)
├── app.js                  # Entry point
├── package.json
└── README.md
