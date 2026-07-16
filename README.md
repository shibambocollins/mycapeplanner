<img width="1915" height="986" alt="image" src="https://github.com/user-attachments/assets/35f0dd53-88bd-4d3b-8ac1-a78d06e974fa" />

<img width="1131" height="708" alt="Frame 1" src="https://github.com/user-attachments/assets/88c0768d-65b2-43da-908e-366f0a9df04a" />

<div align="center">

# 🏔️ MyCapePlanner

### AI-Powered Cape Town Travel Planner

Plan personalized Cape Town adventures with the power of Artificial Intelligence.

Generate itineraries, discover attractions, receive travel recommendations, explore interactive maps, save trips, and export beautiful travel plans—all from one modern web application.

---

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express.js-4-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize)](https://sequelize.org/)
[![SQLite](https://img.shields.io/badge/SQLite-Development-003B57?style=for-the-badge&logo=sqlite)](https://sqlite.org/)
[![Azure SQL](https://img.shields.io/badge/Azure%20SQL-Production-0078D4?style=for-the-badge&logo=microsoftazure)](https://azure.microsoft.com/)
[![Azure App Service](https://img.shields.io/badge/Azure-App_Service-0078D4?style=for-the-badge&logo=microsoftazure)](https://azure.microsoft.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Gemini API](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

---

# Live Demo

## Frontend

> **Live Application**

```
PASTE YOUR VERCEL URL HERE
```

## Backend API

```
PASTE YOUR AZURE APP SERVICE URL HERE
```

Example:

```
https://mycapeplanner-api.azurewebsites.net/api/health
```

---

# Screenshots

> Replace these placeholders with screenshots after deployment.

| Dashboard |
|------------|
| ![](docs/dashboard.png) |

| AI Chat |
|------------|
| ![](docs/chat.png) |

| Interactive Map |
|------------|
| ![](docs/map.png) |

| Saved Trips |
|------------|
| ![](docs/saved-trips.png) |

| Login |
|------------|
| ![](docs/login.png) |

---

# System Architecture

Insert your architecture diagram here.

```text
docs/architecture.png
```

```markdown
![Architecture](docs/architecture.png)
```

---

# Table of Contents

- Project Overview
- Features
- Technology Stack
- System Architecture
- Application Workflow
- Folder Structure
- Authentication
- AI Integration
- Database
- REST API
- Installation
- Environment Variables
- Local Development
- Deployment
- Security
- Performance
- Error Handling
- Known Limitations
- Future Improvements
- Lessons Learned
- Author

---

# Project Overview

MyCapePlanner is an AI-powered travel planning web application that helps users discover Cape Town through intelligent itinerary generation and personalized recommendations.

Instead of manually searching through dozens of websites, users simply describe what they want, for example:

> "Plan a romantic weekend in Cape Town with a budget of R3500."

or

> "I have one day and R800. What should I do?"

The AI assistant generates a customized itinerary based on the user's requirements.

The application combines Artificial Intelligence with interactive maps, saved itineraries, authentication, PDF export, and modern responsive design to create a complete travel planning experience.

The project demonstrates the integration of cloud technologies, REST APIs, authentication, database management, and generative AI into a full-stack web application.

---

# Features

## AI Travel Assistant

- AI-powered itinerary generation
- Cape Town tourism recommendations
- Budget-aware suggestions
- Restaurant recommendations
- Accommodation suggestions
- Attractions
- Activities
- Hidden gems
- Family trips
- Adventure planning
- Food recommendations
- Nightlife suggestions
- General Cape Town travel assistance

---

## Interactive Maps

- Interactive Leaflet map
- Tourist attractions
- Attraction markers
- Easy navigation
- Location discovery

---

##  Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes

---

##  Saved Itineraries

Authenticated users can

- Save generated itineraries
- View saved itineraries
- Access previous saved trips

---

##  Export

Users can export generated itineraries as professionally formatted PDF documents.

---

## Voice Input

Supports browser speech recognition allowing users to dictate travel requests instead of typing.

---

## Responsive Design

Fully responsive across

- Desktop
- Laptop
- Tablet
- Mobile devices

---

##  Modern User Interface

- Clean dashboard
- Smooth animations
- Responsive layouts
- Interactive cards
- Modern typography
- Beautiful color palette inspired by Cape Town

---

## Cloud Ready

Application is designed for cloud deployment using

- Azure App Service
- Azure SQL Database
- GitHub Actions
- Vercel

---

# Project Objectives

The objectives of this project are to

- Demonstrate full-stack web development skills
- Integrate Generative AI into a real-world application
- Showcase cloud deployment using Microsoft Azure
- Build a responsive modern web application
- Implement secure authentication
- Demonstrate REST API development
- Showcase database portability using Sequelize ORM
- Build a portfolio-quality software engineering project

---

# Target Users

The application is intended for

- Tourists visiting Cape Town
- Local residents exploring the city
- International visitors
- Students
- Families
- Solo travelers
- Couples
- Adventure seekers
- Food lovers
- Weekend travelers

---

# Why MyCapePlanner?

Planning a trip often involves switching between multiple websites for attractions, accommodation, restaurants, maps, and travel advice.

MyCapePlanner centralizes this experience into a single AI-powered platform where users can generate personalized itineraries in seconds.

Instead of static travel guides, users receive dynamic recommendations tailored to their interests, available time, and budget.

The application demonstrates how Artificial Intelligence can simplify travel planning while providing an engaging and user-friendly experience.

---

# 🛠️ Technology Stack

MyCapePlanner follows a modern full-stack architecture built with scalable and cloud-ready technologies.

## Frontend

| Technology | Purpose |
|------------|---------|
| React | Component-based user interface |
| React Router | Client-side routing |
| Vite | Fast development server and build tool |
| Tailwind CSS | Utility-first styling |
| Leaflet | Interactive maps |
| Lucide React | Modern icon library |
| jsPDF | PDF itinerary generation |
| Fetch API | HTTP communication with backend |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| Sequelize ORM | Database abstraction |
| JWT | Authentication |
| bcrypt | Password hashing |
| dotenv | Environment configuration |
| CORS | Cross-origin resource sharing |

---

## Artificial Intelligence

| Technology | Purpose |
|------------|---------|
| Google Gemini API | AI itinerary generation |
| Gemini 3.x Preview Model | Natural language travel planning |

The AI assistant understands natural language prompts and generates personalized travel itineraries for Cape Town based on user preferences, budget, duration, and interests.

Examples include:

- Plan a romantic weekend.
- Budget-friendly family trip.
- Best restaurants near the Waterfront.
- Adventure activities under R1000.
- Hidden gems around Cape Town.
- One-day itinerary.

---

## Database

Development

- SQLite

Production

- Azure SQL Database

Using Sequelize ORM allows the application to switch between database providers without requiring major code changes.

---

## Cloud Services

| Service | Provider |
|---------|----------|
| Frontend Hosting | Vercel |
| Backend Hosting | Azure App Service |
| Database | Azure SQL Database |
| CI/CD | GitHub Actions |
| Source Control | GitHub |

---

# System Architecture

The application follows a client-server architecture.

```text
                        +------------------------+
                        |        User            |
                        +-----------+------------+
                                    |
                                    |
                          React / Vite Frontend
                                    |
                       HTTPS REST API Requests
                                    |
                                    ▼
                      Express.js Backend API
                                    |
             +----------------------+----------------------+
             |                                             |
             ▼                                             ▼
      Gemini AI API                              Azure SQL Database
             |                                             |
             +----------------------+----------------------+
                                    |
                             JSON Response
                                    |
                             React Frontend
```

---

# Project Structure

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
