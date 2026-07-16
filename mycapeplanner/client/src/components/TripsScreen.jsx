import React from 'react';
import { Bookmark } from 'lucide-react';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';

const TripsScreen = ({ savedTrips }) => {
  return (
    <div className="flex-1 p-10 bg-[#FAF6F1] overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2D2A26] mb-8">My Itineraries</h1>

        {savedTrips.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-[#146B71]/10 rounded-full flex items-center justify-center mb-6">
              <Bookmark size={32} color="#146B71" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D2A26] mb-3">No saved itineraries</h2>
            <p className="text-gray-500 max-w-md">
              Chat with Cape Companion to generate personalized trip plans, then click 'Save Trip' to store them here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {savedTrips.map((trip, idx) => (
              <div key={trip.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E8734A]/10 text-[#E8734A] rounded-xl flex items-center justify-center font-bold text-xl">
                      #{idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#2D2A26]">Saved Trip Plan</h3>
                      <p className="text-sm text-gray-500">
                        {trip.createdAt ? new Date(trip.createdAt).toLocaleDateString() : ''}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{renderFormattedText(trip.text)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripsScreen;
