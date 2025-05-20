'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="w-32 h-32 relative">
            <Image 
              src="/SERVI.png" 
              alt="SERVI Logo" 
              fill
              className="object-contain"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Bienvenue sur SERVI</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin Interface */}
            <Link href="/admin" className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold">Administration</h2>
                </div>
                <p className="text-gray-600 text-center">Gérez les services, les prestataires et les réservations</p>
              </div>
            </Link>

            {/* Provider Interface */}
            <Link href="/provider" className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold">Prestataire</h2>
                </div>
                <p className="text-gray-600 text-center">Gérez vos services et vos disponibilités</p>
              </div>
            </Link>

            {/* Client Interface */}
            <Link href="/client" className="block">
              <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold">Client</h2>
                </div>
                <p className="text-gray-600 text-center">Réservez des services à domicile</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>© 2024 SERVI. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
} 