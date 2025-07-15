import React, { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, Share2 } from 'lucide-react';
import { useToast } from './NotificationToast';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  material: string;
  inStock: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { success, info } = useToast();

  const handleAddToCart = () => {
    if (!product.inStock) return;
    success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      success(`${product.name} added to wishlist!`);
    } else {
      info(`${product.name} removed from wishlist`);
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
      info('Product link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative overflow-hidden">
        {/* Image */}
        <div className="relative h-64 bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Overlay with actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
          <Link
            to={`/products/${product.id}`}
            className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
            title="View Details"
          >
            <Eye className="h-5 w-5 text-gray-800" />
          </Link>
          <button
            onClick={handleWishlist}
            className={`p-3 rounded-full transition-colors ${
              isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 hover:bg-white text-gray-800'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="bg-white/90 p-3 rounded-full hover:bg-white transition-colors"
            title="Share Product"
          >
            <Share2 className="h-5 w-5 text-gray-800" />
          </button>
        </div>

        {/* Status badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className="bg-amber-500 text-white text-sm px-3 py-1 rounded-full font-medium">
            {product.category}
          </span>
          {!product.inStock && (
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Price badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-gray-900 text-lg font-bold px-4 py-2 rounded-full">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-amber-700 transition-colors">
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          {product.rating && (
            <div className="flex items-center space-x-1 ml-4">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-600">
                {product.rating}
              </span>
              {product.reviews && (
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-full font-medium">
            {product.material}
          </span>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
            <span className="text-sm text-gray-600">
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              product.inStock
                ? 'bg-amber-700 text-white hover:bg-amber-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </button>
          
          <Link
            to={`/products/${product.id}`}
            className="px-4 py-3 border-2 border-amber-700 text-amber-700 rounded-lg hover:bg-amber-700 hover:text-white transition-colors font-semibold"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;