# TicketBari - Online Ticket Booking Platform

**Live Site**: [https://ticketbari-2025.web.app/](https://ticketbari-2025.web.app/)

**TicketBari** is a complete online travel ticket booking platform built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Users can discover, book, and manage tickets for Bus, Train, Launch, and Plane journeys across Bangladesh. The platform features three distinct user roles: **User**, **Vendor**, and **Admin**.

---

## 🚀 Key Features

- Role-based dashboards (User, Vendor, Admin)
- Secure Firebase authentication (Email/Password + Google Sign-In)
- Responsive, modern UI with **Dark/Light Mode Toggle**
- JWT-protected backend APIs
- Real-time booking with departure countdown
- Vendor ticket submission with admin approval workflow
- Admin tools: ticket approval, user management, advertise up to 6 tickets
- Search, filter, sort & pagination on All Tickets page
- Stripe payment integration
- Advertised tickets carousel on homepage
- Fully responsive (mobile, tablet, desktop)

---

## 🛠️ Technology Stack

### Frontend

- React.js (Vite)
- Tailwind CSS + DaisyUI
- TanStack React Query
- SweetAlert2
- Framer Motion
- Firebase Authentication
- Axios

### Backend

- Node.js + Express.js
- MongoDB 
- JWT authentication
- Firebase Admin SDK
- CORS & error handling

---

## 👥 User Roles

### 👤 User

- Browse & search tickets
- Book tickets with quantity selection
- View booking & payment history
- Pay via Stripe

### 🏪 Vendor

- Add, update, delete tickets (pending admin approval)
- Manage booking requests (Accept/Reject)
- Revenue overview

### 👨‍💼 Admin

- Approve/Reject vendor tickets
- Manage users (promote to Admin/Vendor, mark fraud)
- Advertise up to 6 tickets on homepage

---

## 📱 Important Pages

- `/` → Home (Hero banner, advertised tickets, latest tickets)
- `/all-tickets` → All approved tickets (search, filter, sort, pagination)
- `/ticket/:id` → Ticket details + Book Now
- `/login` & `/register` → Authentication
- `/dashboard` → Role-based dashboard

### Dashboard Routes

- `/dashboard/profile` → Profile
- User: `/dashboard/my-bookings`, `/dashboard/payment-history`
- Vendor: `/dashboard/add-ticket`, `/dashboard/my-added-tickets`, `/dashboard/requested-bookings`
- Admin: `/dashboard/manage-tickets`, `/dashboard/manage-users`, `/dashboard/advertise-tickets`

---

## 🔐 Credentials

### Admin

- Email: `nafi.cse0123@gmail.com`
- Password: `nafi570N@`

### Vendor

- Email: `nafi.mahmud0123@gmail.com`
- Password: `nafi570N@`

> You can register new users or use Google Sign-In.

---

## 📂 Repository Links

- **Client (Frontend)**: [https://github.com/nafi0123/Online_Ticket_Booking_Platform_Client.git](https://github.com/nafi0123/Online_Ticket_Booking_Platform_Client.git)
- **Server (Backend)**: [https://github.com/nafi0123/Online_Ticket_Booking_Platform_server.git](https://github.com/nafi0123/Online_Ticket_Booking_Platform_server.git)

---

## 📦 NPM Packages Used

### Frontend

- `react-router-dom`
- `react-hook-form`
- `@tanstack/react-query`
- `daisyui`
- `tailwindcss`
- `sweetalert2`
- `firebase`
- `axios`

### Backend

- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `firebase-admin`

---

## 🌙 Dark/Light Mode

Available via toggle in the navbar.

## 📱 Fully Responsive

Optimized for all devices.

## 🔒 Security

- Firebase & MongoDB secrets in `.env`
- Private routes protected
- JWT verification on backend

---

**Made with ❤️ by Nafi Mahmud Bukhari**  
© 2025 TicketBari. All rights reserved.
