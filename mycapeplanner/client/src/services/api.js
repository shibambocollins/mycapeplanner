const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Request failed');
  }
  return data;
}

export async function register({ name, email, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await handleResponse(res);
  localStorage.setItem('token', data.token);
  return data.user;
}

export async function getMe() {
  const res = await fetch(`${API_URL}/auth/me`, { headers: authHeaders() });
  const data = await handleResponse(res);
  return data.user;
}

export async function getItineraries() {
  const res = await fetch(`${API_URL}/itineraries`, { headers: authHeaders() });
  const data = await handleResponse(res);
  return data.itineraries;
}

export async function saveItinerary({ text, isItinerary }) {
  const res = await fetch(`${API_URL}/itineraries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ text, isItinerary }),
  });
  const data = await handleResponse(res);
  return data.itinerary;
}

export async function deleteItinerary(id) {
  const res = await fetch(`${API_URL}/itineraries/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function sendChatMessage({ chatHistory }) {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ chatHistory }),
  });
  const data = await handleResponse(res);
  return data.text;
}

export function logout() {
  localStorage.removeItem('token');
}
