// OrbitalTechStack.tsx
import React from 'react';

// Type Definitions
interface TechItem {
  name: string;
  color: string;
  index: number;
  totalItems: number;
}

interface OrbitItemProps {
  tech: TechItem;
  radius: number;
  duration: number;
  size: 'mobile' | 'tablet' | 'desktop';
}

interface OrbitRingProps {
  items: { name: string; color: string }[];
  radius: { mobile: number; tablet: number; desktop: number };
  duration: number;
  size: 'mobile' | 'tablet' | 'desktop';
}

// Data
const techStackData = {
  inner: [
    { name: 'React', color: '#99ffff' },
    { name: 'Tailwind', color: '#007BFF' },
    { name: 'NextJS', color: '#ffffff' }
  ],
  middle: [
    { name: 'NodeJS', color: '#00FF00' },
    { name: 'ExpressJS', color: '#FFFF00' },
    { name: 'Clerk', color: '#8A2BE2' },
  ],
  outer: [
    { name: 'Sanity', color: '#FF0000' },
    { name: 'Stripe', color: '#6600ff' },
    { name: 'Firebase', color: '#FFA500' },
  ]
};

const responsiveRadii = {
  inner: {
    mobile: 60,
    tablet: 96,
    desktop: 120,
  },
  middle: {
    mobile: 100,
    tablet: 160,
    desktop: 200,
  },
  outer: {
    mobile: 140,
    tablet: 225,
    desktop: 280,
  },
};

// Components
const OrbitItem: React.FC<OrbitItemProps> = ({ tech, radius, duration, size }) => {
  const angle = (tech.index * 360) / tech.totalItems;

  return (
    <div
      className="absolute flex items-center justify-center -mt-6 -ml-6 bg-transparent rounded-full shadow-lg animate-orbit hover:scale-110 transition-transform
                 w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14"
      style={{
        animation: `orbit ${duration}s linear infinite`,
        animationDelay: `-${(tech.index * duration) / tech.totalItems}s`,
        '--rotation': `${angle}deg`,
        '--radius': `${radius}px`,
      } as React.CSSProperties}
    >
      <div
        className="text-[10px] md:text-xs lg:text-sm font-bold"
        style={{ color: tech.color }}
      >
        {tech.name}
      </div>
    </div>
  );
};

const OrbitRing: React.FC<OrbitRingProps> = ({ items, radius, duration, size }) => {
  const enrichedItems: TechItem[] = items.map((item, index) => ({
    ...item,
    index,
    totalItems: items.length,
  }));

  return (
    <>
      {enrichedItems.map(item => (
        <OrbitItem
          key={item.name}
          tech={item}
          radius={radius[size]}
          duration={duration}
          size={size}
        />
      ))}
    </>
  );
};

const CentralSphere: React.FC = () => (
  <div
    className="absolute w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg animate-spin-slow glow-yellow"
    style={{
      animation: 'spin 10s linear infinite',
      boxShadow: '0 0 30px rgba(252, 211, 77, 0.6)',
    }}
  />
);

const OrbitalTechStack: React.FC = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
      <CentralSphere />

      {/* Orbit Circles */}
      <div className="absolute w-32 h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 rounded-full border-2 border-purple-500/20" />
      <div className="absolute w-52 h-52 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-2 border-cyan-500/20" />
      <div className="absolute w-72 h-72 md:w-[450px] md:h-[450px] lg:w-[560px] lg:h-[560px] rounded-full border-2 border-pink-500/20" />

      {/* Orbit Items */}
      {['desktop', 'tablet', 'mobile'].map(size => (
        <div
          key={size}
          className={`${
            size === 'desktop' ? 'hidden lg:block' :
            size === 'tablet' ? 'hidden md:block lg:hidden' :
            'block md:hidden'
          }`}
        >
          <OrbitRing
            items={techStackData.inner}
            radius={responsiveRadii.inner}
            duration={15}
            size={size as 'mobile' | 'tablet' | 'desktop'}
          />
          <OrbitRing
            items={techStackData.middle}
            radius={responsiveRadii.middle}
            duration={20}
            size={size as 'mobile' | 'tablet' | 'desktop'}
          />
          <OrbitRing
            items={techStackData.outer}
            radius={responsiveRadii.outer}
            duration={25}
            size={size as 'mobile' | 'tablet' | 'desktop'}
          />
        </div>
      ))}
    </div>
  );
};

export default OrbitalTechStack;
