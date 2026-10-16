'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'original' | 'auto';
  showSubtitle?: boolean;
  className?: string;
  allowToggle?: boolean;
}

export default function BrandLogo({
  size = 'md',
  variant = 'gold',
  showSubtitle = true,
  className = '',
  allowToggle = false,
}: BrandLogoProps) {
  const [currentVariant, setCurrentVariant] = useState<'gold' | 'original'>(
    variant === 'original' ? 'original' : 'gold'
  );

  const dimMap = {
    sm: { img: 32, title: 'text-sm font-bold', sub: 'text-[10px]' },
    md: { img: 44, title: 'text-base font-bold', sub: 'text-xs' },
    lg: { img: 56, title: 'text-xl font-bold', sub: 'text-xs' },
    xl: { img: 84, title: 'text-2xl font-extrabold', sub: 'text-sm' },
  };

  const { img, title, sub } = dimMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Emblem with black frame and gold border */}
      <div 
        className="relative group cursor-pointer flex-shrink-0"
        title={allowToggle ? "Click to toggle between Original and Gold Enterprise Logo" : "VM Intellect Logo"}
        onClick={() => {
          if (allowToggle) {
            setCurrentVariant(prev => prev === 'gold' ? 'original' : 'gold');
          }
        }}
      >
        <div className="relative rounded-full p-1 bg-slate-950 border border-amber-500/40 shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-amber-400 group-hover:shadow-md">
          {currentVariant === 'gold' ? (
            <img
              src="/vmi-gold-logo.svg"
              alt="VM Intellect Gold Emblem"
              width={img}
              height={img}
              className="object-contain"
            />
          ) : (
            <img
              src="/VMI-logo.png"
              alt="VM Intellect Corporate Logo"
              width={img}
              height={img}
              className="object-contain bg-black rounded-full"
            />
          )}
        </div>

        {allowToggle && (
          <span className="absolute -bottom-1 -right-1 text-[8px] px-1 py-0.2 bg-amber-500 text-slate-950 font-semibold rounded shadow-xs">
            {currentVariant === 'gold' ? 'GOLD' : 'ORIG'}
          </span>
        )}
      </div>

      {/* Typography */}
      <div>
        <div className="flex items-center gap-2">
          <span className={`tracking-tight text-slate-900 font-serif ${title}`}>
            VM INTELLECT
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            EstateIQ AI
          </span>
        </div>
        {showSubtitle && (
          <p className={`text-slate-500 font-medium tracking-tight ${sub}`}>
            Intelligent Real Estate & Compliance Platform
          </p>
        )}
      </div>
    </div>
  );
}
