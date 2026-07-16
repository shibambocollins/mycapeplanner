import React, { useState, useEffect } from 'react';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import HomeScreen from './components/HomeScreen';
import ExploreScreen from './components/ExploreScreen';
import ChatScreen from './components/ChatScreen';
import TripsScreen from './components/TripsScreen';
import ProfileScreen from './components/ProfileScreen';
import { getMe, getItineraries, logout as apiLogout } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [savedTrips, setSavedTrips] = useState([]);
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const loadSavedTrips = async () => {
    try {
      const trips = await getItineraries();
      setSavedTrips(trips);
    } catch (e) {
      console.error('Failed to load itineraries', e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Allow guest mode (skip sign-in). If there's no token, app loads with no saved trips.
    if (!token) {
      setCheckingSession(false);
      setUser(null);
      setSavedTrips([]);
      return;
    }


    let isActive = true;

    void loadSavedTrips();

    getMe()
      .then((userData) => {
        if (!isActive) return;
        setUser(userData);
      })
      .catch(() => {
        apiLogout();
      })
      .finally(() => setCheckingSession(false));

    return () => {
      isActive = false;
    };
  }, []);

  const handleLogin = async (userData) => {
    setUser(userData);
    void loadSavedTrips();
  };

  const handleLogout = () => {
    apiLogout();
    setUser(null);
    setSavedTrips([]);
    setActiveTab('home');
  };

  if (checkingSession) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#FAF6F1]">
        <p className="text-[#2D2A26] font-bold text-lg">Loading...</p>
      </div>
    );
  }

  // Guest mode: allow browsing + chatting even without sign-in.
  if (!user) {
    return (
      <div className="flex h-screen w-full bg-[#FAF6F1] font-sans selection:bg-[#E8734A] selection:text-white text-[#2D2A26] overflow-hidden">
        {/* Sidebar needs a user prop; pass null and show fallback avatar/name */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={null} />

        <main className="flex-1 h-full flex flex-col relative overflow-hidden">
          {activeTab === 'home' && <HomeScreen navigateTo={setActiveTab} />}
          {activeTab === 'explore' && <ExploreScreen />}
          {activeTab === 'chat' && <ChatScreen savedTrips={savedTrips} setSavedTrips={setSavedTrips} />}
          {activeTab === 'trips' && <TripsScreen savedTrips={savedTrips} />}
          {activeTab === 'profile' && <AuthScreen onLogin={handleLogin} />}
        </main>
      </div>
    );
  }


  return (
    <div className="flex h-screen w-full bg-[#FAF6F1] font-sans selection:bg-[#E8734A] selection:text-white text-[#2D2A26] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      <main className="flex-1 h-full flex flex-col relative overflow-hidden">
        {activeTab === 'home' && <HomeScreen navigateTo={setActiveTab} />}
        {activeTab === 'explore' && <ExploreScreen />}
        {activeTab === 'chat' && <ChatScreen savedTrips={savedTrips} setSavedTrips={setSavedTrips} />}
        {activeTab === 'trips' && <TripsScreen savedTrips={savedTrips} />}
        {activeTab === 'profile' && (
          <ProfileScreen onLogout={handleLogout} user={user} setUser={setUser} setActiveTab={setActiveTab} />
        )}
      </main>
    </div>
  );
}
