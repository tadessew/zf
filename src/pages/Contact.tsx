import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from 'lucide-react';
import EnhancedContactForm from '../components/EnhancedContactForm';
import ParallaxSection from '../components/3D/ParallaxSection';
import FloatingElement from '../components/3D/FloatingElement';
import Card3D from '../components/3D/Card3D';

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '(555) 123-4567',
      secondary: '(555) 123-4568',
      description: 'Call us for immediate assistance',
      action: 'tel:+15551234567',
      actionText: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'info@furnicraft.com',
      secondary: 'sales@furnicraft.com',
      description: 'Send us an email anytime',
      action: 'mailto:info@furnicraft.com',
      actionText: 'Send Email'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      primary: '+1 (555) 123-4567',
      secondary: 'Available 24/7',
      description: 'Chat with us instantly',
      action: 'https://wa.me/15551234567',
      actionText: 'Start Chat'
    },
    {
      icon: Calendar,
      title: 'Schedule Meeting',
      primary: 'Book Consultation',
      secondary: 'Free 30-min session',
      description: 'Schedule a design consultation',
      action: '#',
      actionText: 'Book Now'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ParallaxSection 
        className="py-32"
        backgroundImage="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        speed={0.3}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingElement className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Us</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Ready to start your furniture project? Get in touch with us today and let's create something amazing together
            </p>
          </FloatingElement>
        </div>
      </ParallaxSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card3D key={index} glowEffect={true}>
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:border-amber-200 transition-all duration-300 text-center group">
                <FloatingElement>
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300">
                    <method.icon className="h-10 w-10 text-amber-700" />
                  </div>
                </FloatingElement>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-lg font-medium text-gray-800 mb-1">{method.primary}</p>
                <p className="text-sm text-gray-600 mb-4">{method.secondary}</p>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <a
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold transform hover:scale-105"
                >
                  {method.actionText}
                </a>
              </div>
            </Card3D>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <EnhancedContactForm />
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Office Information */}
            <Card3D glowEffect={true}>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-3 rounded-xl">
                    <MapPin className="h-6 w-6 text-teal-700" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Visit Our Showroom</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
                      <p className="text-gray-600 leading-relaxed">
                        123 Furniture Avenue<br />
                        Craftsman District<br />
                        City, State 12345<br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-amber-700 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Business Hours</h3>
                      <div className="space-y-2">
                        {officeHours.map((schedule, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-600">{schedule.day}</span>
                            <span className="font-medium text-gray-900">{schedule.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Directions Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <a
                    href="https://maps.google.com/?q=123+Furniture+Avenue,+City,+State+12345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-3 px-6 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-center block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </Card3D>

            {/* Interactive Map */}
            <Card3D>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">Find Us</h3>
                </div>
                <div className="relative h-80 bg-gray-200">
                  {/* Placeholder for Google Maps */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 font-medium">Interactive Map</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Google Maps integration would be embedded here
                      </p>
                      <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        View on Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>

            {/* Emergency Contact */}
            <Card3D>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-xl font-bold mb-4">Need Immediate Assistance?</h3>
                <p className="text-red-100 mb-6">
                  For urgent matters or emergency furniture repairs, contact us immediately.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+15551234567"
                    className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 font-semibold text-center"
                  >
                    Emergency Hotline
                  </a>
                  <a
                    href="https://wa.me/15551234567?text=Emergency%20assistance%20needed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-semibold text-center"
                  >
                    WhatsApp Emergency
                  </a>
                </div>
              </div>
            </Card3D>
          </div>
        </div>

        {/* FAQ Section */}
        <FloatingElement className="mt-20">
          <Card3D glowEffect={true}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How long does custom furniture take?
                  </h3>
                  <p className="text-gray-600">
                    Custom furniture typically takes 4-8 weeks depending on complexity and materials. We'll provide a detailed timeline with your quote.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do you offer design consultations?
                  </h3>
                  <p className="text-gray-600">
                    Yes! We offer free 30-minute consultations to discuss your project and provide initial design ideas.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What's your warranty policy?
                  </h3>
                  <p className="text-gray-600">
                    We offer a 5-year warranty on craftsmanship and a 2-year warranty on hardware and mechanisms.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Can you work with my existing decor?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! Our designers specialize in creating pieces that complement your existing style and space.
                  </p>
                </div>
              </div>
            </div>
          </Card3D>
        </FloatingElement>
      </div>
    </div>
  );
};

export default Contact;