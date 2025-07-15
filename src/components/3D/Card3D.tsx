import React from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowEffect?: boolean;
  intensity?: number;
}

const Card3D: React.FC<Card3DProps> = ({ 
  children, 
  className = '', 
  glowEffect = false,
  intensity = 1 
}) => {
  return (
    <div className={`${className} ${glowEffect ? 'hover:shadow-lg' : ''} transition-shadow duration-300`}>
      {children}
    </div>
  );
};

export default Card3D;