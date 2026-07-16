import React, { useRef } from 'react';
import { Camera, ChevronRight, LogOut, Bookmark } from 'lucide-react';

const ProfileScreen = ({ onLogout, user, setUser, setActiveTab }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, avatar: imageUrl });
    }
  };

  return (
    <div className="flex-1 p-10 bg-[#FAF6F1] overflow-y-auto">
      <h1 className="text-3xl font-bold text-[#2D2A26] mb-8">Profile</h1>
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-2xl">
        <div className="flex items-center gap-6 mb-8">
          <div
            className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden shrink-0 group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={24} color="white" />
            </div>
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          <div>
            <h2 className="text-2xl font-bold text-[#2D2A26]">{user?.name || 'Alex Johnson'}</h2>
            <p className="text-gray-500 text-lg">{user?.email || 'Alex@example.com'}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8 border-t border-gray-100 pt-8">
          <button
            onClick={() => setActiveTab('trips')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors border border-gray-100 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#146B71]/10 flex items-center justify-center group-hover:bg-[#146B71]/20 transition-colors">
                <Bookmark size={24} color="#146B71" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-[16px] text-[#2D2A26]">Saved Itineraries</span>
                <span className="block text-sm text-gray-500">View and manage your trip plans</span>
              </div>
            </div>
            <ChevronRight size={20} color="#D1D5DB" className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <button
          onClick={onLogout}
          className="bg-[#E8734A]/10 text-[#E8734A] px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#E8734A]/20 transition-colors w-full sm:w-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
