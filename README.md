# MyCapePlanner

AI travel-planner chatbot for Cape Town. React frontend + Express/Sequelize backend with real auth and persisted itineraries.

## What changed from the original Gemini single-file version

- Split the one-file component into `client/src/components/*`, `data/`, `services/`, `utils/`.
- Auth is real now: bcrypt-hashed passwords, JWT sessions, backed by a database (SQLite by default).
- The Gemini API call moved server-side (`server/controllers/chatController.js`) — the API key never reaches the browser.
- Saved itineraries persist to the database per-user instead of living only in React state.
- "Download PDF" actually generates a PDF now (via `jspdf`) instead of just showing a toast.

## Project structure

```
mycapeplanner/
├── client/     React + Vite + Tailwind frontend
└── server/     Express + Sequelize backend (auth, itineraries, Gemini proxy)
```

## Backend setup

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

This starts on `http://localhost:5000` and creates `database.sqlite` automatically on first run — no manual DB setup needed.

### Switching the database later (Azure SQL / MySQL)

The DB layer is Sequelize, so switching dialects is a config change, not a rewrite:

- **MySQL**: `npm install mysql2`, then set `DB_DIALECT=mysql` and the `DB_HOST` / `DB_PORT` / `DB_NAME` / `DB_USER` / `DB_PASSWORD` vars in `.env`. vv
- **Azure SQL**: `npm install tedious`, then set `DB_DIALECT=mssql` and the same connection vars, pointing at your Azure SQL server.

No model or controller code needs to change — `config/db.js` handles the dialect switch.

## Frontend setup

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`. `VITE_API_URL` in `.env` should point at your backend (`http://localhost:5000/api` by default).

## Run order

1. Start the backend (`server`) first.
2. Start the frontend (`client`).
3. Open `http://localhost:5173`, sign up with a real email/password, and start chatting.

## Notes

- Profile picture upload is still client-only (`URL.createObjectURL`) — it resets on refresh. Wire it up to real storage (e.g. Azure Blob Storage) later if you want it to persist.
- The `.env` files are gitignored — never commit real secrets or your Gemini API key.
