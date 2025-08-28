# Gift List 🎁
#### Video Demo: https://www.youtube.com/watch?v=ETIpRx-wc6A  
#### Author: Cicero Narciso Castanheira  
#### GitHub: [CastCee01](https://github.com/CastCee01)  
#### edX Username: [cicerocastanheira](https://profile.edx.org/u/cicerocastanheira)  
#### Location & Date: Maputo, Mozambique — 27 August 2025  

---

## Description
**Gift List** is my final project for CS50x. It’s a simple wishlist app where users can add items they’d like to receive as gifts, with optional links and notes. The app helps friends and family choose gifts with more confidence, reducing guesswork and making occasions like birthdays and Secret Santa easier.  

This project represents the culmination of my CS50 journey. It allowed me to apply concepts of **frontend development, state management, form validation, persistent storage, and responsive design**. While simple in scope, the app demonstrates the key principles of modern web development — from modular React components to Tailwind-based UI polish.  

The app currently uses **LocalStorage** for persistence. That means every user’s data is stored in their own browser, surviving refreshes and restarts. In the future, this could be extended with a backend (Firebase or Supabase) to enable account creation, sharing lists with others, and advanced features like purchase tracking.  

---

## Features
- ➕ Add gifts with:
  - Title (required)  
  - Link (optional, URL-validated)  
  - Note (optional, e.g., size or color preferences)  
- 🔍 Search gifts by title or note  
- 🗑 Delete individual gifts (with confirmation dialog)  
- ⚠️ Clear all gifts (with confirmation dialog)  
- 💾 Persistent storage with LocalStorage  
- 📱 Responsive, mobile-friendly UI with TailwindCSS  

---

## Tech Stack
- **Frontend:** React (Vite)  
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)  
- **Storage:** LocalStorage (browser-based persistence)  
- **Deployment:** Vercel  

---

## Project Structure
gift-list/
├── public/ # Static files
├── src/
│ ├── App.jsx # Core app logic + UI
│ ├── main.jsx # React entry point
│ └── index.css # Tailwind import + base styles
├── index.html # Root HTML
├── package.json # Dependencies + scripts
├── postcss.config.js # Tailwind PostCSS config
└── README.md # This file

---

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/CastCee01/gift-list.git
   cd gift-list

2. Install dependencies:

npm install

3. Start the dev server:

npm run dev

4. Open the printed URL (default: http://localhost:5173).

Design Decisions

- Chose LocalStorage for simplicity and persistence without a backend.
- Used Tailwind CSS v4 for fast, modern styling and responsive design.
- Added confirmation dialogs for deletion/clear actions to prevent mistakes.
- Implemented responsive layout to support both desktop and mobile users.
- Deployed with Vercel for easy global access and testing.
- Possible Future Improvements

- 🔑 User accounts with authentication (Google login, etc.)
- 🔗 Shareable links for others to view your list
- 🎁 “Purchased” flow (items hidden from visitors, visible only to owner)
- 🖼 Image previews, price info, sorting/filtering
- ☁️ Cloud backend with Firebase/Supabase for multi-user support

AI Usage

AI tools (including ChatGPT) were used as helpers to debug Tailwind/PostCSS setup, improve UI polish, and guide architectural decisions.
All design and final code were written by me; AI acted as a productivity amplifier, not a replacement for problem-solving.

Links
- 🌐 Live demo: https://gift-list-alpha.vercel.app/
- 💻 Source code: https://github.com/CastCee01/gift-list