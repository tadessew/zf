import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+1234567890"; // Replace with actual WhatsApp number
  
  const predefinedMessages = [
    "Hi! I'm interested in your furniture collection.",
    "I'd like to get a quote for custom furniture.",
    "Can you tell me more about your delivery options?",
    "I have questions about your products.",
    "I'd like to schedule a consultation."
  ];

  const openWhatsApp = (message?: string) => {
    const encodedMessage = encodeURIComponent(message || "Hi! I'm interested in your furniture collection.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Toggle Button */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 group"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
          )}
        </button>
        
        {!isOpen && (
          <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl p-3 max-w-xs animate-fadeInUp">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              <p className="text-sm text-gray-700">Chat with us on WhatsApp!</p>
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Menu */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 animate-scaleIn">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp Chat</h3>
                <p className="text-xs text-green-100">Start a conversation with us</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">Quick Start</h4>
              <p className="text-sm text-gray-600 mb-4">
                Choose a message below or start a custom conversation
              </p>
              
              <div className="space-y-2">
                {predefinedMessages.map((message, index) => (
                  <button
                    key={index}
                    onClick={() => openWhatsApp(message)}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-sm text-gray-700"
                  >
                    {message}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <button
                onClick={() => openWhatsApp()}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 font-semibold"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Start Custom Chat</span>
              </button>
              
              <div className="mt-3 text-center">
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4" />
                  <span>Or call us directly</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppWidget;