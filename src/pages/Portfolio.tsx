import React, { useState } from 'react';
import { Clock, DollarSign, Package, Star, Filter, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card3D from '../components/3D/Card3D';
import FloatingElement from '../components/3D/FloatingElement';
import ParallaxSection from '../components/3D/ParallaxSection';
import SwipeableCarousel from '../components/3D/SwipeableCarousel';

const Portfolio = () => {
  const { projects } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['All', 'Living Room', 'Bedroom', 'Office', 'Kitchen', 'Outdoor'];
  
  const filteredProjects = projects
    .filter(project => selectedFilter === 'All' || project.title.toLowerCase().includes(selectedFilter.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'cost-high') return b.cost - a.cost;
      if (sortBy === 'cost-low') return a.cost - b.cost;
      return 0; // recent (default order)
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ParallaxSection 
        className="py-32"
        backgroundImage="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg"
        speed={0.3}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingElement className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Explore our recent projects and see how we've transformed spaces with our custom furniture solutions
            </p>
          </FloatingElement>
        </div>
      </ParallaxSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <Card3D glowEffect={true} className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-3 rounded-xl">
                <Filter className="h-6 w-6 text-teal-700" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Browse Our Work</h2>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedFilter(category)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedFilter === category
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
              >
                <option value="recent">Most Recent</option>
                <option value="cost-high">Highest Cost</option>
                <option value="cost-low">Lowest Cost</option>
              </select>
            </div>
          </div>
        </Card3D>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project, index) => (
            <Card3D key={project.id} glowEffect={true} intensity={0.8}>
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:border-teal-200 transition-all duration-300 group">
                {/* Before & After Carousel */}
                <div className="relative h-96">
                  <SwipeableCarousel
                    items={[
                      { image: project.beforeImage, label: 'Before', color: 'bg-red-500' },
                      { image: project.afterImage, label: 'After', color: 'bg-green-500' }
                    ]}
                    className="h-full"
                    renderItem={(item, itemIndex) => (
                      <div className="relative h-full group">
                        <img
                          src={item.image}
                          alt={item.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className={`absolute top-6 ${itemIndex === 0 ? 'left-6' : 'right-6'} ${item.color} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                          {item.label}
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                            <ArrowRight className="h-8 w-8 text-gray-800" />
                          </div>
                        </div>
                      </div>
                    )}
                  />
                </div>

                {/* Project Details */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">{project.description}</p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <FloatingElement>
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Total Cost</p>
                          <p className="text-xl font-bold text-gray-900">${project.cost.toLocaleString()}</p>
                        </div>
                      </div>
                    </FloatingElement>
                    
                    <FloatingElement>
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Duration</p>
                          <p className="text-xl font-bold text-gray-900">{project.duration}</p>
                        </div>
                      </div>
                    </FloatingElement>
                    
                    <FloatingElement>
                      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                        <div className="bg-amber-100 p-2 rounded-lg">
                          <Package className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Materials</p>
                          <p className="text-sm font-semibold text-gray-900">{project.materials}</p>
                        </div>
                      </div>
                    </FloatingElement>
                  </div>

                  {/* Client Testimonial */}
                  {project.testimonial && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border-l-4 border-teal-500 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-teal-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
                      <div className="relative">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="bg-teal-100 p-2 rounded-lg">
                            <Star className="h-5 w-5 text-teal-600" />
                          </div>
                          <span className="text-lg font-semibold text-gray-900">Client Testimonial</span>
                        </div>
                        <p className="text-gray-700 italic text-lg leading-relaxed">"{project.testimonial}"</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* No Projects Found */}
        {filteredProjects.length === 0 && (
          <FloatingElement className="text-center py-20">
            <div className="bg-white rounded-2xl p-12 shadow-xl max-w-md mx-auto">
              <div className="bg-gradient-to-r from-teal-100 to-cyan-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <Package className="h-12 w-12 text-teal-700" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No projects found</h3>
              <p className="text-gray-600 mb-8">Try selecting a different category or check back soon for new projects</p>
              <button
                onClick={() => setSelectedFilter('All')}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all duration-300 font-semibold"
              >
                View All Projects
              </button>
            </div>
          </FloatingElement>
        )}

        {/* CTA Section */}
        <FloatingElement className="mt-20">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mt-20"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
                Let's discuss your project and create something amazing together. Our team is ready to bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-teal-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start Your Project
                </button>
                <button className="border-2 border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg">
                  View Process
                </button>
              </div>
            </div>
          </div>
        </FloatingElement>
      </div>
    </div>
  );
};

export default Portfolio;