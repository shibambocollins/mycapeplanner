# TODO - Run frontend + fix login fetch issues

## Step 1: Ensure servers run
- [x] Start Vite frontend (http://localhost:5173)
- [x] Start Express backend (http://localhost:5000)

## Step 2: Fix chatbot/login “Failed to fetch”
- [x] Backend /api/chat was failing with `Gemini API key is not configured on the server`
- [x] Verify `server/.env` has a non-empty `GEMINI_API_KEY`
- [x] Restart backend after updating `server/.env`
- [x] Re-test login/chat from the frontend

## Step 3: Confirm API URL in frontend
- [x] Verify `client` `.env` has `VITE_API_URL=http://localhost:5000/api`
- [x] Re-test login/chat

