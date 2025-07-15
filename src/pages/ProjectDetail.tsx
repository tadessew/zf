import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, Clock, Package, Star, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Card3D from '../components/3D/Card3D';
import FloatingElement from '../components/3D/FloatingElement';
import SEOHead from '../components/SEOHead';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
            <Link
              to="/portfolio"
              className="bg-teal-700 text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const projectImages = [
    { url: project.beforeImage, label: 'Before', type: 'before' },
    { url: project.afterImage, label: 'After', type: 'after' },
    // Add more project images here in a real implementation
    { url: project.afterImage, label: 'Detail View 1', type: 'detail' },
    { url: project.afterImage, label: 'Detail View 2', type: 'detail' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const projectStats = [
    { icon: DollarSign, label: 'Total Investment', value: `$${project.cost.toLocaleString()}`, color: 'green' },
    { icon: Clock, label: 'Project Duration', value: project.duration, color: 'blue' },
    { icon: Package, label: 'Materials Used', value: project.materials, color: 'amber' },
    { icon: Calendar, label: 'Completion', value: '2024', color: 'purple' }
  ];

  const projectPhases = [
    {
      phase: 'Planning & Design',
      duration: '1 week',
      description: 'Initial consultation, space assessment, and design development.',
      status: 'completed'
    },
    {
      phase: 'Material Selection',
      duration: '3 days',
      description: 'Sourcing premium materials and finalizing specifications.',
      status: 'completed'
    },
    {
      phase: 'Manufacturing',
      duration: '4 weeks',
      description: 'Handcrafting furniture pieces with attention to detail.',
      status: 'completed'
    },
    {
      phase: 'Installation',
      duration: '2 days',
      description: 'Professional delivery and setup in the client\'s space.',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={`${project.title} - Project Portfolio - FurniCraft`}
        description={project.description}
        keywords={`${project.title}, furniture project, interior design, custom furniture`}
        image={project.afterImage}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-teal-600">Home</Link>
          <span>/</span>
          <Link to="/portfolio" className="hover:text-teal-600">Portfolio</Link>
          <span>/</span>
          <span className="text-gray-900">{project.title}</span>
        </nav>

        {/* Project Header */}
        <div className="text-center mb-12">
          <FloatingElement>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{project.title}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{project.description}</p>
          </FloatingElement>
        </div>

        {/* Project Images Gallery */}
        <Card3D glowEffect={true} className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 md:h-[600px]">
              <img
                src={projectImages[currentImageIndex].url}
                alt={projectImages[currentImageIndex].label}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>

              {/* Image Label */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-white font-medium shadow-lg ${
                  projectImages[currentImageIndex].type === 'before' ? 'bg-red-500' :
                  projectImages[currentImageIndex].type === 'after' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}>
                  {projectImages[currentImageIndex].label}
                </span>
              </div>

              {/* Share Button */}
              <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-3 shadow-lg transition-all duration-200">
                <Share2 className="h-5 w-5 text-gray-800" />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="p-6">
              <div className="flex space-x-4 overflow-x-auto">
                {projectImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      currentImageIndex === index ? 'border-teal-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.label}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card3D>

        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {projectStats.map((stat, index) => (
            <Card3D key={index} glowEffect={true}>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className={`bg-${stat.color}-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card3D>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Project Details */}
          <Card3D glowEffect={true}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Challenge</h3>
                  <p className="text-gray-600 leading-relaxed">
                    The client wanted to transform their traditional space into a modern, functional area 
                    while maintaining the warmth and character of the original design. The challenge was 
                    to balance contemporary aesthetics with timeless appeal.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Solution</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We designed custom furniture pieces that seamlessly blend modern functionality with 
                    classic design elements. Each piece was carefully crafted to maximize space utilization 
                    while creating a cohesive, elegant atmosphere.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Materials & Techniques</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Using premium {project.materials.toLowerCase()}, we employed traditional joinery 
                    techniques combined with modern finishing methods to ensure durability and beauty 
                    that will last for generations.
                  </p>
                </div>
              </div>
            </div>
          </Card3D>

          {/* Project Timeline */}
          <Card3D glowEffect={true}>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Timeline</h2>
              
              <div className="space-y-6">
                {projectPhases.map((phase, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                        <span className="text-sm text-gray-500">{phase.duration}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card3D>
        </div>

        {/* Client Testimonial */}
        {project.testimonial && (
          <Card3D glowEffect={true} className="mb-16">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-12 text-center text-white">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium mb-8 italic">
                  "{project.testimonial}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">JD</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg">John Doe</p>
                    <p className="text-teal-100">Homeowner</p>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        )}

        {/* Related Projects */}
        <div>
          <FloatingElement className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">More Projects</h2>
            <p className="text-lg text-gray-600">Explore our other transformations</p>
          </FloatingElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.filter(p => p.id !== project.id).slice(0, 2).map((relatedProject) => (
              <Card3D key={relatedProject.id} glowEffect={true}>
                <Link to={`/portfolio/${relatedProject.id}`} className="block">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="grid grid-cols-2 h-48">
                      <img
                        src={relatedProject.beforeImage}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src={relatedProject.afterImage}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{relatedProject.title}</h3>
                      <p className="text-gray-600 mb-4">{relatedProject.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>${relatedProject.cost.toLocaleString()}</span>
                        <span>{relatedProject.duration}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card3D>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <FloatingElement className="text-center mt-20">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-teal-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </Link>
              <Link
                to="/portfolio"
                className="border-2 border-white/30 backdrop-blur-sm text-white px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold text-lg"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </FloatingElement>
      </div>
    </div>
  );
};

export default ProjectDetail;