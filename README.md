# 🏔️ MyCapePlanner

**Your Table Mountain-side trip planner, powered by AI and built like a real product.**

Tell it what kind of Cape Town trip you want. Get back a real itinerary, a real account to keep it in, and a real PDF to take with you. No sticky notes, no fifteen browser tabs, no losing your plan the moment you accidentally close the window.

## 🧭 The problem

Planning a Cape Town trip usually looks like this: a blog tab, a Google Maps tab, a TripAdvisor tab, and a Notes app slowly turning into chaos. Ask a generic AI chatbot for help and it'll happily suggest places, but the moment you refresh, it forgets everything. Worse, plenty of "quick and easy" AI travel demos shove the API key straight into the browser, which is a great way to let someone else run up your bill.

## 💡 The solution

MyCapePlanner takes the chatbot idea and gives it the things a real app needs to survive contact with an actual user:

- 🗺️ A conversational planner powered by Gemini that turns "I want a chill weekend near the Waterfront" into a structured, day-by-day itinerary
- 🔐 Real accounts, so your plans are tied to you and still there tomorrow
- 🛡️ The Gemini API key locked away server-side, never exposed to the browser
- 📄 A genuine "Download PDF" button that produces an actual PDF, not just a toast that says "coming soon"

## ✨ Key features

- Chat-based itinerary planning for Cape Town, backed by the Gemini API
- Signup/login with bcrypt-hashed passwords and JWT-based sessions
- Itineraries saved per-user in a database, not just in React state
- One-click PDF export of a saved itinerary via `jspdf`
- Swappable database backend (SQLite out of the box, MySQL or Azure SQL with a config change)

## 🔄 What changed from the original Gemini single-file version

- Split the one-file component into `client/src/components/*`, `data/`, `services/`, `utils/`.
- Auth is real now: bcrypt-hashed passwords, JWT sessions, backed by a database (SQLite by default).
- The Gemini API call moved server-side (`server/controllers/chatController.js`), so the API key never reaches the browser.
- Saved itineraries persist to the database per-user instead of living only in React state.
- "Download PDF" actually generates a PDF now (via `jspdf`) instead of just showing a toast.

## 🧱 Tech stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express, Sequelize
- **Auth**: bcrypt, JWT
- **Database**: SQLite by default, swappable for MySQL or Azure SQL
- **AI**: Google Gemini API
- **PDF export**: jsPDF

## 📁 Project structure

```
mycapeplanner/
├── client/     React + Vite + Tailwind frontend
└── server/     Express + Sequelize backend (auth, itineraries, Gemini proxy)
```

## ⚙️ Backend setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
- `JWT_SECRET` — set this to any long random string (e.g. `openssl rand -hex 32`)
- `GEMINI_API_KEY` — your Gemini API key from Google AI Studio

Then run it:

```bash
npm run dev
```

This starts on `http://localhost:5000` and creates `database.sqlite` automatically on first run. No manual database setup is needed.

### 🔀 Switching the database later (Azure SQL / MySQL)

The database layer is Sequelize, so switching dialects is a config change, not a rewrite:

- **MySQL**: `npm install mysql2`, then set `DB_DIALECT=mysql` and the `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` vars in `.env`.
- **Azure SQL**: `npm install tedious`, then set `DB_DIALECT=mssql` and the same connection vars, pointing at your Azure SQL server.

No model or controller code needs to change. `config/db.js` handles the dialect switch.

## 🎨 Frontend setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`. `VITE_API_URL` in `.env` should point at your backend (`http://localhost:5000/api` by default).

## 🚀 Run order

1. Start the backend (`server`) first.
2. Start the frontend (`client`).
3. Open `http://localhost:5173`, sign up with a real email/password, and start planning your trip.

## ⚠️ Known limitations

- Profile picture upload is still client-only (`URL.createObjectURL`), so it resets on refresh. Wire it up to real storage (e.g. Azure Blob Storage) if you want it to persist.
- The `.env` files are gitignored. Never commit real secrets or your Gemini API key.

## 🗺️ Roadmap ideas

- Persistent profile picture storage via Azure Blob Storage or similar
- Shareable itinerary links for non-registered users
- Multi-city support beyond Cape Town