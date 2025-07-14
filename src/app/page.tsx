
'use client';

import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.observe-fade-in');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);


  return (
    <main>
      <Hero />
      <ProductGrid />
      <About />
      <Contact />
    </main>
  );
}
