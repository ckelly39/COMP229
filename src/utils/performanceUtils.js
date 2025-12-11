/**
 * Performance Monitoring Utilities
 * Helper functions to track and measure application performance
 */

// Measure component render time
export const measureRenderTime = (componentName) => {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    const renderTime = end - start;
    console.log(`[Performance] ${componentName} rendered in ${renderTime.toFixed(2)}ms`);
  };
};

// Check if browser supports performance API
export const supportsPerformanceAPI = () => {
  return typeof window !== 'undefined' && 
         window.performance && 
         window.performance.now;
};

// Get navigation timing metrics
export const getNavigationMetrics = () => {
  if (!supportsPerformanceAPI()) return null;

  const navigation = performance.getEntriesByType('navigation')[0];
  
  if (!navigation) return null;

  return {
    dnsLookup: (navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2),
    tcpConnection: (navigation.connectEnd - navigation.connectStart).toFixed(2),
    requestTime: (navigation.responseStart - navigation.requestStart).toFixed(2),
    responseTime: (navigation.responseEnd - navigation.responseStart).toFixed(2),
    domProcessing: (navigation.domComplete - navigation.domInteractive).toFixed(2),
    domContentLoaded: (navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart).toFixed(2),
    loadComplete: (navigation.loadEventEnd - navigation.loadEventStart).toFixed(2),
    totalLoadTime: (navigation.loadEventEnd - navigation.fetchStart).toFixed(2),
  };
};

// Get resource timing (scripts, styles, images)
export const getResourceMetrics = () => {
  if (!supportsPerformanceAPI()) return null;

  const resources = performance.getEntriesByType('resource');
  
  const metrics = {
    scripts: [],
    stylesheets: [],
    images: [],
    fonts: [],
    other: []
  };

  resources.forEach(resource => {
    const metric = {
      name: resource.name,
      duration: resource.duration.toFixed(2),
      size: resource.transferSize || 0,
      type: resource.initiatorType
    };

    if (resource.name.endsWith('.js')) {
      metrics.scripts.push(metric);
    } else if (resource.name.endsWith('.css')) {
      metrics.stylesheets.push(metric);
    } else if (resource.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
      metrics.images.push(metric);
    } else if (resource.name.match(/\.(woff|woff2|ttf|eot)$/i)) {
      metrics.fonts.push(metric);
    } else {
      metrics.other.push(metric);
    }
  });

  return metrics;
};

// Calculate total resource size
export const getTotalResourceSize = () => {
  if (!supportsPerformanceAPI()) return 0;

  const resources = performance.getEntriesByType('resource');
  let totalSize = 0;

  resources.forEach(resource => {
    totalSize += resource.transferSize || 0;
  });

  return (totalSize / 1024).toFixed(2); // Convert to KB
};

// Log performance summary
export const logPerformanceSummary = () => {
  if (!supportsPerformanceAPI()) {
    console.warn('Performance API not supported');
    return;
  }

  console.group('📊 Performance Summary');
  
  const navMetrics = getNavigationMetrics();
  if (navMetrics) {
    console.log('Navigation Timing:', navMetrics);
  }

  const resourceMetrics = getResourceMetrics();
  if (resourceMetrics) {
    console.log('Resource Count:', {
      scripts: resourceMetrics.scripts.length,
      stylesheets: resourceMetrics.stylesheets.length,
      images: resourceMetrics.images.length,
      fonts: resourceMetrics.fonts.length,
    });
  }

  console.log('Total Resource Size:', `${getTotalResourceSize()} KB`);
  
  console.groupEnd();
};

// Create a performance observer for monitoring
export const createPerformanceObserver = (callback) => {
  if (typeof PerformanceObserver === 'undefined') return null;

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry);
      }
    });

    observer.observe({ 
      entryTypes: ['navigation', 'resource', 'paint', 'measure'] 
    });

    return observer;
  } catch (error) {
    console.error('Error creating PerformanceObserver:', error);
    return null;
  }
};

export default {
  measureRenderTime,
  supportsPerformanceAPI,
  getNavigationMetrics,
  getResourceMetrics,
  getTotalResourceSize,
  logPerformanceSummary,
  createPerformanceObserver,
};
