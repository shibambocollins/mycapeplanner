import React from 'react';
import { Home, MessageCircle, Map as MapIcon, Compass, User } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'explore', icon: Compass, label: 'Live Map' },
    { id: 'chat', icon: MessageCircle, label: 'AI Planner' },
    { id: 'trips', icon: MapIcon, label: 'My Itineraries' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-100 flex flex-col h-full z-20 shadow-sm shrink-0">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#E8734A] rounded-xl flex items-center justify-center shadow-md">
          <Compass size={24} color="white" strokeWidth={2} />
        </div>
        <h1 className="text-xl font-bold text-[#2D2A26] tracking-tight">MyCapePlanner</h1>
      </div>

      <div className="flex flex-col gap-2 px-4 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-semibold ${
              activeTab === tab.id ? 'bg-[#146B71]/10 text-[#146B71]' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <tab.icon size={20} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-sm font-bold text-[#2D2A26] truncate">{user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-500">{user ? 'Pro Explorer' : 'Sign in for saved trips'}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
