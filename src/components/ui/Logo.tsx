import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'white' | 'dark';
}

export default function Logo({ className = "", variant = 'default' }: LogoProps) {
  // Define color mapping based on variant and the brand palette
  const colors = {
    default: { primary: '#064e3b', secondary: '#ea580c' }, // Deep green & soft orange
    white: { primary: '#ffffff', secondary: '#ffffff' },   // All white for dark backgrounds
    dark: { primary: '#022c22', secondary: '#ea580c' }     // Darker green
  };

  const currentColors = colors[variant];

  return (
    <div className={`flex items-center font-heading font-black tracking-tighter leading-none ${className}`} style={{ fontSize: '1.5rem' }}>
      <span style={{ color: currentColors.primary }}>F</span>
      
      {/* The special O's with negative space arrow */}
      <svg viewBox="0 0 190 120" className="inline-block mx-[0.08em]" style={{ height: '0.85em', transform: 'translateY(-0.02em)' }}>
        <mask id={`arrowMask-${variant}`}>
          <rect width="190" height="120" fill="white" />
          <path d="M 75,120 L75,60 L45,60 L95,10 L145,60 L115,60 L115,120 Z" fill="black" />
        </mask>
        
        <circle cx="50" cy="60" r="50" fill={currentColors.primary} mask={`url(#arrowMask-${variant})`} />
        <circle cx="140" cy="60" r="50" fill={currentColors.secondary} mask={`url(#arrowMask-${variant})`} />
      </svg>

      <span style={{ color: currentColors.primary }}>RSATI</span>
    </div>
  );
}
