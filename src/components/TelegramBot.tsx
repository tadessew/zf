import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  options?: string[];
}

const TelegramBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to FurniCraft! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      options: ['View Products', 'Get Quote', 'Contact Info', 'FAQ']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const botResponses = {
    greeting: [
      "Hello! Welcome to FurniCraft! How can I assist you today?",
      "Hi there! I'm here to help you with any questions about our furniture!",
      "Welcome! What would you like to know about our custom furniture services?"
    ],
    products: [
      "We offer a wide range of furniture including living room, bedroom, dining room, and office furniture. Would you like to see our catalog?",
      "Our products are handcrafted with sustainable materials. You can browse our collection online!",
      "We specialize in custom furniture design. What type of furniture are you looking for?"
    ],
    pricing: [
      "Our prices vary depending on the piece and materials. Most items range from $500 to $3000. Would you like a custom quote?",
      "We offer competitive pricing for high-quality furniture. Contact us for a personalized quote!",
      "Pricing depends on size, materials, and customization. I can connect you with our sales team!"
    ],
    contact: [
      "You can reach us at (555) 123-4567 or email info@furnicraft.com. We're also available on WhatsApp!",
      "Our showroom is located at 123 Furniture Ave, City, State 12345. We're open Monday-Friday 9AM-6PM!",
      "Feel free to call us at (555) 123-4567 or visit our contact page for more ways to reach us!"
    ],
    default: [
      "I'm not sure about that, but I'd be happy to connect you with our team! You can call us at (555) 123-4567.",
      "That's a great question! For detailed information, please contact our specialists at info@furnicraft.com",
      "I'd recommend speaking with our experts. Would you like me to help you schedule a consultation?"
    ]
  };

  const getRandomResponse = (category: keyof typeof botResponses) => {
    const responses = botResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getBotResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let responseText = '';
    let options: string[] = [];
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      responseText = getRandomResponse('greeting');
      options = ['View Products', 'Get Quote', 'Services'];
    } else if (message.includes('product') || message.includes('furniture') || message.includes('catalog')) {
      responseText = getRandomResponse('products');
      options = ['View All Products', 'Custom Design'];
    } else if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
      responseText = getRandomResponse('pricing');
      options = ['Get Quote', 'View Pricing'];
    } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      responseText = getRandomResponse('contact');
      options = ['Contact Us', 'Visit Showroom'];
    } else if (message.includes('thank')) {
      responseText = "You're welcome! Is there anything else I can help you with today?";
      options = ['View Products', 'Get Quote', 'Contact Info'];
    } else {
      responseText = getRandomResponse('default');
      options = ['View Products', 'Contact Support', 'FAQ'];
    }

    return {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date(),
      options: options
    };
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(textToSend);
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">FurniCraft Assistant</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' 
                      ? 'bg-blue-100' 
                      : 'bg-gray-100'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Bot className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    
                    {/* Options */}
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => sendMessage(option)}
                            className="block w-full text-left px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!inputMessage.trim()}
                className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TelegramBot;