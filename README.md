<div align="center">

# MyCapePlanner

**AI-powered travel planning for Cape Town**

Chat with an AI guide, get a real itinerary, save it to your account, and export it as a PDF — all from one full-stack web app.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=flat-square&logo=sequelize)](https://sequelize.org/)
[![Azure](https://img.shields.io/badge/Azure-App_Service_%2B_SQL-0078D4?style=flat-square&logo=microsoftazure)](https://azure.microsoft.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_API-4285F4?style=flat-square&logo=google)](https://ai.google.dev/)

</div>

---

## Live demo

| | |
|---|---|
| **Frontend** | `https://mycapeplanner.vercel.app/` |
| **Backend health check** | `https://mycapeplanner-api-hybpddg3gsb4gzhs.southafricanorth-01.azurewebsites.net/api/health` |

---

## The problem

Planning a Cape Town trip usually means a blog tab, a Maps tab, a TripAdvisor tab, and a Notes app slowly turning into chaos. Ask a generic AI chatbot for help and it'll happily suggest places — but refresh the page and it forgets everything. Worse, a lot of "quick and easy" AI travel demos put the API key straight in the browser, which is a great way to let someone else run up your bill.

## The solution

MyCapePlanner takes the chatbot idea and gives it the things a real app needs to survive contact with an actual user:

- A conversational planner powered by Gemini that turns "I want a chill weekend near the Waterfront" into a structured itinerary
- Real accounts, so your plans are tied to you and still there tomorrow
- The Gemini API key locked away server-side — never exposed to the browser
- A genuine PDF export button that produces an actual PDF
- An interactive Leaflet map of real Cape Town attractions

---

## Table of contents

- [MyCapePlanner](#mycapeplanner)
  - [Live demo](#live-demo)
  - [The problem](#the-problem)
  - [The solution](#the-solution)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Tech stack](#tech-stack)
  - [System architecture](#system-architecture)
    - [Auth flow](#auth-flow)
    - [Chat flow](#chat-flow)
  - [Project structure](#project-structure)
  - [Database design](#database-design)
  - [REST API](#rest-api)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Clone and install](#clone-and-install)
    - [Run locally](#run-locally)
    - [Health check](#health-check)
  - [Environment variables](#environment-variables)
  - [Deployment](#deployment)
  - [Security](#security)
  - [Known limitations](#known-limitations)
  - [Future improvements](#future-improvements)
  - [Author](#author)

---

## Features

**AI travel assistant** — chat-based itinerary generation via Gemini, aware of budget, duration, and interests. Supports browser voice dictation as an input alternative to typing.

**Authentication** — email/password signup and login, bcrypt-hashed passwords, JWT-based sessions, protected API routes.

**Saved itineraries** — generated trips save to the database per-user and persist across sessions and devices.

**PDF export** — one-click download of any saved itinerary as a real PDF via jsPDF.

**Interactive map** — Leaflet + OpenStreetMap map of real Cape Town attractions (V&A Waterfront, Table Mountain, Camps Bay, Kirstenbosch, Boulders Beach), no API key required.

**Responsive UI** — built with Tailwind CSS, works across desktop and mobile viewports.

---

## Tech stack

**Frontend**
| Technology | Purpose |
|---|---|
| React 18 | Component-based UI |
| Vite | Dev server and build tool |
| Tailwind CSS + tailwindcss-animate | Styling |
| lucide-react | Icon set |
| Leaflet + react-leaflet | Interactive map |
| jsPDF | Client-side PDF generation |

**Backend**
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API |
| Sequelize | ORM, dialect-agnostic |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT auth |
| cors, dotenv | Middleware / config |

**AI**
| Technology | Purpose |
|---|---|
| Google Gemini API | Itinerary generation, called server-side only |

**Database**
| Environment | Database |
|---|---|
| Local development | SQLite (zero config) |
| Production | Azure SQL (`mssql` dialect via `tedious`) |

Sequelize means switching dialects is a config change in `server/config/db.js`, not a rewrite — the same models and controllers work against SQLite, MySQL, or Azure SQL.

**Infrastructure**
| Service | Role |
|---|---|
| Vercel | Frontend hosting |
| Azure App Service | Backend hosting |
| Azure SQL Database | Production database |
| GitHub + GitHub Actions | Source control, CI/CD to Azure |

---

## System architecture

```
Client (React + Vite)  ──HTTPS──▶  API server (Express + JWT)
   hosted on Vercel                  hosted on Azure App Service
                                            │
                              ┌─────────────┴─────────────┐
                              ▼                           ▼
                    Database (Azure SQL,          Gemini API
                    via Sequelize)                (AI chat responses)

GitHub Actions deploys the client to Vercel and the server to Azure
on every push to main.
```

### Auth flow
```
Register/Login → Express validates credentials → bcrypt checks/hashes
password → JWT signed and returned → included on every subsequent
authenticated request
```

### Chat flow
```
User prompt → React frontend → Express API → Gemini API
→ generated itinerary → displayed in chat → (optional) saved to DB
```

---

## Project structure

```
mycapeplanner/
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/     AuthScreen, Sidebar, HomeScreen, ChatScreen,
│   │   │                   TripsScreen, ProfileScreen, ExploreScreen
│   │   ├── data/            Mock trip/category data, map coordinates
│   │   ├── services/        api.js — all backend calls
│   │   ├── utils/            Shared helpers (formatted text rendering)
│   │   ├── theme.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/
│   ├── config/db.js          Sequelize connection, dialect-swappable
│   ├── controllers/           auth, itinerary, chat logic
│   ├── middleware/            JWT verification
│   ├── models/                 User, Itinerary
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── .github/workflows/          GitHub Actions → Azure deploy
├── README.md
└── .gitignore
```

---

## Database design

**Users**
| Field | Description |
|---|---|
| id | Primary key |
| name | Display name |
| email | Unique |
| passwordHash | bcrypt hash — passwords are never stored in plain text |
| avatar | Profile image URL |

**Itineraries**
| Field | Description |
|---|---|
| id | Primary key |
| text | Generated itinerary content |
| isItinerary | Whether this message was a structured itinerary |
| userId | Owner (foreign key) |
| createdAt | Saved date |

One user has many itineraries.

---

## REST API

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new account |
| POST | `/api/auth/login` | Authenticate, returns a JWT |
| GET | `/api/auth/me` | Get the current user (requires JWT) |
| GET | `/api/itineraries` | List the current user's saved itineraries |
| POST | `/api/itineraries` | Save a new itinerary |
| DELETE | `/api/itineraries/:id` | Delete a saved itinerary |
| POST | `/api/chat` | Send a prompt to Gemini, returns the AI's reply |
| GET | `/api/health` | Health check — returns `{"status":"ok"}` |

All routes except `/register`, `/login`, and `/health` require an `Authorization: Bearer <token>` header.

---

## Getting started

### Prerequisites
- Node.js 20+ (22 recommended)
- npm
- A [Google AI Studio](https://aistudio.google.com/) API key

### Clone and install
```bash
git clone https://github.com/shibambocollins/mycapeplanner.git
cd mycapeplanner

cd server && npm install
cd ../client && npm install
```

### Run locally
```bash
# terminal 1
cd server
cp .env.example .env   # then fill in JWT_SECRET and GEMINI_API_KEY
npm run dev             # http://localhost:5000

# terminal 2
cd client
cp .env.example .env
npm run dev             # http://localhost:5173
```

Open `http://localhost:5173`, sign up with a real email/password, and start planning.

### Health check
```bash
curl http://localhost:5000/api/health
# {"status":"ok"}
```

---

## Environment variables

**`server/.env`**
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

JWT_SECRET=
JWT_EXPIRES_IN=7d

# Local dev — zero config
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

# Production — Azure SQL (uncomment and fill in, set DB_DIALECT=mssql)
# DB_HOST=
# DB_PORT=1433
# DB_NAME=
# DB_USER=
# DB_PASSWORD=

GEMINI_API_KEY=
GEMINI_MODEL=gemini-3-flash-preview
```

**`client/.env`**
```env
VITE_API_URL=http://localhost:5000/api
```

Never commit real `.env` files — both are gitignored.

---

## Deployment

- **Frontend** → Vercel, root directory set to `client/`, auto-detects Vite
- **Backend** → Azure App Service (B1 tier — the Free/Serverless tier auto-pauses and has a daily CPU quota, both of which caused real outages during development)
- **Database** → Azure SQL
- **CI/CD** → GitHub Actions builds and deploys `server/` to Azure on every push to `main`

`main` is protected — changes go through a pull request rather than a direct push.

---

## Security

- Passwords hashed with bcrypt, never stored in plain text
- JWT-based stateless authentication with a verification middleware on protected routes
- Gemini API key lives only in the backend's environment variables — never sent to or stored in the browser
- Sequelize's parameterized queries protect against SQL injection
- CORS restricts requests to known frontend origins (`CLIENT_ORIGIN` plus any `*.vercel.app` preview domain)

---

## Known limitations

- Chat history isn't persisted — each session starts a fresh conversation
- The backend supports deleting a saved itinerary (`DELETE /api/itineraries/:id`), but there's no delete button in the UI yet
- Saved itineraries can't currently be edited
- Profile picture upload is client-only (`URL.createObjectURL`) and resets on refresh — not yet wired to persistent storage
- Depends on Gemini API availability; a preview model may have lower rate limits and can change behavior between releases
- Voice input depends on the browser's Speech Recognition API and isn't supported everywhere
- No automated tests yet
- Cape Town only, for now

---

## Future improvements

- Delete/edit UI for saved itineraries
- Persistent chat history across sessions
- Password reset and email verification
- Persistent avatar storage (e.g. Azure Blob Storage)
- Multi-city support
- Automated testing

---

## Author

**Collins Shibambo** — Application Developer

GitHub: [github.com/shibambocollins](https://github.com/shibambocollins)
