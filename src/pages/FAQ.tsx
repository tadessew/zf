import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import Card3D from '../components/3D/Card3D';
import FloatingElement from '../components/3D/FloatingElement';
import ParallaxSection from '../components/3D/ParallaxSection';
import SEOHead from '../components/SEOHead';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = ['All', 'Orders & Pricing', 'Design & Customization', 'Delivery & Installation', 'Materials & Care', 'Warranty & Returns'];

  const faqs = [
    {
      id: 1,
      category: 'Orders & Pricing',
      question: 'How much does custom furniture cost?',
      answer: 'Our custom furniture prices vary depending on size, materials, and complexity. Basic pieces start at $500, while premium custom designs can range from $1,500 to $5,000+. We provide detailed quotes after consultation to ensure transparency.',
      popular: true
    },
    {
      id: 2,
      category: 'Orders & Pricing',
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans for orders over $1,000. You can pay 50% upfront and the remaining 50% upon completion. For larger projects, we can arrange custom payment schedules.',
      popular: false
    },
    {
      id: 3,
      category: 'Design & Customization',
      question: 'Can you match existing furniture styles?',
      answer: 'Absolutely! Our designers are experts at matching existing styles, colors, and finishes. Bring photos or samples, and we\'ll create pieces that seamlessly integrate with your current decor.',
      popular: true
    },
    {
      id: 4,
      category: 'Design & Customization',
      question: 'Do you provide 3D visualizations?',
      answer: 'Yes, we create detailed 3D renderings for all custom projects. This allows you to see exactly how your furniture will look before we begin crafting, ensuring you\'re completely satisfied with the design.',
      popular: true
    },
    {
      id: 5,
      category: 'Delivery & Installation',
      question: 'How long does delivery take?',
      answer: 'Standard pieces typically ship within 2-4 weeks. Custom furniture takes 4-8 weeks depending on complexity. We\'ll provide a detailed timeline with your order confirmation.',
      popular: true
    },
    {
      id: 6,
      category: 'Delivery & Installation',
      question: 'Do you offer white-glove delivery?',
      answer: 'Yes, we provide white-glove delivery service which includes professional delivery, unpacking, assembly, placement, and removal of all packaging materials. This service is included for orders over $2,000.',
      popular: false
    },
    {
      id: 7,
      category: 'Materials & Care',
      question: 'What types of wood do you use?',
      answer: 'We work with premium hardwoods including oak, walnut, cherry, maple, and mahogany. We also offer sustainable options like bamboo and reclaimed wood. All our wood is responsibly sourced.',
      popular: true
    },
    {
      id: 8,
      category: 'Materials & Care',
      question: 'How do I care for my furniture?',
      answer: 'Care instructions vary by material and finish. Generally, dust regularly with a soft cloth, avoid direct sunlight, use coasters, and apply furniture polish every 3-6 months. We provide detailed care guides with every piece.',
      popular: false
    },
    {
      id: 9,
      category: 'Warranty & Returns',
      question: 'What warranty do you offer?',
      answer: 'We offer a 5-year warranty on craftsmanship and a 2-year warranty on hardware. This covers any defects in materials or workmanship under normal use conditions.',
      popular: true
    },
    {
      id: 10,
      category: 'Warranty & Returns',
      question: 'Can I return custom furniture?',
      answer: 'Custom pieces are made specifically for you, so returns are limited. However, if there\'s a defect or the piece doesn\'t match specifications, we\'ll make it right at no cost to you.',
      popular: false
    },
    {
      id: 11,
      category: 'Design & Customization',
      question: 'Can you work with my interior designer?',
      answer: 'Absolutely! We love collaborating with interior designers and architects. We can work from their specifications or collaborate on design development to achieve the perfect result.',
      popular: false
    },
    {
      id: 12,
      category: 'Orders & Pricing',
      question: 'Do you offer discounts for bulk orders?',
      answer: 'Yes, we offer volume discounts for orders of 5+ pieces or projects over $10,000. Contact us for a custom quote based on your specific needs.',
      popular: false
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs.filter(faq => faq.popular);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our experts',
      contact: '(555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get detailed answers',
      contact: 'support@furnicraft.com',
      action: 'mailto:support@furnicraft.com'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant assistance',
      contact: 'Chat with us',
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title="Frequently Asked Questions - FurniCraft"
        description="Find answers to common questions about our furniture services, pricing, delivery, warranty, and more. Get the information you need."
        keywords="furniture FAQ, furniture questions, custom furniture help, furniture warranty, delivery information"
      />

      {/* Hero Section */}
      <ParallaxSection 
        className="py-32"
        backgroundImage="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
        speed={0.3}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingElement className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Find answers to common questions about our furniture and services
            </p>
          </FloatingElement>
        </div>
      </ParallaxSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <Card3D glowEffect={true} className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for answers..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 md:w-64"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredFAQs.length} of {faqs.length} questions
            </div>
          </div>
        </Card3D>

        {/* Popular Questions */}
        {selectedCategory === 'All' && !searchTerm && (
          <div className="mb-16">
            <FloatingElement className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Questions</h2>
              <p className="text-lg text-gray-600">The most frequently asked questions by our customers</p>
            </FloatingElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {popularFAQs.slice(0, 4).map((faq) => (
                <Card3D key={faq.id} glowEffect={true}>
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-amber-200 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                      <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                        Popular
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    <div className="mt-4 text-sm text-amber-600 font-medium">{faq.category}</div>
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        )}

        {/* All Questions */}
        <div className="mb-16">
          <FloatingElement className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {searchTerm || selectedCategory !== 'All' ? 'Search Results' : 'All Questions'}
            </h2>
            <p className="text-lg text-gray-600">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Questions matching your search criteria' 
                : 'Browse all frequently asked questions'
              }
            </p>
          </FloatingElement>

          <Card3D glowEffect={true}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {filteredFAQs.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredFAQs.map((faq, index) => (
                    <div key={faq.id} className="p-6">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-inset rounded-lg p-2 -m-2"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-amber-600 font-medium">{faq.category}</span>
                            {faq.popular && (
                              <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="h-6 w-6 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                      </button>
                      
                      {openItems.includes(faq.id) && (
                        <div className="mt-4 pl-2">
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-12 w-12 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">No questions found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any questions matching your search. Try different keywords or browse all categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('All');
                    }}
                    className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </Card3D>
        </div>

        {/* Contact Support */}
        <div>
          <FloatingElement className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-lg text-gray-600">Our support team is here to help you with any additional questions</p>
          </FloatingElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <Card3D key={index} glowEffect={true}>
                <a
                  href={method.action}
                  className="block bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200"
                >
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <method.icon className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <p className="text-amber-600 font-semibold">{method.contact}</p>
                </a>
              </Card3D>
            ))}
          </div>

          {/* Quick Actions */}
          <Card3D glowEffect={true}>
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-12 text-center text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Start Your Project?</h3>
              <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
                Don't let questions hold you back. Get in touch and let's bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-amber-600 px-8 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105">
                  Schedule Consultation
                </button>
                <button className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold">
                  Request Quote
                </button>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
};

export default FAQ;