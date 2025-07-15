import React, { useState } from 'react';
import { Share2, Copy, Facebook, Twitter, Linkedin, Mail, MessageCircle, Check } from 'lucide-react';
import { useToast } from './NotificationToast';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  variant?: 'button' | 'icon' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url = window.location.href,
  title = document.title,
  description = 'Check out this amazing furniture from FurniCraft',
  className = '',
  variant = 'button',
  size = 'md'
}) => {
  const { success, info } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      color: 'text-gray-600 hover:text-gray-800',
      action: () => copyToClipboard()
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600 hover:text-blue-800',
      action: () => shareToFacebook()
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'text-blue-400 hover:text-blue-600',
      action: () => shareToTwitter()
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700 hover:text-blue-900',
      action: () => shareToLinkedIn()
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'text-green-600 hover:text-green-800',
      action: () => shareViaEmail()
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-500 hover:text-green-700',
      action: () => shareToWhatsApp()
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    } catch (err) {
      info('Please copy the link manually: ' + url);
    }
  };

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const shareToTwitter = () => {
    const text = `${title} - ${description}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const shareToLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setIsOpen(false);
  };

  const shareToWhatsApp = () => {
    const text = `${title} - ${description}\n${url}`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank');
    setIsOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setIsOpen(true);
        }
      }
    } else {
      setIsOpen(true);
    }
  };

  if (variant === 'icon') {
    return (
      <div className="relative">
        <button
          onClick={handleNativeShare}
          className={`${sizeClasses[size]} bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full transition-all duration-200 hover:scale-110 ${className}`}
          title="Share"
        >
          <Share2 className={iconSizes[size]} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[200px]">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Share this</h3>
              <div className="space-y-2">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${option.color}`}
                  >
                    {option.name === 'Copy Link' && copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <option.icon className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center space-x-2 ${sizeClasses[size]} bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors ${className}`}
        >
          <Share2 className={iconSizes[size]} />
          <span className="font-medium">Share</span>
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50 min-w-[250px]">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Share this page</h3>
              <div className="grid grid-cols-2 gap-2">
                {shareOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className={`flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-50 transition-colors ${option.color}`}
                  >
                    {option.name === 'Copy Link' && copied ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <option.icon className="h-5 w-5" />
                    )}
                    <span className="text-xs font-medium text-center">
                      {option.name === 'Copy Link' && copied ? 'Copied!' : option.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={handleNativeShare}
      className={`flex items-center space-x-2 ${sizeClasses[size]} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${className}`}
    >
      <Share2 className={iconSizes[size]} />
      <span className="font-semibold">Share</span>
    </button>
  );
};

export default ShareButton;