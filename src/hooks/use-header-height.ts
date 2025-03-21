
import { useState, useEffect } from 'react';

export function useHeaderHeight(): number {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Try to get the header element
    const headerElement = document.querySelector('header');
    
    // Set the initial header height
    if (headerElement) {
      setHeaderHeight((headerElement as HTMLElement).offsetHeight);
    }

    // Create a resize observer to update the header height when it changes
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === headerElement) {
          setHeaderHeight((entry.target as HTMLElement).offsetHeight);
        }
      }
    });

    // Observe the header element if it exists
    if (headerElement) {
      resizeObserver.observe(headerElement);
    }

    // Clean up the observer on component unmount
    return () => {
      if (headerElement) {
        resizeObserver.unobserve(headerElement);
      }
    };
  }, []);

  return headerHeight;
}
