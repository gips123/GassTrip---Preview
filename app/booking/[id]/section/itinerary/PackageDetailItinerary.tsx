'use client';

import React, { useState } from 'react';
import { Clock, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface PackageDetailItineraryProps {
  packageId: string;
}

const PackageDetailItinerary: React.FC<PackageDetailItineraryProps> = ({ packageId }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  // Mock data - in real app, fetch from API
  const itinerary = [
    {
      day: 1,
      title: "Arrival & Ubud Exploration",
      date: "Day 1",
      activities: [
        {
          time: "08:00",
          title: "Hotel Pickup",
          description: "Pickup from your hotel in Denpasar or Sanur area",
          location: "Denpasar/Sanur",
          duration: "30 minutes"
        },
        {
          time: "09:00",
          title: "Visit Tanah Lot Temple",
          description: "Explore the iconic sea temple and witness the stunning ocean views",
          location: "Tanah Lot, Tabanan",
          duration: "2 hours"
        },
        {
          time: "12:00",
          title: "Traditional Balinese Lunch",
          description: "Enjoy authentic Balinese cuisine at a local restaurant",
          location: "Ubud",
          duration: "1 hour"
        },
        {
          time: "14:00",
          title: "Tegallalang Rice Terraces",
          description: "Walk through the famous rice terraces and learn about traditional farming",
          location: "Tegallalang, Ubud",
          duration: "2 hours"
        },
        {
          time: "17:00",
          title: "Ubud Monkey Forest",
          description: "Visit the sacred monkey forest and interact with friendly monkeys",
          location: "Ubud Monkey Forest",
          duration: "1 hour"
        }
      ]
    },
    {
      day: 2,
      title: "Cultural Immersion & Beach Time",
      date: "Day 2",
      activities: [
        {
          time: "08:00",
          title: "Traditional Balinese Cooking Class",
          description: "Learn to cook authentic Balinese dishes with local ingredients",
          location: "Ubud Cooking School",
          duration: "3 hours"
        },
        {
          time: "12:00",
          title: "Lunch with Cooking Class",
          description: "Enjoy the dishes you prepared during the cooking class",
          location: "Ubud Cooking School",
          duration: "1 hour"
        },
        {
          time: "14:00",
          title: "Visit Ubud Art Market",
          description: "Shop for local handicrafts, textiles, and souvenirs",
          location: "Ubud Art Market",
          duration: "1.5 hours"
        },
        {
          time: "16:00",
          title: "Jimbaran Beach Sunset",
          description: "Relax at Jimbaran Beach and enjoy the famous sunset",
          location: "Jimbaran Beach",
          duration: "2 hours"
        }
      ]
    },
    {
      day: 3,
      title: "Adventure & Departure",
      date: "Day 3",
      activities: [
        {
          time: "08:00",
          title: "Mount Batur Sunrise Trek",
          description: "Early morning trek to Mount Batur for spectacular sunrise views",
          location: "Mount Batur, Kintamani",
          duration: "4 hours"
        },
        {
          time: "12:00",
          title: "Breakfast at Mount Batur",
          description: "Enjoy breakfast with panoramic views of the volcano",
          location: "Mount Batur Summit",
          duration: "1 hour"
        },
        {
          time: "14:00",
          title: "Tirta Empul Temple",
          description: "Visit the holy water temple and participate in purification ritual",
          location: "Tirta Empul, Tampaksiring",
          duration: "1.5 hours"
        },
        {
          time: "16:00",
          title: "Return to Hotel",
          description: "Transfer back to your hotel or airport",
          location: "Denpasar/Sanur",
          duration: "1 hour"
        }
      ]
    }
  ];

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Itinerary</h2>
      
      <div className="space-y-4">
        {itinerary.map((day) => (
          <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  {day.day}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-900">{day.title}</h3>
                  <p className="text-gray-600">{day.date}</p>
                </div>
              </div>
              {expandedDay === day.day ? (
                <ChevronUp className="w-6 h-6 text-gray-600" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-600" />
              )}
            </button>
            
            {/* Day Activities */}
            {expandedDay === day.day && (
              <div className="p-6 bg-white">
                <div className="space-y-6">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      {/* Time */}
                      <div className="flex-shrink-0 w-20">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold text-center">
                          {activity.time}
                        </div>
                      </div>
                      
                      {/* Activity Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{activity.title}</h4>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="w-4 h-4 mr-1" />
                            {activity.duration}
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{activity.description}</p>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackageDetailItinerary;
