'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Users, Check, X, Star, Menu, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface ServiceCategory {
  id: number;
  category: string;
  items: ServiceItem[];
}

interface Provider {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
}

interface Reservation {
  id: number;
  provider: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const services: ServiceCategory[] = [
    { 
      id: 1, 
      category: 'Nettoyage Auto',
      items: [
        { id: 101, name: 'Lavage Standard', price: '20€', duration: '30 min', description: 'Lavage extérieur et séchage' },
        { id: 102, name: 'Lavage Premium', price: '40€', duration: '1h', description: 'Lavage extérieur, intérieur et séchage' },
        { id: 103, name: 'Lavage Complet', price: '60€', duration: '1h30', description: 'Lavage extérieur, intérieur, vitres, et cire protectrice' }
      ]
    },
    { 
      id: 2, 
      category: 'Ménage',
      items: [
        { id: 201, name: 'Ménage Standard', price: '25€', duration: '2h', description: 'Nettoyage complet de la maison' },
        { id: 202, name: 'Ménage Premium', price: '45€', duration: '3h', description: 'Nettoyage complet avec repassage' },
        { id: 203, name: 'Grand Ménage', price: '80€', duration: '4h', description: 'Nettoyage en profondeur avec vitres' }
      ]
    }
  ];

  const providers: Provider[] = [
    { id: 1, name: 'Services Pro', rating: 4.8, reviews: 56, location: 'Langon' },
    { id: 2, name: 'Eco Services', rating: 4.6, reviews: 38, location: 'Langon' },
    { id: 3, name: 'Express Services', rating: 4.9, reviews: 72, location: 'Saint-Macaire' }
  ];

  const reservations: Reservation[] = [
    { 
      id: 1, 
      provider: 'Services Pro', 
      service: 'Ménage Premium', 
      date: 'Lun 20 Mai', 
      time: '14:00', 
      status: 'confirmé' 
    }
  ];

  const availableDates = [
    { date: 'Lun 20 Mai', slots: ['09:00', '11:00', '14:00', '16:00'] },
    { date: 'Mar 21 Mai', slots: ['10:00', '13:00', '15:00', '17:00'] },
    { date: 'Mer 22 Mai', slots: ['09:00', '12:00', '14:00', '16:00'] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-100 text-gray-800 p-3 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative">
              <Image 
                src="/SERVI.png" 
                alt="SERVI Logo" 
                fill
                className="object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <span className="text-xs mt-1">Administration</span>
          </div>
          <button className="p-2 text-gray-600"><Menu size={24} /></button>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white p-3 shadow sticky top-[72px] z-40">
        <div className="flex space-x-2">
          {['Services', 'Prestataires', 'Réservations'].map((tab, index) => (
            <button 
              key={index}
              className={`flex-1 py-2 px-3 rounded-lg text-sm ${selectedTab === index ? 'bg-gray-100 text-gray-800' : 'bg-gray-50'}`}
              onClick={() => setSelectedTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white rounded-lg shadow">
          {selectedTab === 0 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Gestion des services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(category => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <h3 className="font-medium text-lg mb-3">{category.category}</h3>
                    <div className="space-y-3">
                      {category.items.map(service => (
                        <div key={service.id} className="border rounded p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                              <div className="flex items-center mt-2">
                                <Clock size={14} className="text-gray-500 mr-1" />
                                <span className="text-sm text-gray-500">{service.duration}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">{service.price}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 1 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Gestion des prestataires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {providers.map(provider => (
                  <div key={provider.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{provider.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin size={14} className="mr-1" /> {provider.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Star className="text-yellow-400 w-4 h-4 mr-1" />
                          <span>{provider.rating}</span>
                          <span className="ml-1">({provider.reviews} avis)</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                          <Check size={20} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 2 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Gestion des réservations</h2>
              <div className="grid grid-cols-1 gap-4">
                {reservations.map(reservation => (
                  <div key={reservation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium text-lg">{reservation.service}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${reservation.status === 'confirmé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {reservation.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Prestataire:</span> {reservation.provider}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <Calendar size={14} className="mr-1" /> {reservation.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Clock size={14} className="mr-1" /> {reservation.time}
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        Confirmer
                      </button>
                      <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                        Annuler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 