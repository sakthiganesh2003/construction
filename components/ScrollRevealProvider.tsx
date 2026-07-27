'use client';

import { useEffect, useState } from 'react';

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.reveal-on-scroll, .reveal-fade-left, .reveal-fade-right, .reveal-slide-left, .reveal-slide-right, .reveal-zoom'
      );
      elements.forEach((el) => observer.observe(el));
    };

    observeElements();

    // Re-observe if DOM changes dynamically
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
