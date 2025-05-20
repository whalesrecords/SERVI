'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Star, Menu, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ServiceItem {
  id: number;
  name: string;
  price: string;
  duration: string;
  description: string;
}

interface SubCategory {
  id: number;
  name: string;
  items: ServiceItem[];
}

interface ServiceCategory {
  id: number;
  category: string;
  subcategories: SubCategory[];
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

const ProviderDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  const services: ServiceCategory[] = [
    { 
      id: 1, 
      category: 'Entretien Auto',
      subcategories: [
        {
          id: 101,
          name: 'Lavage',
          items: [
            { id: 1011, name: 'Lavage Standard', price: '20€', duration: '30 min', description: 'Lavage extérieur et séchage' },
            { id: 1012, name: 'Lavage Premium', price: '40€', duration: '1h', description: 'Lavage extérieur, intérieur et séchage' },
            { id: 1013, name: 'Lavage Complet', price: '60€', duration: '1h30', description: 'Lavage extérieur, intérieur, vitres, et cire protectrice' }
          ]
        },
        {
          id: 102,
          name: 'Détailage',
          items: [
            { id: 1021, name: 'Détailage Intérieur', price: '80€', duration: '2h', description: 'Nettoyage complet intérieur avec produits professionnels' },
            { id: 1022, name: 'Polissage', price: '100€', duration: '2h30', description: 'Polissage complet avec cire longue durée' },
            { id: 1023, name: 'Rénovation Plastiques', price: '50€', duration: '1h', description: 'Rénovation des plastiques intérieurs' }
          ]
        }
      ]
    },
    { 
      id: 2, 
      category: 'Ménage',
      subcategories: [
        {
          id: 201,
          name: 'Nettoyage',
          items: [
            { id: 2011, name: 'Ménage Standard', price: '25€', duration: '2h', description: 'Nettoyage complet de la maison' },
            { id: 2012, name: 'Ménage Premium', price: '45€', duration: '3h', description: 'Nettoyage complet avec repassage' },
            { id: 2013, name: 'Grand Ménage', price: '80€', duration: '4h', description: 'Nettoyage en profondeur avec vitres' }
          ]
        },
        {
          id: 202,
          name: 'Repassage',
          items: [
            { id: 2021, name: 'Repassage Standard', price: '15€', duration: '1h', description: 'Repassage de vêtements' },
            { id: 2022, name: 'Repassage Premium', price: '25€', duration: '1h', description: 'Repassage avec finitions soignées' }
          ]
        },
        {
          id: 203,
          name: 'Spécialisé',
          items: [
            { id: 2031, name: 'Nettoyage Vitres', price: '30€', duration: '1h', description: 'Nettoyage complet des vitres intérieures et extérieures' },
            { id: 2032, name: 'Nettoyage Fini de Chantier', price: '150€', duration: '6h', description: 'Nettoyage complet après travaux' },
            { id: 2033, name: 'Nettoyage Tapis', price: '40€', duration: '1h', description: 'Nettoyage professionnel des tapis' }
          ]
        }
      ]
    },
    {
      id: 3,
      category: 'Jardinage',
      subcategories: [
        {
          id: 301,
          name: 'Entretien',
          items: [
            { id: 3011, name: 'Tonte de pelouse', price: '30€', duration: '1h', description: 'Tonte et ramassage des déchets' },
            { id: 3012, name: 'Entretien jardin', price: '50€', duration: '2h', description: 'Taille, désherbage et arrosage' },
            { id: 3013, name: 'Élagage', price: '80€', duration: '2h', description: 'Taille des arbres et arbustes' }
          ]
        },
        {
          id: 302,
          name: 'Aménagement',
          items: [
            { id: 3021, name: 'Aménagement Paysager', price: '100€', duration: '4h', description: 'Plantation et aménagement paysager' },
            { id: 3022, name: 'Création Potager', price: '150€', duration: '4h', description: 'Installation complète d\'un potager' },
            { id: 3023, name: 'Installation Arrosage', price: '200€', duration: '4h', description: 'Mise en place d\'un système d\'arrosage automatique' }
          ]
        }
      ]
    },
    {
      id: 4,
      category: 'Aide à la personne',
      subcategories: [
        {
          id: 401,
          name: 'Garde d\'enfants',
          items: [
            { id: 4011, name: 'Garde Occasionnelle', price: '15€', duration: '1h', description: 'Garde d\'enfants à domicile' },
            { id: 4012, name: 'Garde Régulière', price: '12€', duration: '1h', description: 'Garde d\'enfants avec engagement' },
            { id: 4013, name: 'Soutien Scolaire', price: '20€', duration: '1h', description: 'Aide aux devoirs et cours particuliers' }
          ]
        },
        {
          id: 402,
          name: 'Aide aux seniors',
          items: [
            { id: 4021, name: 'Accompagnement', price: '20€', duration: '1h', description: 'Accompagnement et aide au quotidien' },
            { id: 4022, name: 'Accompagnement Médical', price: '30€', duration: '1h', description: 'Accompagnement aux rendez-vous médicaux' },
            { id: 4023, name: 'Préparation Repas', price: '25€', duration: '1h', description: 'Préparation de repas équilibrés' }
          ]
        }
      ]
    },
    {
      id: 5,
      category: 'Bricolage',
      subcategories: [
        {
          id: 501,
          name: 'Réparations',
          items: [
            { id: 5011, name: 'Petites réparations', price: '35€', duration: '1h', description: 'Réparations simples et montage' },
            { id: 5012, name: 'Plomberie', price: '70€', duration: '1h', description: 'Réparations plomberie de base' },
            { id: 5013, name: 'Électricité', price: '70€', duration: '1h', description: 'Installations électriques simples' }
          ]
        },
        {
          id: 502,
          name: 'Installation',
          items: [
            { id: 5021, name: 'Installation Meubles', price: '60€', duration: '2h', description: 'Installation de meubles et équipements' },
            { id: 5022, name: 'Peinture', price: '80€', duration: '3h', description: 'Peinture d\'une pièce' },
            { id: 5023, name: 'Rénovation', price: '120€', duration: '4h', description: 'Travaux de rénovation légère' }
          ]
        }
      ]
    },
    {
      id: 6,
      category: 'Cours & Formation',
      subcategories: [
        {
          id: 601,
          name: 'Scolaire',
          items: [
            { id: 6011, name: 'Mathématiques', price: '25€', duration: '1h', description: 'Cours de mathématiques tous niveaux' },
            { id: 6012, name: 'Français', price: '25€', duration: '1h', description: 'Cours de français et littérature' },
            { id: 6013, name: 'Sciences', price: '25€', duration: '1h', description: 'Physique, Chimie, SVT' }
          ]
        },
        {
          id: 602,
          name: 'Langues',
          items: [
            { id: 6021, name: 'Anglais', price: '30€', duration: '1h', description: 'Cours d\'anglais tous niveaux' },
            { id: 6022, name: 'Espagnol', price: '30€', duration: '1h', description: 'Cours d\'espagnol tous niveaux' },
            { id: 6023, name: 'Allemand', price: '30€', duration: '1h', description: 'Cours d\'allemand tous niveaux' }
          ]
        },
        {
          id: 603,
          name: 'Loisirs',
          items: [
            { id: 6031, name: 'Musique', price: '35€', duration: '1h', description: 'Cours de piano, guitare, chant' },
            { id: 6032, name: 'Informatique', price: '30€', duration: '1h', description: 'Bureautique, Programmation, Web' },
            { id: 6033, name: 'Arts', price: '30€', duration: '1h', description: 'Dessin, peinture, sculpture' }
          ]
        }
      ]
    },
    {
      id: 7,
      category: 'Informatique',
      subcategories: [
        {
          id: 701,
          name: 'Dépannage',
          items: [
            { id: 7011, name: 'Dépannage PC', price: '40€', duration: '1h', description: 'Diagnostic et réparation d\'ordinateur' },
            { id: 7012, name: 'Récupération Données', price: '80€', duration: '2h', description: 'Récupération de données perdues' },
            { id: 7013, name: 'Installation Logiciels', price: '30€', duration: '1h', description: 'Installation et configuration de logiciels' }
          ]
        },
        {
          id: 702,
          name: 'Sécurité',
          items: [
            { id: 7021, name: 'Sécurité Informatique', price: '50€', duration: '1h', description: 'Installation antivirus et protection' },
            { id: 7022, name: 'Configuration Réseau', price: '60€', duration: '1h', description: 'Installation et configuration réseau' },
            { id: 7023, name: 'Sauvegarde', price: '40€', duration: '1h', description: 'Mise en place système de sauvegarde' }
          ]
        }
      ]
    },
    {
      id: 8,
      category: 'Décoration',
      subcategories: [
        {
          id: 801,
          name: 'Conseil',
          items: [
            { id: 8011, name: 'Conseil Déco', price: '50€', duration: '1h', description: 'Conseils personnalisés en décoration' },
            { id: 8012, name: 'Rangement', price: '60€', duration: '2h', description: 'Organisation et rangement d\'espaces' },
            { id: 8013, name: 'Feng Shui', price: '70€', duration: '2h', description: 'Conseils en aménagement Feng Shui' }
          ]
        },
        {
          id: 802,
          name: 'Réalisation',
          items: [
            { id: 8021, name: 'Réalisation Déco', price: '80€', duration: '2h', description: 'Mise en place de décoration' },
            { id: 8022, name: 'Création Meubles', price: '150€', duration: '4h', description: 'Fabrication de meubles sur mesure' },
            { id: 8023, name: 'Peinture Décorative', price: '90€', duration: '3h', description: 'Peinture et finitions décoratives' }
          ]
        }
      ]
    },
    {
      id: 9,
      category: 'Bien-être',
      subcategories: [
        {
          id: 901,
          name: 'Massage',
          items: [
            { id: 9011, name: 'Massage Relaxant', price: '60€', duration: '1h', description: 'Massage relaxant à domicile' },
            { id: 9012, name: 'Massage Sportif', price: '70€', duration: '1h', description: 'Massage sportif et récupération' },
            { id: 9013, name: 'Réflexologie', price: '65€', duration: '1h', description: 'Massage des pieds et réflexologie' }
          ]
        },
        {
          id: 902,
          name: 'Beauté',
          items: [
            { id: 9021, name: 'Coiffure à Domicile', price: '40€', duration: '1h', description: 'Coupe et coiffage à domicile' },
            { id: 9022, name: 'Manucure', price: '35€', duration: '1h', description: 'Soin des mains et pose de vernis' },
            { id: 9023, name: 'Maquillage', price: '45€', duration: '1h', description: 'Maquillage professionnel' }
          ]
        },
        {
          id: 903,
          name: 'Activités',
          items: [
            { id: 9031, name: 'Yoga Privé', price: '45€', duration: '1h', description: 'Cours de yoga personnalisé' },
            { id: 9032, name: 'Méditation', price: '40€', duration: '1h', description: 'Séance de méditation guidée' },
            { id: 9033, name: 'Coaching Sportif', price: '50€', duration: '1h', description: 'Coaching sportif personnalisé' }
          ]
        }
      ]
    },
    {
      id: 10,
      category: 'Événements',
      subcategories: [
        {
          id: 1001,
          name: 'Organisation',
          items: [
            { id: 10011, name: 'Organisation Mariage', price: '200€', duration: '4h', description: 'Aide à l\'organisation de mariage' },
            { id: 10012, name: 'Organisation Anniversaire', price: '150€', duration: '3h', description: 'Organisation d\'anniversaire' },
            { id: 10013, name: 'Organisation Entreprise', price: '250€', duration: '4h', description: 'Organisation d\'événements d\'entreprise' }
          ]
        },
        {
          id: 1002,
          name: 'Services',
          items: [
            { id: 10021, name: 'Décoration Événement', price: '150€', duration: '3h', description: 'Décoration pour événements' },
            { id: 10022, name: 'Service Traiteur', price: '25€', duration: '1h', description: 'Service de restauration événementielle' },
            { id: 10023, name: 'Animation', price: '100€', duration: '2h', description: 'Animation pour événements' }
          ]
        }
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
            <span className="text-xs mt-1">Prestataire</span>
          </div>
          <button className="p-2 text-gray-600"><Menu size={24} /></button>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white p-3 shadow sticky top-[72px] z-40">
        <div className="flex space-x-2">
          {['Mes Services', 'Réservations', 'Profil'].map((tab, index) => (
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
              <h2 className="text-xl font-semibold mb-4">Mes services</h2>
              
              {/* Étape 1: Sélectionner une catégorie et un service */}
              <div className="mb-4">
                <h3 className="font-medium text-base mb-2">1. Choisissez un service</h3>
                
                {/* Catégories en onglets */}
                <div className="border-b mb-4">
                  <div className="flex overflow-x-auto space-x-2 -mx-4 px-4">
                    {services.map((category, index) => (
                      <button
                        key={category.id}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 ${
                          selectedCategory === index
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => {
                          setSelectedCategory(index);
                          setSelectedSubCategory(0);
                        }}
                      >
                        {category.category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sous-catégories */}
                <div className="mb-4">
                  <div className="flex overflow-x-auto space-x-2 -mx-4 px-4">
                    {services[selectedCategory].subcategories.map((subcategory, index) => (
                      <button
                        key={subcategory.id}
                        className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full ${
                          selectedSubCategory === index
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedSubCategory(index)}
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services de la sous-catégorie sélectionnée */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services[selectedCategory].subcategories[selectedSubCategory].items.map(service => (
                    <div 
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition ${
                        selectedService === service.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-base">{service.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <div className="flex items-center mt-2">
                            <Clock size={14} className="text-gray-500 mr-1" />
                            <span className="text-sm text-gray-500">{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-lg">{service.price}</p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {providers.map(provider => (
                      <div 
                        key={provider.id}
                        className={`border rounded-lg p-4 cursor-pointer transition ${
                          selectedProvider?.id === provider.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedProvider(provider)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-base">{provider.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin size={14} className="mr-1" /> {provider.location}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Star className="text-yellow-400 w-4 h-4 mr-1" />
                              <span>{provider.rating}</span>
                              <span className="ml-1">({provider.reviews} avis)</span>
                            </div>
                          </div>
                          <ChevronRight size={20} className="text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Étape 3: Sélectionner date et heure */}
              {selectedService && selectedProvider && (
                <div className="mb-4">
                  <h3 className="font-medium text-base mb-2">3. Choisissez une date et une heure</h3>
                  
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Date:</h4>
                    <div className="flex overflow-x-auto space-x-2 pb-2 -mx-3 px-3">
                      {availableDates.map(item => (
                        <div 
                          key={item.date}
                          className={`border rounded-lg p-3 flex-shrink-0 cursor-pointer ${
                            selectedDate === item.date 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200'
                          }`}
                          onClick={() => setSelectedDate(item.date)}
                        >
                          <div className="text-center min-w-[80px]">
                            <div className="text-sm font-medium">{item.date}</div>
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
                            className={`border rounded-lg p-3 text-center cursor-pointer ${
                              selectedTime === time 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200'
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            <span className="text-sm font-medium">{time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bouton de confirmation */}
              {selectedService && selectedProvider && selectedDate && selectedTime && (
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                  Confirmer la réservation
                </button>
              )}
            </div>
          )}

          {selectedTab === 1 && (
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Mes réservations</h2>
              {reservations.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
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
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Aucune réservation</p>
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
                      <label className="block text-sm text-gray-600">Nom complet</label>
                      <input type="text" className="w-full p-2 border rounded mt-1" value="Thomas Dupont" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Téléphone</label>
                      <input type="tel" className="w-full p-2 border rounded mt-1" value="06 12 34 56 78" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Email</label>
                      <input type="email" className="w-full p-2 border rounded mt-1" value="thomas.dupont@email.com" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Adresse</label>
                      <input type="text" className="w-full p-2 border rounded mt-1" value="123 rue de la Paix, 33210 Langon" />
                    </div>
                  </div>
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
    </div>
  );
};

export default ProviderDashboard; 