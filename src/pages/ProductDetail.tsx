import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Share2, Minus, Plus, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/NotificationToast';
import Card3D from '../components/3D/Card3D';
import FloatingElement from '../components/3D/FloatingElement';
import SwipeableCarousel from '../components/3D/SwipeableCarousel';
import SEOHead from '../components/SEOHead';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useApp();
  const { success, error } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link
              to="/products"
              className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image,
    product.image, // In real app, these would be different images
    product.image,
    product.image
  ];

  const features = [
    { icon: Truck, text: 'Free shipping on orders over $500' },
    { icon: Shield, text: '5-year craftsmanship warranty' },
    { icon: RotateCcw, text: '30-day return policy' }
  ];

  const specifications = [
    { label: 'Material', value: product.material },
    { label: 'Category', value: product.category },
    { label: 'Dimensions', value: '120cm x 80cm x 75cm' },
    { label: 'Weight', value: '45kg' },
    { label: 'Color', value: 'Natural Wood' },
    { label: 'Assembly', value: 'Required' }
  ];

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      success(`${product.name} added to wishlist!`);
    } else {
      success(`${product.name} removed from wishlist`);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={`${product.name} - FurniCraft`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, ${product.material}, furniture`}
        image={product.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-amber-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <Card3D glowEffect={true}>
              <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Card3D>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-amber-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full font-medium">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>In Stock</span>
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(24 reviews)</span>
              </div>
              
              <p className="text-5xl font-bold text-amber-600 mb-8">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{product.description}</p>
              <p className="text-gray-600">
                Crafted with premium {product.material.toLowerCase()}, this piece combines traditional 
                craftsmanship with modern design sensibilities. Each item is handmade by skilled artisans 
                and finished to perfection.
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quantity</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-6 py-3 font-medium text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-lg text-gray-600">
                  Total: <span className="font-bold text-gray-900">${(product.price * quantity).toLocaleString()}</span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-3 ${
                  product.inStock
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <button
                onClick={handleWishlist}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white'
                }`}
              >
                <Heart className={`h-6 w-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="px-6 py-4 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold"
              >
                <Share2 className="h-6 w-6" />
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Why Choose This Product</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-amber-100 p-2 rounded-lg">
                      <feature.icon className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-gray-600">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card3D glowEffect={true} className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'specifications', label: 'Specifications' },
                  { id: 'reviews', label: 'Reviews (24)' },
                  { id: 'care', label: 'Care Instructions' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-amber-500 text-amber-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-600 leading-relaxed mb-6">
                    This exceptional piece represents the perfect marriage of traditional craftsmanship 
                    and contemporary design. Each {product.name.toLowerCase()} is meticulously handcrafted 
                    by skilled artisans using premium {product.material.toLowerCase()}.
                  </p>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    The attention to detail is evident in every aspect, from the carefully selected materials 
                    to the precision joinery techniques. This piece is designed to be both functional and 
                    beautiful, serving as a centerpiece in your {product.category.toLowerCase()}.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Sustainability is at the heart of our design philosophy. We source our materials 
                    responsibly and employ eco-friendly finishing techniques to ensure that your furniture 
                    is not only beautiful but also environmentally conscious.
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-900">{spec.label}</span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-lg font-medium">4.8 out of 5</span>
                        <span className="text-gray-500">(24 reviews)</span>
                      </div>
                    </div>
                    <button className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors">
                      Write a Review
                    </button>
                  </div>

                  <div className="space-y-6">
                    {[
                      { name: 'Sarah Johnson', rating: 5, date: '2 weeks ago', review: 'Absolutely beautiful piece! The quality is exceptional and it fits perfectly in our dining room.' },
                      { name: 'Michael Chen', rating: 5, date: '1 month ago', review: 'Outstanding craftsmanship. You can tell this was made with care and attention to detail.' },
                      { name: 'Emily Davis', rating: 4, date: '2 months ago', review: 'Great quality furniture. Delivery was smooth and assembly was straightforward.' }
                    ].map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                              <span className="font-medium text-amber-700">{review.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <p className="text-sm text-gray-500">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.review}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Instructions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Daily Care</h4>
                      <p className="text-gray-600">Dust regularly with a soft, dry cloth. Avoid using harsh chemicals or abrasive cleaners.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Deep Cleaning</h4>
                      <p className="text-gray-600">For deeper cleaning, use a slightly damp cloth with mild soap. Always dry immediately with a clean cloth.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Protection</h4>
                      <p className="text-gray-600">Use coasters and placemats to protect from heat and moisture. Avoid direct sunlight to prevent fading.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Maintenance</h4>
                      <p className="text-gray-600">Apply furniture polish or wax every 3-6 months to maintain the finish and protect the wood.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card3D>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <FloatingElement className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Products</h2>
              <p className="text-lg text-gray-600">You might also like these pieces</p>
            </FloatingElement>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card3D key={relatedProduct.id} glowEffect={true}>
                  <Link to={`/products/${relatedProduct.id}`} className="block">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                        <p className="text-amber-600 font-bold">${relatedProduct.price}</p>
                      </div>
                    </div>
                  </Link>
                </Card3D>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;