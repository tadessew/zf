import React from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  className = '', 
  backgroundImage,
  speed = 0.5 
}) => {
  const backgroundStyle = backgroundImage 
    ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }
    : {};

  return (
    <div className={`relative ${className}`} style={backgroundStyle}>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;