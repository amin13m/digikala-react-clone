---

# 🛒 DigiKala React Clone

A modern DigiKala-inspired e-commerce web application built with React, focused on clean architecture, performance optimization, and scalable state management using JSON Server as a mock backend.

## 🖼️ Screenshots

---

### 🏠 Home Page
| Desktop | Mobile |
|---------|--------|
| ![Home](assets/screenshots/home.jpg) | ![Home Mobile](assets/screenshots/home-m.jpg) |
| ![Home Dark](assets/screenshots/home-dark.jpg) | ![Home Mobile Dark](assets/screenshots/home-m-dark.jpg) |
| ![Home Search](assets/screenshots/home-search.jpg) | ![Home Sliders](assets/screenshots/home-sliders.jpg) |

---

### 🛍️ Product Page
| Desktop | Mobile |
|---------|--------|
| ![Product](assets/screenshots/product.jpg) | ![Product Mobile](assets/screenshots/product-m.jpg) |

#### 💬 Comments
![Product Comments](assets/screenshots/product-m-comments.jpg)

---

### 🛒 Cart
| Desktop | Mobile |
|---------|--------|
| ![Cart](assets/screenshots/cart.jpg) | ![Cart Mobile](assets/screenshots/cart-m.jpg) |
| ![Cart Mobile Dark](assets/screenshots/cart-m-dark.jpg) | |

---

### 🔐 Authentication
| Login | Register |
|-------|---------|
| ![Login](assets/screenshots/login.jpg) | ![Register](assets/screenshots/register.jpg) |

---

### 📦 Orders
| Desktop | Mobile |
|---------|--------|
| ![Orders](assets/screenshots/orders.jpg) | ![Orders Mobile](assets/screenshots/orders-m.jpg) |

---

### 🔑 Change Profile
![Change Password](assets/screenshots/changPassword.jpg) ![Change Password](assets/screenshots/changeName.jpg)


## 📦 Tech Stack

### Frontend
- React 18
- React Router v6
- Context API + useReducer
- Tailwind CSS (Dark / Light Mode)
- Axios
- React Icons

### Backend (Mock)
- JSON Server

## ✨ Features

### 🔐 Authentication (Mock – No JWT)
- Login, Register, Logout
- Persistent authentication with localStorage
- Protected routes
- Reducer-based Auth Context
- Profile management (update name, change password, wallet)

### 🛍 Products
- Infinite scroll product listing
- Product details page
- Category-based filtering
- Discount system
- Dynamic price calculation
- Rating system based on latest user comments
- Product comments (only for purchased products)

### 🧺 Cart
- Cart Context with reducer
- Add, remove, update quantity
- Cart persistence
- Cart-product join logic
- Debounced search integration
- Optimized with useMemo, useCallback, React.memo

### 💳 Payment & Orders
- Wallet-based payment simulation
- Order creation and storage
- Wallet balance deduction
- Purchase history
- Top-selling products calculation

### 🏠 Home Page
- Banner section
- Discounted products horizontal slider
- Top-selling products slider
- Infinite loading product grid
- Fully responsive layout

### 👤 Profile Page
- Desktop sidebar and mobile adaptive layout
- Account info management
- Wallet charge
- Password change with validation
- Order history
- Dark mode support

### 🎨 UI / UX
- Responsive design (mobile, tablet, desktop)
- Dark / Light mode
- Loading and skeleton states
- Horizontal scroll sections
- Smooth transitions

## ⚡️ Performance Optimization
- React.memo
- useMemo
- useCallback
- useRef
- Suspense & lazy loading
- Debounced inputs
- Optimized context updates

## 🗂 Project Structure

src/ ├── api/ ├── components/ │   ├── home/ │   ├── product/ │   ├── layout/ │   ├── profile/ ├── context/ ├── pages/ ├── hooks/ ├── utils/ └── App.jsx

## 🔧 Installation & Run

`bash
npm install
npx json-server --watch db.json --port 3000
npm run dev

📌 Future Improvements

Server-side pagination

Admin dashboard

Stock management

Real payment gateway

SEO optimization

Testing (unit & integration)


🧠 Key Concepts

Scalable Context architecture

Reducer-based global state

Clean separation of concerns

Mock backend integration

Advanced React optimization patterns

Real-world e-commerce flows


👨‍💻 Author

Amin
GitHub: https://github.com/amin13m

⭐️ Support

If you like this project, give it a star ⭐️

---
