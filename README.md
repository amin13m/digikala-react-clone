---

# 🛒 DigiKala React Clone

A modern DigiKala-inspired e-commerce web application built with React, focused on clean architecture, performance optimization, and scalable state management using JSON Server as a mock backend.

## 🚀 images

<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/c9f46a77-15eb-4827-b15a-7ec6c18c2ddf" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/13422b21-f366-472c-9690-9b8eeeac50e2" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/2e7a6846-c004-4a1e-a940-d40ca742abb6" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/99751eec-5957-46fe-82bc-bd2bdb0c0f40" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/626b8826-7664-4a76-bd7a-d070feffdbc3" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/03653d68-8d99-400e-b0d0-36b4660a2315" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/30feffb0-9123-4d56-9821-d775e98cc05d" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/01dc51d3-cb3a-45af-8b9f-01e07b033311" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/928708b2-f4ed-4fd3-91c3-a37d256f53da" />
<img width="1152" height="864" alt="image" src="https://github.com/user-attachments/assets/bf5582dd-89bd-4d07-b748-b8e83c1a1c4a" />

<img width="470" height="864" alt="image" src="https://github.com/user-attachments/assets/eb36764d-c1fb-44cf-be5e-b43e48d2454a" />
<img width="473" height="864" alt="image" src="https://github.com/user-attachments/assets/24a63091-ea41-43ec-98f6-a187103d652f" />
<img width="474" height="861" alt="image" src="https://github.com/user-attachments/assets/3ef2e458-a1d3-4f1f-af7f-7dfe77e7e1b5" />
<img width="479" height="864" alt="image" src="https://github.com/user-attachments/assets/44bfaed0-4d5e-4838-bc09-017d84d6312f" />
<img width="480" height="864" alt="image" src="https://github.com/user-attachments/assets/fd9aa4bd-3d5c-4638-854c-5d2303155592" />
<img width="470" height="864" alt="image" src="https://github.com/user-attachments/assets/1b40c9af-71c5-4b8b-8009-0ab16086ba2e" />
<img width="475" height="864" alt="image" src="https://github.com/user-attachments/assets/cb6840b7-08bd-4112-a1f8-89e0d33723b1" />


(– add img)

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
