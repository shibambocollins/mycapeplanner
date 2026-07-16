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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCheckingSession(false);
      return;
    }

    getMe()
      .then(async (userData) => {
        setUser(userData);
        try {
          const trips = await getItineraries();
          setSavedTrips(trips);
        } catch (e) {
          console.error('Failed to load itineraries', e);
        }
      })
      .catch(() => {
        apiLogout();
      })
      .finally(() => setCheckingSession(false));
  }, []);

  const handleLogin = async (userData) => {
    setUser(userData);
    try {
      const trips = await getItineraries();
      setSavedTrips(trips);
    } catch (e) {
      console.error('Failed to load itineraries', e);
    }
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

  if (!user) {
    return <AuthScreen onLogin={handleLogin} />;
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
