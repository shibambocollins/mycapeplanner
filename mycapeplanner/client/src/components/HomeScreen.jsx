import React, { useState } from "react";
import { Search, ChevronRight, Star, Heart, Clock } from "lucide-react";
import { theme } from "../theme";
import {
  CATEGORIES,
  SUGGESTED_TRIPS,
  CATEGORY_DATA,
} from "../data/mockData.jsx";

const HomeScreen = ({ navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const displayedTrips = activeCategory
    ? CATEGORY_DATA[activeCategory] || []
    : SUGGESTED_TRIPS;

  return (
    <div className="flex-1 overflow-y-auto p-10 pb-28 hide-scrollbar bg-[#FAF6F1]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#2D2A26]">
            Ready to explore?
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Let's plan your perfect Cape Town day.
          </p>
        </div>
      </div>

      {/* Hero Search */}
      <div
        className="relative w-full h-72 rounded-[32px] overflow-hidden mb-12 shadow-md cursor-pointer group"
        onClick={() => navigateTo("chat")}
      >
        <img
          src="/images/image1.jpg"
          alt="Cape Town"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
          <h2 className="text-white text-3xl font-bold mb-4">
            What's your vibe today?
          </h2>
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 flex items-center gap-3 w-full transition-colors hover:bg-white/30">
            <Search size={24} color="white" />
            <span className="text-white text-lg font-medium">
              Chat with your local AI chatbot to plan a trip of your lifetime....
            </span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#2D2A26]">Categories</h3>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="text-sm font-bold text-[#146B71] hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-5 gap-6 pb-6 pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className="flex flex-col items-center gap-4 group transition-all"
            >
              <div
                className={`w-full aspect-square rounded-[32px] flex items-center justify-center shadow-sm transition-all duration-300 ${cat.bg} ${
                  activeCategory === cat.id
                    ? "ring-4 ring-[#146B71] scale-110"
                    : "group-hover:scale-105 hover:shadow-md"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`text-base font-bold transition-colors ${activeCategory === cat.id ? "text-[#146B71]" : "text-[#2D2A26]"}`}
              >
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Recommendations */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#2D2A26]">
            {activeCategory
              ? `${CATEGORIES.find((c) => c.id === activeCategory)?.name} Experiences`
              : "Curated for you"}
          </h3>
          {!activeCategory && (
            <button
              onClick={() => navigateTo("explore")}
              className="text-[#146B71] text-sm font-bold flex items-center hover:underline"
            >
              View map <ChevronRight size={18} />
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col cursor-pointer"
            >
              <div className="w-full h-48 rounded-2xl overflow-hidden relative mb-4">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-2 text-[#2D2A26]">
                    {trip.title}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Star
                      size={14}
                      color={theme.colors.accent}
                      fill={theme.colors.accent}
                    />
                    <span className="font-bold text-gray-700">
                      {trip.rating}
                    </span>
                    <span>•</span>
                    <Clock size={14} />
                    <span>{trip.duration}</span>
                  </div>
                </div>
                <div className="text-[#146B71] font-bold text-lg">
                  {trip.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
