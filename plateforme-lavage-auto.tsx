import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Users, Check, X, Star, Menu, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Provider {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
}

interface Reservation {
  id: number;
  client?: string;
  provider?: string;
  service: string;
  date: string;
  time: string;
  status?: string;
}

const App = () => {
  const [activeView, setActiveView] = useState('client');
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedPrestataireTab, setSelectedPrestataireTab] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  
  const services = [
    { id: 1, name: 'Lavage Standard', price: '20€', duration: '30 min', description: 'Lavage extérieur et séchage' },
    { id: 2, name: 'Lavage Premium', price: '40€', duration: '1h', description: 'Lavage extérieur, intérieur et séchage' },
    { id: 3, name: 'Lavage Complet', price: '60€', duration: '1h30', description: 'Lavage extérieur, intérieur, vitres, et cire protectrice' }
  ];
  
  const availableDates = [
    { date: 'Lun 20 Mai', slots: ['09:00', '11:00', '14:00', '16:00'] },
    { date: 'Mar 21 Mai', slots: ['10:00', '13:00', '15:00', '17:00'] },
    { date: 'Mer 22 Mai', slots: ['09:00', '12:00', '14:00', '16:00'] },
  ];
  
  const prestataires = [
    { id: 1, name: 'Auto Clean Pro', rating: 4.8, reviews: 56, location: 'Langon' },
    { id: 2, name: 'Eco Lavage Mobile', rating: 4.6, reviews: 38, location: 'Langon' },
    { id: 3, name: 'Express Car Wash', rating: 4.9, reviews: 72, location: 'Saint-Macaire' }
  ];
  
  const reservations: Reservation[] = [
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
  ];
  
  const displayedReservations: Reservation[] = activeView === 'client' ? 
    [{ 
      id: 1, 
      provider: 'Auto Clean Pro', 
      service: 'Lavage Premium', 
      date: 'Lun 20 Mai', 
      time: '14:00', 
      status: 'confirmé' 
    }] : 
    reservations;
  
  // Disponibilités du prestataire
  const prestataireDispo = [
    { jour: 'Lundi', horaires: ['09:00-12:00', '14:00-18:00'] },
    { jour: 'Mardi', horaires: ['09:00-12:00', '14:00-18:00'] },
    { jour: 'Mercredi', horaires: ['09:00-12:00', '14:00-18:00'] },
    { jour: 'Jeudi', horaires: ['09:00-12:00', '14:00-18:00'] },
    { jour: 'Vendredi', horaires: ['09:00-12:00', '14:00-18:00'] },
    { jour: 'Samedi', horaires: ['09:00-13:00'] },
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
            <span className="text-xs mt-1">Car</span>
          </div>
          <button className="p-2 text-gray-600"><Menu size={24} /></button>
        </div>
      </header>
      
      {/* Navigation entre client et prestataire */}
      <div className="bg-white p-3 shadow sticky top-[72px] z-40">
        <div className="flex space-x-2">
          <button 
            className={`flex-1 py-2 px-3 rounded-lg text-sm ${activeView === 'client' ? 'bg-gray-100 text-gray-800' : 'bg-gray-50'}`}
            onClick={() => setActiveView('client')}
          >
            Client
          </button>
          <button 
            className={`flex-1 py-2 px-3 rounded-lg text-sm ${activeView === 'prestataire' ? 'bg-gray-100 text-gray-800' : 'bg-gray-50'}`}
            onClick={() => setActiveView('prestataire')}
          >
            Prestataire
          </button>
        </div>
      </div>
      
      {/* Interface Client */}
      {activeView === 'client' && (
        <div className="flex-1 overflow-auto p-3">
          <div className="bg-white rounded-lg shadow">
            <div className="flex border-b overflow-x-auto">
              {['Réserver', 'Mes Réservations', 'Profil'].map((tab, index) => (
                <button 
                  key={index}
                  className={`px-3 py-2 cursor-pointer font-medium border-b-2 whitespace-nowrap text-sm focus:outline-none ${
                    selectedTab === index ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
                  }`}
                  onClick={() => setSelectedTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {selectedTab === 0 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Réserver un service</h2>
                
                {/* Étape 1: Sélectionner un service */}
                <div className="mb-4">
                  <h3 className="font-medium text-base mb-2">1. Choisissez un service</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {services.map(service => (
                      <div 
                        key={service.id}
                        className={`border rounded-lg p-3 cursor-pointer transition ${selectedService === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        onClick={() => setSelectedService(service.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{service.name}</h4>
                            <p className="text-xs text-gray-600">{service.description}</p>
                          </div>
                          <div className="text-right ml-2">
                            <p className="font-bold text-base">{service.price}</p>
                            <p className="text-xs text-gray-500">{service.duration}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Étape 2: Sélectionner un prestataire */}
                {selectedService && (
                  <div className="mb-4">
                    <h3 className="font-medium text-base mb-2">2. Choisissez un prestataire</h3>
                    {selectedProvider ? (
                      <div className="border rounded-lg p-4 bg-white">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-medium text-lg">{selectedProvider.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin size={14} className="mr-1" /> {selectedProvider.location}
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedProvider(null)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Star className="text-yellow-400 w-4 h-4" />
                            <span className="ml-1 text-sm font-medium">{selectedProvider.rating}</span>
                            <span className="ml-1 text-sm text-gray-500">({selectedProvider.reviews} avis)</span>
                          </div>
                          
                          <div className="border-t pt-3">
                            <h5 className="font-medium text-sm mb-2">Horaires d'ouverture</h5>
                            <div className="text-sm text-gray-600">
                              <p>Lundi - Vendredi: 9h00 - 18h00</p>
                              <p>Samedi: 9h00 - 13h00</p>
                              <p>Dimanche: Fermé</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <h5 className="font-medium text-sm mb-2">Services proposés</h5>
                            <div className="text-sm text-gray-600">
                              <p>• Lavage extérieur</p>
                              <p>• Lavage intérieur</p>
                              <p>• Nettoyage des vitres</p>
                              <p>• Cire protectrice</p>
                            </div>
                          </div>
                          
                          <div className="border-t pt-3">
                            <h5 className="font-medium text-sm mb-2">À propos</h5>
                            <p className="text-sm text-gray-600">
                              Service professionnel de lavage auto à domicile. 
                              Nous utilisons des produits écologiques et respectueux de l'environnement.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {prestataires.map(prestataire => (
                          <div key={prestataire.id} className="border rounded-lg p-3 hover:border-gray-300 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{prestataire.name}</h4>
                                <div className="flex items-center text-xs text-gray-600">
                                  <MapPin size={12} className="mr-1" /> {prestataire.location}
                                </div>
                              </div>
                              <div className="text-right ml-2">
                                <div className="flex items-center justify-end">
                                  <Star className="text-yellow-400 w-3 h-3" />
                                  <span className="ml-1 text-xs font-medium">{prestataire.rating}</span>
                                  <span className="ml-1 text-xs text-gray-500">({prestataire.reviews})</span>
                                </div>
                                <button 
                                  className="mt-1 text-gray-600 text-xs flex items-center"
                                  onClick={() => setSelectedProvider(prestataire)}
                                >
                                  Voir détails <ChevronRight size={12} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Étape 3: Sélectionner date et heure */}
                {selectedService && (
                  <div className="mb-4">
                    <h3 className="font-medium text-base mb-2">3. Choisissez une date et une heure</h3>
                    
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-gray-700 mb-2">Date:</h4>
                      <div className="flex overflow-x-auto space-x-2 pb-2 -mx-3 px-3">
                        {availableDates.map(item => (
                          <div 
                            key={item.date}
                            className={`border rounded-lg p-2 flex-shrink-0 cursor-pointer ${selectedDate === item.date ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                            onClick={() => setSelectedDate(item.date)}
                          >
                            <div className="text-center w-16">
                              <div className="text-xs">{item.date}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedDate && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-700 mb-2">Heure:</h4>
                        <div className="grid grid-cols-4 gap-2">
                          {availableDates.find(d => d.date === selectedDate)?.slots.map(time => (
                            <div 
                              key={time}
                              className={`border rounded-lg p-2 text-center cursor-pointer text-sm ${selectedTime === time ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Bouton de confirmation */}
                {selectedService && selectedDate && selectedTime && (
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Confirmer la réservation
                  </button>
                )}
              </div>
            )}

            {selectedTab === 1 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
                {displayedReservations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {displayedReservations.map(reservation => (
                      <div key={reservation.id} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium text-lg">{reservation.service}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${reservation.status === 'confirmé' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {reservation.status || 'En attente'}
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
                          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-100">
                            Annuler
                          </button>
                          <button className="px-3 py-1.5 border border-blue-600 bg-blue-50 text-blue-600 rounded text-sm hover:bg-blue-100">
                            Contact
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Vous n'avez pas encore de réservations
                  </div>
                )}
              </div>
            )}

            {selectedTab === 2 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Informations personnelles</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">Nom</label>
                        <input type="text" className="w-full p-2 border rounded mt-1" value="Dupont" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Prénom</label>
                        <input type="text" className="w-full p-2 border rounded mt-1" value="Jean" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Email</label>
                        <input type="email" className="w-full p-2 border rounded mt-1" value="jean.dupont@email.com" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Téléphone</label>
                        <input type="tel" className="w-full p-2 border rounded mt-1" value="06 12 34 56 78" readOnly />
                      </div>
                    </div>
                    <button className="mt-3 text-blue-600 text-sm">Modifier</button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Mes véhicules</h3>
                    <div className="border rounded p-3 mb-2">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">Renault Clio</p>
                          <p className="text-sm text-gray-600">AA-123-BB</p>
                        </div>
                        <button className="text-blue-600 text-sm">Modifier</button>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm flex items-center">
                      + Ajouter un véhicule
                    </button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Moyens de paiement</h3>
                    <div className="border rounded p-3 mb-2">
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-blue-700 rounded mr-2"></div>
                          <p>**** **** **** 4242</p>
                        </div>
                        <button className="text-gray-500 text-sm">Supprimer</button>
                      </div>
                    </div>
                    <button className="text-blue-600 text-sm flex items-center">
                      + Ajouter un moyen de paiement
                    </button>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Sauvegarder les modifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Interface Prestataire */}
      {activeView === 'prestataire' && (
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow">
            <div className="flex border-b">
              {['Réservations', 'Disponibilités', 'Services', 'Profil'].map((tab, index) => (
                <button 
                  key={index}
                  className={`px-4 py-2 cursor-pointer font-medium border-b-2 focus:outline-none ${
                    selectedPrestataireTab === index ? 'text-blue-600 border-blue-600' : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
                  }`}
                  onClick={() => setSelectedPrestataireTab(index)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {selectedPrestataireTab === 0 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Réservations à venir</h2>
                {displayedReservations.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {displayedReservations.map(reservation => (
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
                  <div className="text-center py-8 text-gray-500">
                    Vous n'avez pas encore de réservations
                  </div>
                )}
              </div>
            )}

            {selectedPrestataireTab === 1 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Gérer mes disponibilités</h2>
                <div className="space-y-4">
                  {prestataireDispo.map((jour, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{jour.jour}</h3>
                        <div className="relative inline-block w-12 h-6">
                          <input type="checkbox" defaultChecked={jour.horaires.length > 0} className="opacity-0 w-0 h-0" />
                          <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full ${jour.horaires.length > 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></span>
                        </div>
                      </div>
                      
                      {jour.horaires.length > 0 && (
                        <div className="space-y-2">
                          {jour.horaires.map((horaire, hIndex) => (
                            <div key={hIndex} className="flex items-center space-x-2">
                              <div className="flex-1 flex items-center space-x-2">
                                <div className="border rounded p-2 w-24 text-center text-sm">
                                  {horaire.split('-')[0]}
                                </div>
                                <span>à</span>
                                <div className="border rounded p-2 w-24 text-center text-sm">
                                  {horaire.split('-')[1]}
                                </div>
                              </div>
                              <button className="text-red-500">
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          <button className="text-blue-600 text-sm mt-2">
                            + Ajouter une plage horaire
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Enregistrer les disponibilités
                  </button>
                </div>
              </div>
            )}

            {selectedPrestataireTab === 2 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Gérer mes services</h2>
                <div className="space-y-4">
                  {services.map(service => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="font-bold">{service.price}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                      <p className="text-sm text-gray-600 mb-3">Durée: {service.duration}</p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-100">
                          Modifier
                        </button>
                        <button className="px-3 py-1.5 border border-red-600 bg-red-50 text-red-600 rounded text-sm hover:bg-red-100">
                          Désactiver
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border rounded-lg p-4 border-dashed border-gray-300 text-center cursor-pointer hover:bg-gray-50">
                    <div className="py-4">
                      <p className="font-medium text-blue-600">+ Ajouter un nouveau service</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedPrestataireTab === 3 && (
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Mon profil prestataire</h2>
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
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Zone d'intervention</h3>
                    <div className="mb-2">
                      <label className="block text-sm text-gray-600">Rayon d'intervention</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>5 km</option>
                        <option>10 km</option>
                        <option selected>15 km</option>
                        <option>20 km</option>
                        <option>25 km</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Adresse principale</label>
                      <input type="text" className="w-full p-2 border rounded mt-1" value="12 rue de la Paix, 33210 Langon" />
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Informations bancaires</h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm text-gray-600">IBAN</label>
                        <input type="text" className="w-full p-2 border rounded mt-1" value="FR76 1234 5678 9012 3456 7890 123" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Titulaire du compte</label>
                        <input type="text" className="w-full p-2 border rounded mt-1" value="SAS AUTO CLEAN PRO" />
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                    Sauvegarder les modifications
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
