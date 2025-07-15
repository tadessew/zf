import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'FurniCraft - Premium Custom Furniture',
  description = 'Transform your space with our handcrafted, sustainable furniture pieces that blend style, comfort, and quality. Custom designs available.',
  keywords = 'furniture, custom furniture, sustainable, handcrafted, interior design, home decor',
  image = 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
  url = window.location.href,
  type = 'website'
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="FurniCraft" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="FurniCraft" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#d97706" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "FurniCraft",
          "description": description,
          "url": "https://furnicraft.com",
          "telephone": "+1-555-123-4567",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Furniture Avenue",
            "addressLocality": "City",
            "addressRegion": "State",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "openingHours": [
            "Mo-Fr 09:00-18:00",
            "Sa 10:00-16:00"
          ],
          "priceRange": "$$",
          "image": image,
          "sameAs": [
            "https://facebook.com/furnicraft",
            "https://instagram.com/furnicraft",
            "https://twitter.com/furnicraft"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;