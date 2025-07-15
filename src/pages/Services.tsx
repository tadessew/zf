import React from 'react';
import { Hammer, Palette, Truck, Settings } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Hammer,
      title: 'Custom Furniture Design',
      description: 'Bespoke furniture pieces designed specifically for your space and style preferences.',
      features: ['3D Design Visualization', 'Material Selection', 'Size Customization', 'Style Matching'],
    },
    {
      icon: Palette,
      title: 'Interior Design Consultation',
      description: 'Professional guidance to help you create cohesive and beautiful living spaces.',
      features: ['Space Planning', 'Color Schemes', 'Furniture Layout', 'Style Coordination'],
    },
    {
      icon: Truck,
      title: 'Delivery & Installation',
      description: 'Professional delivery and setup service to ensure your furniture is perfectly placed.',
      features: ['White Glove Service', 'Assembly Included', 'Placement Assistance', 'Packaging Removal'],
    },
    {
      icon: Settings,
      title: 'Furniture Restoration',
      description: 'Breathe new life into your existing furniture with our expert restoration services.',
      features: ['Refinishing', 'Reupholstering', 'Structural Repairs', 'Hardware Replacement'],
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From custom design to professional installation, we provide comprehensive furniture services to transform your space
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-amber-100 p-4 rounded-lg">
                  <service.icon className="h-8 w-8 text-amber-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">What's Included:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full bg-amber-700 text-white py-3 px-6 rounded-lg hover:bg-amber-800 transition-colors font-semibold">
                Get Quote
              </button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-amber-700 rounded-lg p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let's bring your vision to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-amber-50 transition-colors">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-amber-700 transition-colors font-semibold text-lg">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;