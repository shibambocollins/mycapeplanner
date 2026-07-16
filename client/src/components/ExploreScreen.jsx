import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Compass, MapPin, Sun, Heart, Camera, Star } from 'lucide-react';
import { theme } from '../theme';
import { MAP_ATTRACTIONS, CAPE_TOWN_CENTER } from '../data/mockData.jsx';

const ICONS = {
  compass: Compass,
  mapPin: MapPin,
  sun: Sun,
  heart: Heart,
  camera: Camera,
};

// Builds a colored circular pin (matching the original design) as a Leaflet divIcon,
// using the same lucide-react icon rendered to static SVG markup.
const buildPinIcon = (spot) => {
  const IconComponent = ICONS[spot.iconName] || MapPin;
  const iconSvg = renderToStaticMarkup(<IconComponent size={20} color="white" />);

  const html = `
    <div style="
      width: 40px; height: 40px;
      background: ${spot.color};
      border-radius: 9999px;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.25);
      border: 2px solid white;
    ">
      ${iconSvg}
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

const ExploreScreen = () => {
  return (
    <div className="flex-1 p-10 bg-[#FAF6F1] flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#2D2A26]">Live Map</h1>
        <p className="text-gray-500 font-medium">Cape Town Top Attractions</p>
      </div>

      <div className="flex-1 relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-gray-200">
        <MapContainer
          center={[CAPE_TOWN_CENTER.lat, CAPE_TOWN_CENTER.lng]}
          zoom={12}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {MAP_ATTRACTIONS.map((spot) => (
            <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={buildPinIcon(spot)}>
              <Popup>
                <div className="w-56">
                  <div className="w-full h-28 rounded-xl overflow-hidden relative mb-3">
                    <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star size={12} color={theme.colors.accent} fill={theme.colors.accent} />
                      <span className="text-xs font-bold">{spot.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-base mb-1">{spot.name}</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Highly rated tourist attraction. Perfect for your Cape Town itinerary.
                  </p>
                  <button className="w-full py-2 bg-[#146B71] text-white rounded-lg text-xs font-bold hover:bg-[#0f5257] transition-colors">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ExploreScreen;
