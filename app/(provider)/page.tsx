'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Users, Check, X, Star, Menu, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface Reservation {
  id: number;
  client: string;
  service: string;
  date: string;
  time: string;
  status: string;
}

const ProviderDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [reservations, setReservations] = useState<Reservation[]>([
    { 
      id: 1, 
      client: 'Thomas D.', 
      service: 'Lavage Premium', 
      date: 'Mar 21 Mai', 
      time: '14:00',
      status: 'En attente'
    },
    { 
      id: 2, 
      client: 'Marie L.', 
      service: 'Lavage Standard', 
      date: 'Mer 22 Mai', 
      time: '10:00',
      status: 'En attente'
    }
  ]);

  const services: Service[] = [
    { id: 1, name: 'Lavage Standard', price: '20€', duration: '30 min', description: 'Lavage extérieur et séchage' },
    { id: 2, name: 'Lavage Premium', price: '40€', duration: '1h', description: 'Lavage extérieur, intérieur et séchage' },
    { id: 3, name: 'Lavage Complet', price: '60€', duration: '1h30', description: 'Lavage extérieur, intérieur, vitres, et cire protectrice' }
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
            <span className="text-xs mt-1">Prestataire</span>
          </div>
          <button className="p-2 text-gray-600"><Menu size={24} /></button>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white p-3 shadow sticky top-[72px] z-40">
        <div className="flex space-x-2">
          {['Réservations', 'Disponibilités', 'Services', 'Profil'].map((tab, index) => (
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
              <h2 className="text-xl font-semibold mb-4">Réservations à venir</h2>
              {reservations.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {reservations.map(reservation => (
                    <div key={reservation.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{reservation.service}</h3>
                        <div className="flex space-x-2">
                          <button className="p-1 text-green-600 bg-green-100 rounded-full" title="Accepter">
                            <Check size={16} />
                          </button>
                          <button className="p-1 text-red-600 bg-red-100 rounded-full" title="Refuser">
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Client:</span> {reservation.client}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar size={14} className="mr-1" /> {reservation.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Clock size={14} className="mr-1" /> {reservation.time}
                      </div>
                      <button className="px-3 py-1.5 border border-blue-600 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100 w-full">
                        Contacter le client
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune réservation en attente</p>
              )}
            </div>
          )}

          {selectedTab === 1 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Mes disponibilités</h2>
              <div className="space-y-4">
                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'].map((jour, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">{jour}</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded p-2">
                        <p className="text-sm">Matin: 9h00 - 12h00</p>
                      </div>
                      <div className="border rounded p-2">
                        <p className="text-sm">Après-midi: 14h00 - 18h00</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 2 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Mes services</h2>
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{service.price}</p>
                        <p className="text-sm text-gray-500">{service.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600">
                  + Ajouter un service
                </button>
              </div>
            </div>
          )}

          {selectedTab === 3 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Informations professionnelles</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-sm text-gray-600">Nom de l'entreprise</label>
                      <input type="text" className="w-full p-2 border rounded mt-1" value="Auto Clean Pro" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Description</label>
                      <textarea className="w-full p-2 border rounded mt-1 h-24" defaultValue="Service de lavage auto professionnel à domicile. Respect de l'environnement, produits écologiques."></textarea>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Téléphone professionnel</label>
                      <input type="tel" className="w-full p-2 border rounded mt-1" value="05 56 78 90 12" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Email professionnel</label>
                      <input type="email" className="w-full p-2 border rounded mt-1" value="contact@autocleanpro.fr" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard; 