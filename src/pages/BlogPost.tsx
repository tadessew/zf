import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { useApp } from '../context/AppContext';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts } = useApp();
  
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-amber-700 hover:text-amber-800 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article Header */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-amber-500 text-white text-sm px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Article Meta */}
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <User className="h-4 w-4 mr-2" />
              <span>FurniCraft Team</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8 font-medium">
                {post.excerpt}
              </p>

              {/* Content would be rendered from markdown or rich text */}
              <div className="text-gray-700 leading-relaxed space-y-6">
                <p>
                  {post.content || `
                    In today's world, making sustainable choices has become more important than ever. 
                    When it comes to furniture, these decisions can have a lasting impact on both your 
                    home and the environment. This comprehensive guide will help you navigate the world 
                    of eco-friendly furniture options.
                  `}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Understanding Sustainable Materials
                </h2>
                <p>
                  Sustainable furniture begins with the materials used in its construction. Look for 
                  pieces made from reclaimed wood, bamboo, or FSC-certified lumber. These materials 
                  are sourced responsibly and help reduce the environmental impact of your furniture 
                  choices.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Quality Over Quantity
                </h2>
                <p>
                  Investing in high-quality furniture pieces that will last for decades is one of the 
                  most sustainable choices you can make. Well-crafted furniture not only reduces waste 
                  but also provides better value over time.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Local Craftsmanship
                </h2>
                <p>
                  Supporting local artisans and furniture makers reduces transportation emissions and 
                  helps strengthen your community's economy. Local craftspeople often use traditional 
                  techniques that result in more durable, unique pieces.
                </p>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="border-t border-gray-200 mt-12 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                <div className="flex space-x-4">
                  <button className="text-gray-600 hover:text-blue-600 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-blue-700 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter(p => p.id !== id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-amber-700 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{relatedPost.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;