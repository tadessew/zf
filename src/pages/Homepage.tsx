import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Truck, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ActionButtons from '../components/ActionButtons';
import ShareButton from '../components/ShareButton';

const Homepage = () => {
  const { products, projects, blogPosts } = useApp();

  const features = [
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Handcrafted with the finest materials and attention to detail.',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary delivery on all orders over $500.',
    },
    {
      icon: Users,
      title: 'Custom Designs',
      description: 'Personalized furniture solutions for your unique space.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                Crafting Beautiful
                <span className="text-amber-700"> Furniture</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Transform your space with our handcrafted, sustainable furniture pieces 
                that blend style, comfort, and quality.
              </p>
              
              {/* Action Buttons */}
              <ActionButtons variant="vertical" showShare={false} />
              
              {/* Share Button */}
              <div className="flex items-center space-x-4">
                <ShareButton 
                  variant="button" 
                  size="md"
                  title="FurniCraft - Premium Custom Furniture"
                  description="Transform your space with our handcrafted, sustainable furniture pieces that blend style, comfort, and quality."
                />
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 font-semibold transition-colors"
                >
                  <span>Browse Products</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg"
                alt="Furniture showcase"
                className="w-full h-96 md:h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">14</div>
              <p className="text-gray-300">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">1200+</div>
              <p className="text-gray-300">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">98%</div>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose FurniCraft?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine traditional craftsmanship with modern design to create 
              furniture that's both beautiful and sustainable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-amber-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-10 w-10 text-amber-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular furniture pieces
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="group">
                <Link to={`/products/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <ShareButton 
                          variant="icon" 
                          size="sm"
                          url={`${window.location.origin}/products/${product.id}`}
                          title={product.name}
                          description={product.description}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-amber-700">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {product.material}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-amber-700 text-white px-8 py-4 rounded-lg hover:bg-amber-800 transition-colors inline-flex items-center space-x-3 font-semibold text-lg"
            >
              <span>View All Products</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Recent Projects
            </h2>
            <p className="text-xl text-gray-600">
              See how we've transformed spaces with our custom furniture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.slice(0, 2).map((project) => (
              <div key={project.id} className="group">
                <Link to={`/portfolio/${project.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="grid grid-cols-2 h-64 relative">
                      <div className="relative">
                        <img
                          src={project.beforeImage}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Before
                        </div>
                      </div>
                      <div className="relative">
                        <img
                          src={project.afterImage}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          After
                        </div>
                      </div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                        <ShareButton 
                          variant="icon" 
                          size="sm"
                          url={`${window.location.origin}/portfolio/${project.id}`}
                          title={project.title}
                          description={project.description}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Cost: <span className="text-amber-600 font-medium">${project.cost.toLocaleString()}</span></span>
                        <span>Duration: <span className="text-amber-600 font-medium">{project.duration}</span></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="bg-amber-700 text-white px-8 py-4 rounded-lg hover:bg-amber-800 transition-colors inline-flex items-center space-x-3 font-semibold text-lg"
            >
              <span>View Portfolio</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Latest from Our Blog
            </h2>
            <p className="text-xl text-gray-600">
              Tips, trends, and inspiration for your home
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {blogPosts.slice(0, 2).map((post) => (
              <div key={post.id} className="group">
                <Link to={`/blog/${post.id}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <ShareButton 
                          variant="icon" 
                          size="sm"
                          url={`${window.location.origin}/blog/${post.id}`}
                          title={post.title}
                          description={post.excerpt}
                        />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        {post.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <p className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="bg-amber-700 text-white px-8 py-4 rounded-lg hover:bg-amber-800 transition-colors inline-flex items-center space-x-3 font-semibold text-lg"
            >
              <span>Read More Articles</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-amber-100 mb-12 max-w-3xl mx-auto">
            Let's work together to create the perfect furniture for your home or office. 
            Our team is ready to bring your vision to life.
          </p>
          
          <ActionButtons variant="horizontal" className="justify-center" showShare={false} />
        </div>
      </section>
    </div>
  );
};

export default Homepage;