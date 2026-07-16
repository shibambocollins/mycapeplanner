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
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── docs/
│
├── .github/
│   └── workflows/
│
├── README.md
└── .gitignore
```

## 🔀 Application workflow

**User authentication**

```
User → Register/Login → Express API → Validate credentials
→ Hash password (bcrypt) → Generate JWT → Authenticated session
```

**AI chat flow**

```
User prompt → React frontend → Express REST API → Gemini API
→ Generated itinerary → Frontend display → (optional) Save → Database
```

**Saved itinerary flow**

```
User → AI generates trip → User clicks "Save" → Backend validates JWT
→ Express API → Sequelize ORM → Database → Saved itinerary
```

## 🔐 Authentication

Authentication is implemented using JSON Web Tokens (JWT):

- User registration and login
- Protected API routes with token validation middleware
- Stateless sessions

Passwords are never stored in plain text — each one is hashed with bcrypt before being saved. After a successful login, the backend issues a signed JWT that's included on every subsequent authenticated request.

## 🤖 AI integration

MyCapePlanner integrates Google's Gemini API to generate personalized travel recommendations. The AI understands conversational language instead of requiring users to fill out long forms.

Example prompts:

```
Plan a romantic weekend in Cape Town.
I have R1500 for two days.
Best beaches for families.
Hidden gems around Cape Town.
Best restaurants near Camps Bay.
```

The backend sends the user's prompt to Gemini and returns the generated itinerary to the frontend.

**Why Gemini?** It offers natural language understanding, context-aware responses, and flexible itinerary generation, so users get dynamically generated recommendations tailored to their request instead of a fixed list of hardcoded travel packages.

**What the chatbot can help with:** attractions, restaurants, cafés, beaches, museums, adventure activities, hiking, wine farms, family trips, budget planning, luxury travel, weekend itineraries, food recommendations, accommodation suggestions, safety tips, and general Cape Town tourism advice.

## 🗄️ Database design

**Users**

| Field | Description |
|--------|-------------|
| id | Primary key |
| username | User's display name |
| email | Unique email |
| password | bcrypt-hashed password |
| createdAt | Record creation date |
| updatedAt | Last update |

**Saved itineraries**

| Field | Description |
|--------|-------------|
| id | Primary key |
| title | Generated title (optional) |
| itinerary | Generated itinerary text |
| userId | Owner |
| createdAt | Saved date |

Relationship: one user has many saved itineraries.

## 🔌 REST API overview

```
POST /api/auth/register     Creates a new user account
POST /api/auth/login        Authenticates an existing user
POST /api/chat              Generates an AI response via Gemini
GET  /api/itineraries        Returns all saved itineraries for the authenticated user
POST /api/itineraries        Saves a generated itinerary
GET  /api/health             Returns application status, e.g. { "status": "ok" }
```

## 🔀 Database portability

A major design decision was building on Sequelize ORM rather than talking to a specific database directly. That buys:

- SQLite for local development, Azure SQL or MySQL in production
- Minimal code changes when switching databases
- Reduced vendor lock-in
- Cleaner models and easier future scaling

No model or controller code needs to change to switch dialects — `config/db.js` handles it.

## 🚀 Getting started

### Prerequisites

| Software | Version |
|-----------|---------|
| Node.js | 20+ (22 LTS recommended) |
| npm | Latest |
| Git | Latest |
| Google AI Studio API key | Required |
| Azure account | Optional, for production deployment |

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/mycapeplanner.git
cd mycapeplanner
```

### Install dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### Environment variables

Create a `.env` file inside the **server** directory:

```env
# Server
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

# Authentication
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# SQLite (development)
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

# Azure SQL (production)
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

# Gemini
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-3-flash-preview
```

### Run it

```bash
cd server
npm run dev
```

Backend runs at `http://localhost:5000`.

```bash
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`. Open it, sign up with a real email/password, and start planning your trip.

### Health check

Once the backend is running, `GET /api/health` should return:

```json
{ "status": "ok" }
```

## ☁️ Deployment

- **Frontend**: Vercel — static asset hosting, HTTPS, automatic deployments
- **Backend**: Azure App Service — REST API, authentication, AI communication, database operations
- **Database**: SQLite in development, Azure SQL in production

## 🔁 Continuous integration & deployment

GitHub Actions builds and deploys the backend automatically whenever changes are pushed to `main`:

```
Developer → GitHub push → GitHub Actions → Build → Deploy → Azure App Service → Live API
```

## 🛡️ Security

- JWT authentication with protected routes and token validation middleware
- Passwords hashed with bcrypt, never stored in plain text
- Sequelize ORM uses parameterized queries, protecting against SQL injection
- Sensitive values (JWT secret, database credentials, Gemini API key) live in environment variables and are never committed to source control
- CORS configured to restrict requests to trusted frontend origins

## ⚡ Performance considerations

- Component-based React architecture with fast Vite bundling
- Sequelize connection pooling and minimal, lazy database queries
- Lightweight, responsive UI

## 🧯 Error handling

The application handles common failure cases gracefully — invalid login credentials, unauthorized access, invalid JWTs, Gemini API failures, database connection issues, missing input fields, and network failures — so users get meaningful feedback instead of a crash.

## ⚠️ Known limitations

This is intentionally scoped as an MVP:

- Chat history isn't persisted between login sessions; users start a fresh AI conversation after signing in
- Saved itineraries can be viewed but not yet edited or deleted
- AI responses depend on the availability of Google's Gemini API, and an internet connection is required
- Voice input depends on the browser's Speech Recognition API and may not work in every browser
- No offline functionality
- Cape Town tourism only, for now
- No automated unit or integration tests yet
- No password reset or email verification
- User profile management is limited

## 🧪 Gemini API considerations

This project currently integrates with a Gemini preview model, which means:

- Usage quotas and rate limits may be lower than production models
- Responses may vary as the model evolves
- Temporary service interruptions or behavior changes between preview releases are possible

If API limits are reached, itinerary generation may temporarily fail until the quota resets.

## 🗺️ Future improvements

- Persistent AI conversation history, editing and deleting saved itineraries
- User profile management, password reset, email verification
- Favorite attractions and AI memory across sessions
- Weather integration, Google Maps directions, public transport recommendations
- Accommodation booking, restaurant reservations, event recommendations
- Multi-city support and offline itinerary access
- Budget tracking, calendar integration, image generation, AI trip optimization
- Mobile app with push notifications, dark mode
- Automated testing, Docker and Kubernetes support

## 📚 Lessons learned

This project provided practical experience in full-stack development, REST API design, cloud deployment with Microsoft Azure, CI/CD, JWT authentication, database design with Sequelize, AI integration and prompt engineering, and frontend/backend architecture more broadly.

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push your branch: `git push origin feature/new-feature`
5. Open a pull request

## 🙏 Acknowledgements

Thanks to Google Gemini, Microsoft Azure, Vercel, React, Express.js, Sequelize, Tailwind CSS, Leaflet, Lucide React, jsPDF, and the open source community.



## 📄 License

This project is currently not licensed. Consider adding an MIT License if you plan to open it up for public contributions.

---

<div align="center">

If you found this project interesting, consider giving it a star! Thanks for visiting MyCapePlanner, built with React, Express, Azure, and Google Gemini.

</div>
