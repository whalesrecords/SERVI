'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const PlatformComponent = dynamic(() => import('../plateforme-lavage-auto'), {
  ssr: false
});

export default function Home() {
  return <PlatformComponent />;
} 