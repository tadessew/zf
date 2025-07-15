import React from 'react';
import { Calculator, Rocket, Calendar, Users } from 'lucide-react';
import { useBooking } from '../hooks/useBooking';
import ShareButton from './ShareButton';

interface ActionButtonsProps {
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'grid';
  showShare?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  className = '', 
  variant = 'horizontal',
  showShare = true 
}) => {
  const { 
    openQuoteForm, 
    openProjectForm, 
    openConsultationForm,
    BookingComponents 
  } = useBooking();

  const buttons = [
    {
      label: 'Get Quote',
      icon: Calculator,
      action: openQuoteForm,
      color: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
      description: 'Request a detailed quote for your project'
    },
    {
      label: 'Start Your Project',
      icon: Rocket,
      action: openProjectForm,
      color: 'from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700',
      description: 'Begin your furniture project journey'
    },
    {
      label: 'Book Consultation',
      icon: Users,
      action: openConsultationForm,
      color: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
      description: 'Schedule a free design consultation'
    }
  ];

  const getLayoutClasses = () => {
    switch (variant) {
      case 'vertical':
        return 'flex flex-col space-y-4';
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';
      default:
        return 'flex flex-col sm:flex-row gap-4';
    }
  };

  return (
    <>
      <div className={`${getLayoutClasses()} ${className}`}>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.action}
            className={`group relative px-6 py-4 bg-gradient-to-r ${button.color} text-white rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden`}
          >
            {/* Background animation */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            
            {/* Content */}
            <div className="relative flex items-center justify-center space-x-3">
              <button.icon className="h-6 w-6" />
              <span>{button.label}</span>
            </div>
            
            {/* Tooltip for grid variant */}
            {variant === 'grid' && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                {button.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
          </button>
        ))}
        
        {showShare && (
          <ShareButton 
            variant="dropdown" 
            className="self-start"
            title="FurniCraft - Premium Custom Furniture"
            description="Transform your space with our handcrafted, sustainable furniture pieces that blend style, comfort, and quality."
          />
        )}
      </div>
      
      <BookingComponents />
    </>
  );
};

export default ActionButtons;