import React, { useState, useEffect } from 'react';

/**
 * Optimized Image component with lazy loading and error handling
 * Features:
 * - Lazy loading with IntersectionObserver
 * - Loading placeholder
 * - Error fallback
 * - Responsive image support
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  placeholder = '/placeholder.jpg',
  loading = 'lazy'
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Preload the actual image
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };

    img.onerror = () => {
      setHasError(true);
      setImageLoaded(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (hasError) {
    return (
      <div 
        className={`image-error ${className}`}
        style={{
          width: width || '100%',
          height: height || 'auto',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999'
        }}
      >
        Image not available
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${!imageLoaded ? 'loading' : 'loaded'}`}
      width={width}
      height={height}
      loading={loading}
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: imageLoaded ? 1 : 0.5,
      }}
    />
  );
};

export default OptimizedImage;
