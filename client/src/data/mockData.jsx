import React from 'react';
import { Compass, MapPin, Utensils, Moon, Heart } from 'lucide-react';
import { theme } from '../theme';

export const CATEGORIES = [
  { id: 'adventure', name: 'Adventure', icon: <Compass size={32} color={theme.colors.categories.adventure} strokeWidth={1.5} />, bg: 'bg-orange-100' },
  { id: 'culture', name: 'Culture', icon: <MapPin size={32} color={theme.colors.categories.culture} strokeWidth={1.5} />, bg: 'bg-teal-100' },
  { id: 'food', name: 'Food', icon: <Utensils size={32} color={theme.colors.categories.food} strokeWidth={1.5} />, bg: 'bg-red-100' },
  { id: 'nightlife', name: 'Nightlife', icon: <Moon size={32} color={theme.colors.categories.nightlife} strokeWidth={1.5} />, bg: 'bg-purple-100' },
  { id: 'family', name: 'Family', icon: <Heart size={32} color={theme.colors.categories.family} strokeWidth={1.5} />, bg: 'bg-green-100' },
];
export const SUGGESTED_TRIPS = [
  { id: 1, title: 'Cape Peninsula Tour', duration: 'Full Day', price: 'R850', rating: 4.9, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Winelands Escape', duration: '6 Hours', price: 'R600', rating: 4.8, image: '/images/winelands.jpg' },
  { id: 3, title: 'Table Mountain Hike', duration: '4 Hours', price: 'R200', rating: 4.9, image: '/images/tablemountain.jpg' },
];

export const CATEGORY_DATA = {
  adventure: [
    { id: 'a1', title: 'Signal Hill Paragliding', duration: '1.5 Hours', price: 'R1,500', rating: 4.9, image: '/images/signallhill.jpg' },
    { id: 'a2', title: 'Muizenberg Surfing', duration: 'Half Day', price: 'R350', rating: 4.7, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop' },
    { id: 'a3', title: 'Sea Point Kayaking', duration: '2 Hours', price: 'R450', rating: 4.8, image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop' },
  ],
  culture: [
    { id: 'c1', title: 'Zeitz MOCAA Museum', duration: '2-3 Hours', price: 'R250', rating: 4.8, image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800&auto=format&fit=crop' },
    { id: 'c2', title: 'Bo-Kaap Walking Tour', duration: '2 Hours', price: 'R200', rating: 4.7, image: '/images/bo-kaap.jpg' },
    { id: 'c3', title: 'District Six Museum', duration: '1.5 Hours', price: 'R150', rating: 4.8, image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=800&auto=format&fit=crop' },
  ],
  food: [
    { id: 'f1', title: 'Oranjezicht Farm Market', duration: 'Morning', price: 'Free Entry', rating: 4.8, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=800&auto=format&fit=crop' },
    { id: 'f2', title: 'Kalkys Fish & Chips', duration: '1 Hour', price: 'R150', rating: 4.6, image: '/images/fish&chips.jpg' },
    { id: 'f3', title: 'Wine Tasting in Franschhoek', duration: 'Full Day', price: 'R900', rating: 5.0, image: '/images/winelands.jpg' },
  ],
  nightlife: [
    { id: 'n1', title: 'The Secret Gin Bar', duration: 'Evening', price: 'R300', rating: 4.8, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop' },
    { id: 'n2', title: 'Cafe Caprice Sunset', duration: 'Late Afternoon', price: 'R400', rating: 4.6, image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=800&auto=format&fit=crop' },
    { id: 'n3', title: 'Long Street Bar Crawl', duration: 'Night', price: 'Flexible', rating: 4.5, image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?q=80&w=800&auto=format&fit=crop' },
  ],
  family: [
    { id: 'fa1', title: 'Two Oceans Aquarium', duration: '2 Hours', price: 'R220', rating: 4.8, image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=800&auto=format&fit=crop' },
    { id: 'fa2', title: 'Boulders Beach Penguins', duration: '2 Hours', price: 'R170', rating: 4.9, image: 'https://images.unsplash.com/photo-1598439119086-35655b8c333d?q=80&w=800&auto=format&fit=crop' },
    { id: 'fa3', title: 'Kirstenbosch Gardens', duration: 'Half Day', price: 'R210', rating: 4.9, image: '/images/kirtsenbosch.jpg' },
  ],
};

export const MAP_ATTRACTIONS = [
  { id: 1, name: 'V&A Waterfront', lat: -33.9036, lng: 18.4216, color: '#146B71', rating: 4.8, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=400&auto=format&fit=crop', iconName: 'compass' },
  { id: 2, name: 'Table Mountain', lat: -33.9628, lng: 18.4098, color: '#E8734A', rating: 4.9, image: '/images/tablemountain.jpg', iconName: 'mapPin' },
  { id: 3, name: 'Camps Bay', lat: -33.9560, lng: 18.3776, color: '#F4B942', rating: 4.7, image: 'https://images.unsplash.com/photo-1563604082-90117b35f2fc?q=80&w=400&auto=format&fit=crop', iconName: 'sun' },
  { id: 4, name: 'Kirstenbosch', lat: -33.9884, lng: 18.4322, color: '#84CC16', rating: 4.9, image: '/images/kirtsenbosch.jpg', iconName: 'heart' },
  { id: 5, name: 'Boulders Beach', lat: -34.1966, lng: 18.4321, color: '#146B71', rating: 4.9, image: 'https://images.unsplash.com/photo-1598439119086-35655b8c333d?q=80&w=400&auto=format&fit=crop', iconName: 'camera' },
];

export const CAPE_TOWN_CENTER = { lat: -33.9575, lng: 18.4241 };

export const INITIAL_CHAT = [
  { id: 1, type: 'bot', text: "Hi there! I'm your local Cape Town companion. Are you looking to plan a trip today?", time: '10:00 AM' },
  { id: 2, type: 'bot', component: 'quickReplies', options: ['Plan a 5-day luxury trip', 'Find a restaurant', 'Explore beaches'] },
];