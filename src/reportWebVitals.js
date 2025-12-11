import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals for performance optimization
 * 
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift)
 * - INP (Interaction to Next Paint) - replaces FID
 * - FCP (First Contentful Paint)
 * - LCP (Largest Contentful Paint)
 * - TTFB (Time to First Byte)
 */

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

// Function to log vitals to console (development)
export const logWebVitals = () => {
  reportWebVitals((metric) => {
    console.log(`[Web Vital] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  });
};

// Function to send vitals to analytics (production)
export const sendToAnalytics = () => {
  reportWebVitals((metric) => {
    // In production, you would send this to your analytics service
    // Example: Google Analytics, Vercel Analytics, etc.
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });

    // Log to console for now
    console.log('Analytics:', body);

    // Example of sending to an analytics endpoint:
    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon('/api/analytics', body);
    // } else {
    //   fetch('/api/analytics', { body, method: 'POST', keepalive: true });
    // }
  });
};

export default reportWebVitals;
