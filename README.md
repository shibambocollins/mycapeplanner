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

---

#  Application Workflow

## User Authentication

```text
User
   │
   ▼
Register/Login
   │
   ▼
Express API
   │
   ▼
Validate credentials
   │
   ▼
Hash Password (bcrypt)
   │
   ▼
Generate JWT
   │
   ▼
Authenticated Session
```

---

## AI Chat Flow

```text
User Prompt

↓

React Frontend

↓

Express REST API

↓

Gemini API

↓

Generated Itinerary

↓

Frontend Display

↓

(Optional)

Save Itinerary

↓

Database
```

---

## Saved Itinerary Flow

```text
User

↓

AI Generates Trip

↓

User clicks "Save"

↓

Backend validates JWT

↓

Express API

↓

Sequelize ORM

↓

Database

↓

Saved Itinerary
```

---

#  Authentication

Authentication is implemented using JSON Web Tokens (JWT).

Features include:

- User Registration
- User Login
- Protected API routes
- Secure password hashing with bcrypt
- Stateless authentication
- Token validation middleware

Passwords are never stored in plain text.

Each password is hashed using bcrypt before being stored in the database.

After successful authentication, the backend generates a signed JWT which is included in future authenticated requests.

---

#  Artificial Intelligence Integration

MyCapePlanner integrates Google's Gemini API to generate personalized travel recommendations.

The AI understands conversational language instead of requiring users to fill out long forms.

Example prompts:

```
Plan a romantic weekend in Cape Town.
```

```
I have R1500 for two days.
```

```
Best beaches for families.
```

```
Hidden gems around Cape Town.
```

```
Best restaurants near Camps Bay.
```

The backend sends the user's prompt to Gemini and returns the generated itinerary to the frontend.

---

## Why Gemini?

Gemini provides:

- Natural language understanding
- Context-aware responses
- Flexible itinerary generation
- General tourism assistance
- Travel recommendations
- Activity suggestions

Instead of hardcoded travel packages, users receive dynamically generated recommendations tailored to their requests.

---

## AI Prompt Processing

```text
User Prompt

↓

Validate Request

↓

Construct Prompt

↓

Gemini API

↓

Generate Response

↓

Format Output

↓

Return to Frontend
```

---

## AI Capabilities

The chatbot can assist users with:

- Attractions
- Restaurants
- Cafés
- Beaches
- Museums
- Adventure activities
- Hiking
- Wine farms
- Family trips
- Budget planning
- Luxury travel
- Weekend itineraries
- Food recommendations
- Accommodation suggestions
- Safety tips
- Local travel advice
- Cape Town tourism information

---

# Database Design

The application currently stores:

## Users

| Field | Description |
|--------|-------------|
| id | Primary Key |
| username | User's display name |
| email | Unique email |
| password | bcrypt hashed password |
| createdAt | Record creation date |
| updatedAt | Last update |

---

## Saved Itineraries

| Field | Description |
|--------|-------------|
| id | Primary Key |
| title | Generated title (optional) |
| itinerary | Generated itinerary text |
| userId | Owner |
| createdAt | Saved date |

Relationships

```
User

1

↓

Many

↓

Saved Itineraries
```

---

#  REST API Overview

## Authentication

```
POST /api/auth/register
```

Creates a new user account.

---

```
POST /api/auth/login
```

Authenticates an existing user.

---

## Chat

```
POST /api/chat
```

Generates AI responses using the Gemini API.

---

## Itineraries

```
GET /api/itineraries
```

Returns all saved itineraries for the authenticated user.

---

```
POST /api/itineraries
```

Saves a generated itinerary.

---

## Health Check

```
GET /api/health
```

Returns the application status.

Example response:

```json
{
  "status": "ok"
}
```

---

#  Database Portability

A major design decision was using Sequelize ORM.

Benefits include:

- SQLite for local development
- Azure SQL in production
- MySQL compatibility
- Minimal code changes when switching databases
- Reduced vendor lock-in
- Cleaner database models
- Easier future scalability

This approach allows the application to evolve without rewriting database logic.

---

#  Getting Started

Follow the steps below to run MyCapePlanner locally.

---

# 📋 Prerequisites

Ensure the following software is installed on your machine.

| Software | Version |
|-----------|---------|
| Node.js | 20+ (22 LTS Recommended) |
| npm | Latest |
| Git | Latest |
| Visual Studio Code | Recommended |
| Azure Account *(optional)* | Production deployment |
| Google AI Studio API Key | Required |

---

# Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mycapeplanner.git

cd mycapeplanner
```

---

#  Install Dependencies

## Frontend

```bash
cd client
npm install
```

---

## Backend

```bash
cd ../server
npm install
```

---

#  Environment Variables

Create a `.env` file inside the **server** directory.

```env
# Server
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

# Authentication
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# SQLite (Development)
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite

# Azure SQL (Production)
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=

# Gemini
GEMINI_API_KEY=YOUR_API_KEY
GEMINI_MODEL=gemini-3-flash-preview
```

---

# Running the Application

## Start Backend

```bash
cd server

npm run dev
```

Server

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd client

npm run dev
```

Application

```
http://localhost:5173
```

---

#  Health Check

After starting the backend

```
GET

/api/health
```

Expected response

```json
{
  "status":"ok"
}
```

---

#  Deployment

The application is designed for cloud deployment.

## Frontend

Hosted using

- Vercel

Responsibilities

- Static asset hosting
- React application
- HTTPS
- Automatic deployments

---

## Backend

Hosted using

- Azure App Service

Responsibilities

- REST API
- Authentication
- AI communication
- Database operations

---

## Database

Production

Azure SQL Database

Development

SQLite

---

# Continuous Integration & Deployment

GitHub Actions automatically builds and deploys the backend whenever changes are pushed to the main branch.

Pipeline

```
Developer

↓

GitHub Push

↓

GitHub Actions

↓

Build

↓

Deploy

↓

Azure App Service

↓

Live API
```

Benefits

- Automated deployment
- Version control
- Continuous delivery
- Faster updates
- Reliable releases

---

# Security

Several security measures have been implemented throughout the application.

## Authentication

- JWT Authentication
- Protected routes
- Token validation middleware

---

## Password Security

Passwords are never stored in plain text.

Each password is securely hashed using

- bcrypt

before being persisted.

---

## Database

Using Sequelize ORM provides protection against SQL Injection by utilizing parameterized queries instead of raw SQL statements.

---

## Environment Variables

Sensitive configuration values are stored inside environment variables.

Examples

- JWT Secret
- Database credentials
- Gemini API Key

These values should never be committed to source control.

---

## CORS

The backend uses CORS configuration to restrict requests to trusted frontend origins.

---

#  Performance Considerations

Several design decisions improve overall application performance.

- Component-based React architecture
- Fast Vite bundling
- Efficient REST communication
- Sequelize connection pooling
- Lazy API requests
- Minimal database queries
- Lightweight UI
- Responsive layouts

---

#  Error Handling

The application gracefully handles common errors.

Examples

- Invalid login credentials
- Unauthorized access
- Invalid JWT
- Gemini API failures
- Database connection failures
- Missing input fields
- Network failures

Users receive meaningful feedback instead of application crashes.

---

# Known Limitations

The current implementation intentionally focuses on the project's MVP scope.

Current limitations include:

- Chat history is not persisted between login sessions.
- Users begin with a new AI conversation after signing in.
- Saved itineraries can currently be viewed but cannot be edited or deleted.
- AI responses depend on the availability of Google's Gemini API.
- Internet connectivity is required for AI features.
- Voice input depends on the browser's Speech Recognition API and may not be supported by all browsers.
- Offline functionality is not available.
- The application currently supports Cape Town tourism only.
- Automated unit and integration tests have not yet been implemented.
- Password reset and email verification are not currently supported.
- User profile management is limited.

---

#  Gemini API Considerations

This project currently integrates with a Gemini preview model.

Preview models are intended for development and experimentation.

As a result:

- Usage quotas may be limited.
- Rate limits may be lower than production models.
- Responses may vary as the model evolves.
- Temporary service interruptions may occur.
- API behavior may change between preview releases.

If API limits are reached, itinerary generation may temporarily fail until the quota resets.

---

# Future Improvements

Potential future enhancements include:

- Persistent AI conversation history
- Edit itineraries
- Delete itineraries
- User profile management
- Password reset
- Email verification
- Favorite attractions
- AI memory across sessions
- Weather integration
- Google Maps Directions
- Public transport recommendations
- Accommodation booking
- Restaurant reservations
- Event recommendations
- Multi-city support
- Offline itinerary access
- Image generation
- AI trip optimization
- Budget tracking
- Calendar integration
- Mobile application
- Push notifications
- Dark mode
- Automated testing
- Docker support
- Kubernetes deployment

---

# Lessons Learned

This project provided valuable practical experience in:

- Full-stack application development
- REST API design
- Cloud deployment with Microsoft Azure
- Continuous Integration
- Authentication using JWT
- Database design
- Sequelize ORM
- AI integration
- Prompt engineering
- Frontend architecture
- Backend architecture
- API consumption
- Secure application development
- Responsive interface design
- Git and GitHub workflows

---

# Contributing

Contributions are welcome.

If you would like to improve MyCapePlanner:

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/new-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/new-feature
```

5. Open a Pull Request.

---

#  Portfolio Highlights

This project demonstrates proficiency in:

- Full-Stack Development
- React
- Express.js
- Node.js
- REST APIs
- Authentication
- Azure Cloud
- SQL Databases
- Sequelize ORM
- Artificial Intelligence Integration
- Responsive Design
- GitHub Actions
- CI/CD
- Modern JavaScript
- Cloud Deployment

---

#  Acknowledgements

Special thanks to:

- Google Gemini API
- Microsoft Azure
- Vercel
- React
- Express.js
- Sequelize
- Tailwind CSS
- Leaflet
- Lucide React
- jsPDF
- The Open Source Community

---

# Author

**Collins Shibambo**

Application Developer | Full-Stack Developer | Cloud Enthusiast

LinkedIn

> Add your LinkedIn profile

GitHub

> https://github.com/shibambocollins

Portfolio

> Add portfolio website

Email

> Add professional email

---

#  License

This project is currently not licensed.

If open sourcing for public contributions, consider adding an MIT License in the future.

---

<div align="center">

##  If you found this project interesting, consider giving it a star!

Thank you for visiting **MyCapePlanner**.

Built with using React, Express, Azure, and Google Gemini.

</div>
