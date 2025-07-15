import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
  image: string;
  label: string;
  color?: string;
}

interface SwipeableCarouselProps {
  items: CarouselItem[];
  className?: string;
  renderItem?: (item: CarouselItem, index: number) => React.ReactNode;
}

const SwipeableCarousel: React.FC<SwipeableCarouselProps> = ({ 
  items, 
  className = '',
  renderItem 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden">
        {renderItem ? (
          renderItem(items[currentIndex], currentIndex)
        ) : (
          <img
            src={items[currentIndex].image}
            alt={items[currentIndex].label}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      {items.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-lg transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </>
      )}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableCarousel;